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

class Tasks {
    constructor() {
        // this.tasks = initialTasks;
        this.tasks = [{ msg: 'Мармышка' }];
        this.count = 1; // temp
    }

    getAll() {
        return this.tasks;
        // throw new Error('Ooops')
    }

    getByID() {}

    create(data) {
        // const id = generateID.get();
        const id = this.count;
        this.tasks = [...this.tasks, { id, ...data }];
        this.count++;
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

const tasks = new Tasks();

/*
    chrome://inspect/#workers
    help: https://stackoverflow.com/questions/2323778/how-to-debug-web-workers
*/

self.addEventListener('connect', function (e) {
    const port = e.ports[0];

    port.onmessage = function (event) {
        const { type, value } = JSON.parse(event.data);

        switch (type) {
            case 'GET_TASKS': {
                port.postMessage(JSON.stringify({ type, value: tasks.getAll() }));
                break;
            }
            case 'CREATE_TASK':
                port.postMessage(JSON.stringify({ type, value: tasks.create(value) }));
                break;

            default:
                port.postMessage('OOOPPPPSSS');
                break;
        }
    };
});
