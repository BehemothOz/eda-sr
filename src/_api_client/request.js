import { TimeoutRequestError } from './errors';
import { TIMEOUT_REQUEST } from './config';

/*
    TODO:
        - create more error object
*/

/*
    Emulation request WITHOUT timeout
*/
export const delayWithRequest = (time, syncRequest) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const response = syncRequest();
                resolve(response);
            } catch (error) {
                // console.log('MAIN SERVER ERROR --->', error);
                reject(error);
            }
        }, time);
    });

    return promise;
};

/*
    Emulation server timeout
*/
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

/*
    Emulation request WITH timeout
*/
const delayWithTimeoutRequestCarry =
    ms =>
    async (...args) => {
        const request = delayWithRequest(...args);
        const wait = timeoutRequest(ms);

        const result = await Promise.race([request, wait.promise]).finally(() => wait.clear());

        return result;
    };

export const delayWithTimeoutRequest = delayWithTimeoutRequestCarry(TIMEOUT_REQUEST);
