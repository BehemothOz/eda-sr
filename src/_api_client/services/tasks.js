import { generateID } from '../adapters/generateID';
import { initialTasks } from './__mock';

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

export const tasksService = new Tasks();
