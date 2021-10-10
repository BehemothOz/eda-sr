// const { limit = 10, methods = ['get'], statusCodes = [413] } = options;

const delay = ms =>
    new Promise(resolve => {
        setTimeout(resolve, ms);
    });

const ftch = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ status: 411, payload: { name: 'Ivan' } });
        }, 1000);
    });
};

const requestMethods = ['get', 'post', 'put'];

const createSingle = async () => {
    let count = 0;

    const _retry = async fn => {
        /*
       try / catch
    */

        if (count < 3) {
            console.log('count checker', count);
            count += 1;
            await delay(2000);

            return _retry(fn);
        } else {
            count = 0;
            return await fn();
        }
    };

    const fn = async () => {
        const response = await ftch();

        return response;
    };

    const result = _retry(fn);

    return result;
    // return 100;
};

const create = opts => {
    return requestMethods.reduce((acc, method) => {
        return { ...acc, [method]: (...args) => createSingle(opts, ...args) };
    }, []);
};

const api = create();
console.log(api);

const search = async () => {
    const rr = await api.get();

    console.log('Look here', rr);
};

search();
