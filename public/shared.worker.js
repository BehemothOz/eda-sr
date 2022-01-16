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

class Tasks {
    constructor() {
        this.tasks = initialTasks;
    }

    getAll() {
        return this.tasks;
        // throw new Error('Ooops')
    }

    getByID() {}

    create(data) {
        const id = generateID.get();
        this.tasks = [...this.tasks, { id, ...data }];

        return id;
        // throw new Error('Ooops')
    }

    update(id, data) {
        this.tasks = this.tasks.map(task => (task.id === id ? { ...task, ...data } : task));
        return id;
    }

    delete(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return id;
    }
}

/*
    getAll
    create
    update
    delete

    function send(payload) {
        const { type, data } = payload;
        const newData = data;
        return { type, data: newData }
    }
*/

self.addEventListener('connect', function (e) {
    const port = e.ports[0];

    self.console.log('test');

    port.onmessage = function (event) {
        const { type, value } = JSON.parse(event.data);

        switch (type) {
            case 'GET_TASKS': {
                // port.postMessage(JSON.stringify(state.get()));
                port.postMessage(JSON.stringify({ type, value: [{ info: 'Some info', count: 100 }] }));
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
