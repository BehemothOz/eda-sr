const delay = ms =>
    new Promise(resolve => {
        setTimeout(resolve, ms);
    });

const fetch = args => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject({ status: 413, payload: { name: 'Ivan' } });
        }, 1000);
    });
};

const repeatable = (func, options = {}) => {
    const { duration = 2000, max = 3, statusCodes = [413], onError = null } = options;

    let count = 0;

    const retry = async args => {
        try {
            return await func(...args);
        } catch (e) {
            if (count < max && statusCodes.includes(e.status)) {
                onError && onError(e);

                delay(duration);
                count += 1;
                return retry(args);
            }

            throw e;
        }
    };

    return (...args) => retry(args);
};

/*
    For testing
*/
const search = async () => {
    const asyncSearch = fetch;

    const repeatableSearch = repeatable(asyncSearch, {
        max: 3,
        onError: () => {
            console.log('Ooops! Timeout error.');
        },
    });

    try {
        const rr = await repeatableSearch({ a: 100, b: 200 });
        console.log('Look here', rr);
    } catch (e) {
        console.error(e);
    }
};

search();
