import React, { useState, useEffect, useCallback, useReducer } from 'react';

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
*/

const initialState = {
    status: 'idle',
    data: [],
    error: null,
};

export const useResource = asyncFunc => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const run = useCallback(
        async (...args) => {
            try {
                dispatch({ type: 'started' });

                const response = await asyncFunc(...args);
                dispatch({ type: 'success', data: response });
            } catch (error) {
                dispatch({
                    type: 'error',
                    error: new Error('Some error'),
                });
            }
        },
        [asyncFunc]
    );

    return {
        ...state,
        run,
    };
};
