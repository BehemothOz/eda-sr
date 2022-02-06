class SharedWorkerClient {
    constructor(worker) {
        this.worker = worker;

        this.worker.port.onmessage = this._onMessage.bind(this);

        this.listeners = new Map();
        this.messageID = 1;
    }

    _onMessage(event) {
        console.log('event.data', event.data);
        const { messageID, status, data } = this._flattenResponse(event.data);
        const [resolve, reject] = this.listeners.get(messageID);

        status === 'OK' ? resolve(data) : reject(data);

        this.listeners.delete(messageID);
    }

    sendMessage(key, data) {
        const messageID = this.messageID++;
        const message = { key, data };

        const promise = new Promise((resolve, reject) => {
            this.listeners.set(messageID, [resolve, reject]);
            this.worker.port.postMessage([messageID, message]);
        });

        return promise;
    }

    _flattenResponse(response) {
        const [messageID, payload] = response;
        const { status, data } = payload;

        return { messageID, status, data };
    }
}
