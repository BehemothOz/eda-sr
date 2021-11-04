import { Users } from './services/users';
import { Tasks } from './services/tasks';

const userService = new Users();
const tasksService = new Tasks();

/*
    TODO:
        - create error object
*/

const delayWithRequest = (time, syncRequest) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const response = syncRequest();
                resolve(response);
            } catch (error) {
                reject(error);
            }
        }, time);
    });

    return promise;
};

const auth = async data => {
    return await delayWithRequest(0, () => userService.checkByID(data));
};

const register = async data => {
    return await delayWithRequest(0, () => userService.register(data));
};

const getTasks = async () => {
    return await delayWithRequest(0, () => tasksService.getAll());
};

const createTask = async data => {
    return await delayWithRequest(0, () => tasksService.create(data));
};

const search = () => {
    const params = { q: '', f: null };

    const request = async atr => {
        console.log('search', atr);
        await delayWithRequest(1000, {
            data: [],
        });
    };

    return {
        searchQuery: async q => {
            params.q = q;
            return await request(params);
        },
        searchFilter: async f => {
            params.f = f;
            return await request(params);
        },
    };
};

export const api = {
    auth,
    register,
    s: search(),

    getTasks,
    createTask,
};
