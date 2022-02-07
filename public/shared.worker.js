/*
    chrome://inspect/#workers
    help: https://stackoverflow.com/questions/2323778/how-to-debug-web-workers - debug Worker

    https://habr.com/ru/post/261307/ - about Worker

    https://html.spec.whatwg.org/dev/workers.html#shared-workers-introduction - spec Worker
*/

/*
    TODO: importScript
*/

class Users {
    constructor() {
        this.users = new Map([
            [
                '000-S',
                {
                    id: '000-S',
                    login: 'sss',
                    firstName: 'sss',
                    middleName: '',
                    lastName: '',
                    secretQuestion: 1,
                    secretAnswer: 'sss',
                },
            ],
        ]);

        this.userID = 1;
    }

    register(data) {
        const id = this.userID++;

        this.users.set(id, { id, ...data });
        return id;
    }

    checkByLogin({ login }) {
        const user = this._find(([_, user]) => user.login === login);

        if (!user) {
            throw new Error('Invalid login or password');
        }

        const [userID] = user;
        return userID;
    }

    checkBySecret({ login, secretAnswer }) {
        const user = this._find(([_, user]) => user.login === login && user.secretAnswer === secretAnswer);

        if (!user) {
            throw new Error('Try again');
        }

        const [userID] = user;
        return userID;
    }

    get(userID) {
        const user = this.users.get(userID);

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    getToVerify(userID) {
        const user = this.users.get(userID);

        if (!user) {
            throw new Error('User not found');
        }

        const res = {
            id: user.id,
            login: user.login,
            secretQuestion: user.secretQuestion,
        };

        return res;
    }

    update(userID, data) {
        this.users.set(userID, { id: userID, ...data });
        return userID;
    }

    _find(cb) {
        return Array.from(this.users.entries()).find(cb);
    }

    getAll() {
        return Array.from(this.users);
    }
}

class Tasks {
    constructor() {
        this.tasks = [
            {
                id: 1,
                title: 'Cook pasta with chicken',
                type: '',
                plannedStartTime: new Date(2021, 9, 1),
                plannedEndTime: new Date(2021, 9, 25),
                actualStartTime: null,
                actualEndTime: null,
            },
        ];

        this.taskID = 2;
    }

    getAll() {
        return this.tasks;
    }

    create(data) {
        const id = this.taskID++;
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

const usersService = new Users();
const tasksService = new Tasks();

let connections = [];

const formatSuccessMessage = formatMessage('OK');
const formatErrorMessage = formatMessage('ERROR');

self.addEventListener('connect', function (e) {
    const port = e.ports[0];
    connections.push(port);

    console.log('connections', connections); // for debug;

    port.onmessage = function (event) {
        const [messageID, incomingMessage] = event.data;
        const { key, payload } = incomingMessage;

        let message;

        switch (key) {
            /*
                User cases
            */
            case 'auth:user': {
                try {
                    const userID = usersService.checkByLogin(payload);
                    message = formatSuccessMessage(key, userID);
                } catch (error) {
                    message = formatErrorMessage(key, error);
                }
                break;
            }
            case 'register:user': {
                const userID = usersService.register(payload);
                message = formatSuccessMessage(key, userID);
                break;
            }
            case 'get:user': {
                const user = usersService.get(payload);
                message = formatSuccessMessage(key, user);
                break;
            }
            case 'verify:user': {
                try {
                    const res = usersService.getToVerify(payload);
                    message = formatSuccessMessage(key, res);
                } catch (error) {
                    message = formatErrorMessage(key, error);
                }
                break;
            }
            case 'check_secret:user': {
                try {
                    const userID = usersService.checkBySecret(payload);
                    message = formatSuccessMessage(key, userID);
                } catch (error) {
                    message = formatErrorMessage(key, error);
                }
                break;
            }
            case 'update:user': {
                const { id: updatedID, value } = payload;

                const userID = usersService.update(updatedID, value);
                message = formatSuccessMessage(key, userID);
                break;
            }
            case 'check:user': {
                try {
                    const userID = usersService.checkByLogin(payload);
                    message = formatSuccessMessage(key, userID);
                } catch (error) {
                    message = formatErrorMessage(key, error);
                }
                break;
            }

            /*
                Tasks cases
            */
            case 'get:tasks': {
                const tasks = tasksService.getAll();
                message = formatSuccessMessage(key, tasks);
                break;
            }
            case 'create:task': {
                const id = tasksService.create(payload);
                message = formatSuccessMessage(key, id);
                break;
            }
            case 'update:task': {
                const { id: updatedID, value } = payload;

                const id = tasksService.update(updatedID, value);
                message = formatSuccessMessage(key, id);
                break;
            }
            case 'delete:task': {
                const { id: removedID } = payload;

                const id = tasksService.delete(removedID);
                message = formatSuccessMessage(key, id);
                break;
            }
            default:
                message = formatErrorMessage(new Error('Key is not found'));
                break;
        }

        port.postMessage([messageID, message]);
    };
});

function formatMessage(status) {
    return (key, data) => {
        return { key, status, data };
    };
}
