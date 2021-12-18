import { useCallback, useReducer, useRef, useEffect, useMemo } from 'react';
import { useMessage } from 'hooks/useMessage';
import { repeatable } from 'libs/repeatable';

/*
    statuses

    isLoading: status === 'idle' || status === 'pending'
    isIdle: status === 'idle'
    isPending: status === 'pending'
    isResolved: status === 'resolved'
    isRejected: status === 'rejected'
*/

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

/*
    TODO:
        - link for async func
        - clear state
        - add reset after request (unmount)
*/

const LIMIT = 3;

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

    const repeatableRun = useMemo(
        () =>
            repeatable(asyncFunc, {
                max: LIMIT,
                onError: () => {
                    msg.error('Attempt to retry request..');
                },
            }),
        [asyncFunc, msg]
    );

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
        [repeatableRun]
    );

    run.cancel = () => {
        cancelRequest.current = true;
        repeatableRun.clear();
    };

    return {
        ...state,
        run,
    };
};
