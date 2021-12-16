import { TimeoutRequestError } from './errors';

/*
    Server emulation work
*/

/*
    TODO:
        - create more error object
*/

const TIMEOUT_REQUEST = 3000;

export const delayWithRequest = (time, syncRequest) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const response = syncRequest();
                resolve(response);
            } catch (error) {
                reject(error);
            }
        }, time);
    });

    return promise;
};

const timeoutRequest = delay => {
    let timerID;

    const promise = new Promise((_, rej) => {
        timerID = setTimeout(() => {
            rej(new TimeoutRequestError({ status: 408, msg: 'Time is over' }));
        }, delay);
    });

    return {
        promise,
        clear: () => clearTimeout(timerID),
    };
};

const delayWithTimeoutRequestCarry =
    ms =>
    async (...args) => {
        const request = delayWithRequest(...args);
        const wait = timeoutRequest(ms);

        const result = await Promise.race([request, wait.promise]).finally(() => console.log('finally') || wait.clear());

        return result;
    };

export const delayWithTimeoutRequest = delayWithTimeoutRequestCarry(TIMEOUT_REQUEST);
