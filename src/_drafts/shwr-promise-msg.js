/*
    == Not used ==

    Different ideas.
*/

const eventEmitter = () => {};
const getPathFromPublic = link => link;

/*
    Create worker.
    PostMessage method return Promise.
*/
const createWorker = link => {
    const emitter = eventEmitter();
    const worker = new SharedWorker(getPathFromPublic(link));

    /*
        TODO: add reject
    */
    const postMessage = (name, data) => {
        return new Promise(resolve => {
            emitter.once(name, res => {
                resolve(res);
            });

            worker.port.postMessage([name, data]);
        });
    };

    const onMessage = evt => {
        const [name, data] = evt.data;
        emitter.emit(name, data);
    };

    return { port: worker.port, postMessage, onMessage };
};
