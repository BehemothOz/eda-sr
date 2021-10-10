/*
    for react problem:
    - race conditions
    - unmount -> warning
*/

export const debounce = (cb, time) => {
    let timerID;

    const clear = () => {
        clearTimeout(timerID);
    };

    const debounced = (...args) => {
        if (timerID) clear();

        const run = () => cb.apply(this, args);

        timerID = setTimeout(run, time);
    };

    debounced.clear = clear;
    return debounced;
};
