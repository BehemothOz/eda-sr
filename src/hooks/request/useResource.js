import { useCallback, useReducer, useRef } from 'react';
import { useRepeatableAsync } from './useRepeatableAsync';

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

/*
    Return request function WITH state
*/
export const useResource = (asyncFunc, options = {}) => {
    const { initialData = null, onSuccess, onError } = options;

    const cancelRequest = useRef(false); // fix for "can't perform a React state update on an unmounted component"

    const refOnSuccess = useRef(onSuccess);
    const refOnError = useRef(onError);

    const [state, dispatch] = useReducer(reducer, {
        status: 'idle',
        data: initialData,
        error: null,
    });

    const repeatableRun = useRepeatableAsync(asyncFunc);

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
