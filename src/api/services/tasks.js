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

/*
    { id: 1, title: 'Cook pasta with chicken', from: view(new Date(2021, 9, 1)), to: view(new Date(2021, 9, 25)) },
    { id: 2, title: 'Go to the store for glasses', from: view(new Date(2021, 9, 1)), to: view(new Date(2021, 9, 25)) },
*/

class Tasks {
    constructor() {
        this.tasks = []
    }

    getAll() {
        return this.tasks;
    }

    getByID() {

    }

    create() {

    }

    update() {

    }

    delete() {

    }
}