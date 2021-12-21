import { useCallback, useRef } from 'react';
import { useRepeatableAsync } from './useRepeatableAsync';

/*
    Create request function without state
*/
export const useSimpleResource = (asyncFunc, options = {}) => {
    const { onSuccess, onError } = options;

    const cancelRequest = useRef(false);

    const refOnSuccess = useRef(onSuccess);
    const refOnError = useRef(onError);

    const repeatableRun = useRepeatableAsync(asyncFunc);

    const run = useCallback(
        async (...args) => {
            try {
                const result = await repeatableRun(...args);

                if (cancelRequest.current) return;
                refOnSuccess.current && refOnSuccess.current(result);
            } catch (error) {
                console.error('useSimpleResource catch error', error);
                if (cancelRequest.current) return;
                refOnError.current && refOnError.current(error);
            }
        },
        [repeatableRun]
    );

    run.cancel = () => {
        repeatableRun.clear();
    };

    return run;
};
