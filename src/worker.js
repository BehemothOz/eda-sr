import { eventEmitter } from '_drafts/emitter';

const getPathFromPublic = path => `${process.env.PUBLIC_URL}/${path}`;

/*
    .terminate() - only for D Worker
*/
export const createWorker = link => {
    const worker = new SharedWorker(getPathFromPublic(link));
    const emitter = eventEmitter();

    const register = (name, listener) => {
        return emitter.on(name, listener);
    };

    const postMessage = (name, payload) => {
        worker.port.postMessage([name, payload]);
    };

    const onMessage = event => {
        const [name, data] = event.data;
        emitter.emit(name, data);
    };

    // const clear = () => emitter.clear();

    return { port: worker.port, register, postMessage, onMessage };
};
