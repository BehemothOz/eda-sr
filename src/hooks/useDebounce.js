import { useRef, useCallback } from 'react';

/*
    TODO:
    - mb create ref for cb?
    - change ms outside?
*/

/*
    for react problem:
    - race conditions
    - unmount -> warning
*/

export const useDebounce = (cb, ms) => {
    const timerID = useRef();
    const cbRef = useRef(cb);

    const clear = useCallback(() => {
        if (timerID.current) clearTimeout(timerID.current);
    }, []);

    const func = useCallback((...args) => {
        clear();

        timerID.current = setTimeout(() => {
            cbRef.current(...args);
        }, ms);
    }, [clear, ms]);

    func.clear = clear;

    return func;
};
