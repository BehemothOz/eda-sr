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

/*
    chrome://inspect/#workers
    help: https://stackoverflow.com/questions/2323778/how-to-debug-web-workers

    https://habr.com/ru/post/261307/

    https://html.spec.whatwg.org/dev/workers.html#shared-workers-introduction
*/

let connections = [];
let count = 0;

self.addEventListener('connect', function (e) {
    const port = e.ports[0];
    connections.push(port);

    console.log(e)
    console.log('connections', connections)

    port.onmessage = function (e) {
        console.log('msg e', e)
        console.log(1, 'connection.length', connections.length)
        count++;

        if (e.data[0] === 'close') {
            console.log(111)
            connections = connections.filter(el => el !== e.target);
            e.target.close();
            return;
        }

        port.postMessage(['orbit', 10]);
    };
});

function notify () {
    for (let connection of connections) {
        connection.postMessage(['orbit', 10]);
    }
}
