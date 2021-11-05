import { generateID } from '../adapters/generateID';
/*
    Testing Singleton:

    class Singleton {
        static instance;

        constructor() {
            if (instance) {
                return instance;
            }

            this.instance = this;
        }

        foo() {
            // ...
        }
    }
*/

const initialData = [
    { id: 1, title: 'Cook pasta with chicken', from: new Date(2021, 9, 1), to: new Date(2021, 9, 25) },
    { id: 2, title: 'Go to the store for glasses', from: new Date(2021, 9, 1), to: new Date(2021, 9, 25) },
];

export class Tasks {
    constructor() {
        this.tasks = initialData;
    }

    getAll() {
        console.log('this.tasks', this.tasks);
        return this.tasks;
        // throw new Error('Ooops')
    }

    getByID() {}

    create(data) {
        const id = generateID.get();
        this.tasks = [...this.tasks, { id, ...data }];

        return id;
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
