const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

/*
    TODO: Generate id for ever message?
*/
export const createWorker = link => {
    const { port } = new SharedWorker(getPathFromPublic(link));

    const listeners = new Map();

    const onMessage = event => {
        const [key, payload] = event.data;

        const [resolve] = listeners.get(key);
        resolve(payload);

        listeners.delete(key);
    }

    port.addEventListener('message', onMessage);
    port.start();

    const sendMessage = (key, data) => {
        return new Promise((resolve, reject) => {
            listeners.set(key, [resolve, reject]);
            port.postMessage([key, data]);
        })
    }

    return {
        send: sendMessage
    };
};

const wr = createWorker('shared.worker.js');

/*
    const request = async () => {}
*/

export const getBanana = data => {
    return wr.send('get::banana', data);
};

export const addBanana = data => {
    return wr.send('add::banana', data);
};
