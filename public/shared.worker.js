class Data {
    constructor() {
        this.data = [];
    }

    get() {
        return this.data;
    }
    add(value) {
        const id = this.data.length + 1;
        this.data.push({ id, ...value });
        return this.data;
    }
    update() {}
    remove() {}
}

const state = new Data();

self.addEventListener('connect', function (e) {
    const port = e.ports[0];

    port.onmessage = function (event) {
        const { type, value } = JSON.parse(event.data);

        switch (type) {
            case 'GET': {
                port.postMessage(JSON.stringify(state.get()));
                break;
            }
            case 'ADD':
                port.postMessage(JSON.stringify(state.add(value)));
                break;

            default:
                port.postMessage('OOOPPPPSSS');
                break;
        }
    };
});
