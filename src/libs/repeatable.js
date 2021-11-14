const delay = ms =>
    new Promise(resolve => {
        setTimeout(resolve, ms);
    });

/*
 * repeatable function
 * error response: { status: 413, payload: {} }
 */

export const repeatable = (func, options = {}) => {
    const { duration = 2000, max = 3, statusCodes = [413], onError = null } = options;

    let count = 0;

    const retry = async args => {
        try {
            return await func(...args);
        } catch (error) {
            if (count < max && statusCodes.includes(error.status)) {
                onError && onError(error);

                await delay(duration);
                count += 1;
                return retry(args);
            }

            throw error;
        }
    };

    return (...args) => retry(args);
};
