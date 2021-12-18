const delay = ms =>
    new Promise(resolve => {
        setTimeout(resolve, ms);
    });

export const repeatable = (asyncFunc, options = {}) => {
    // if (asyncFunc[Symbol.toStringTag] !== 'AsyncFunction') {
    //     throw new Error('The first argument must be asynchronous function');
    // }

    const { duration = 2000, max = 3, statusCodes = [408], onError = null } = options;

    let isRunning = true;
    let count = 0;

    const retry = async args => {
        try {
            return await asyncFunc(...args);
        } catch (error) {
            if (isRunning && max !== 0 && count < max && statusCodes.includes(error.status)) {
                console.log('retry work with status', error.status);
                onError && onError({ _retryCount: count, _retryMaxCount: max, error });

                await delay(duration);
                count += 1;
                return retry(args);
            }

            throw error;
        }
    };

    const repeat = (...args) => retry(args);
    repeat.clear = () => {
        console.log('STOP repeat')
        isRunning = false
    };

    return repeat;
};
