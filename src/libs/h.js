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

    const clear = useCallback(() => {
        if (timerID.current) clearTimeout(timerID.current);
    }, []);

    const func = useCallback((...args) => {
        clear();

        timerID.current = setTimeout(() => {
            cb(...args);
        }, ms);
    }, []);

    func.clear = clear;

    return func;
};
