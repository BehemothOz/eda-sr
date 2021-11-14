import { useCallback, useReducer, useRef, useEffect } from 'react';

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

export const useResource = (asyncFunc, options = {}) => {
    const { initialData = null, onSuccess, onError } = options;

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

    const run = useCallback(
        async (...args) => {
            try {
                dispatch({ type: 'started' });
                const response = await asyncFunc(...args);

                dispatch({ type: 'success', data: response });
                refOnSuccess.current && refOnSuccess.current(response);
            } catch (error) {
                console.error('Inside run error', error);

                dispatch({ type: 'error', error: new Error('Some error') });
                refOnError.current && refOnError.current(error);
            }
        },
        [asyncFunc]
    );

    return {
        ...state,
        run,
    };
};
