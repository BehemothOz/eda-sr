import { testRequest } from 'api';
import { useState, useCallback, useReducer, useRef, useEffect } from 'react';

import { useMessage } from 'hooks/useMessage';
import { repeatable } from 'libs/repeatable';

function reducer(state, action) {
    switch (action.type) {
        case 'error': {
            return {
                ...state,
                status: 'rejected',
                error: action.error,
            };
        }
        case 'success': {
            return {
                ...state,
                status: 'resolved',
                data: action.data,
            };
        }
        case 'started': {
            return {
                ...state,
                status: 'pending',
            };
        }
        default: {
            // Who?
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export const useResource = (asyncFunc, options = {}) => {
    const { initialData = null, onSuccess, onError } = options;

    const msg = useMessage();

    const cancelRequest = useRef(false); // fix for "can't perform a React state update on an unmounted component"

    const refOnSuccess = useRef(onSuccess);
    const refOnError = useRef(onError);

    useEffect(() => {
        refOnSuccess.current = onSuccess;
        refOnError.current = onError;
    });

    const [state, dispatch] = useReducer(reducer, {
        status: 'idle',
        data: initialData,
        error: null,
    });

    const repeatableRun = useCallback(repeatable(asyncFunc, {
        max: 2,
        onError: arg => {
            console.log(arg);
            msg.error('Attempt to retry request..');
            // arg._retryCount === 0 && dispatch({ type: 'error', error: new Error('Some error') });
        },
    }), []);

    console.dir(repeatableRun)

    const run = useCallback(
        async (...args) => {
            try {
                dispatch({ type: 'started' });
                const response = await repeatableRun(...args);

                if (cancelRequest.current) return;

                dispatch({ type: 'success', data: response });
                refOnSuccess.current && refOnSuccess.current(response);
            } catch (error) {
                console.error('Inside run error', error);

                if (cancelRequest.current) return;

                dispatch({ type: 'error', error: new Error('Some error') });
                refOnError.current && refOnError.current(error);
            }
        },
        [asyncFunc]
    );

    run.cancel = () => {
        cancelRequest.current = true;
        repeatableRun.clear();
    }

    return {
        ...state,
        run,
    };
};

const ChildTest = () => {
    const { status, data, error, run } = useResource(testRequest);

    useEffect(() => {
        return () => {
            run.cancel();
        }
    }, [])

    const click = () => {
        run();
    }

    console.log('RENDER')

    return (
        <div style={{ padding: 32 }}>
            <button onClick={click}>BUTTON</button>
            <span style={{ marginLeft: 8 }}>{status === 'pending' && 'Loading...'}</span>
            <div style={{ marginTop: 16 }}>
                {!error ? JSON.stringify(data) : <span style={{ color: 'red' }}>Some error</span>}
            </div>
        </div>
    );
}

export const TestPage = () => {
    const [show, setShow] = useState(true);

    return <>
        <button onClick={() => setShow(p => !p)}>SHOW</button>
        <div>
            {show && <ChildTest />}
        </div>
    </>
};
