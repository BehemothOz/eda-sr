import { sessionService } from './services/session';
import { usersService } from './services/users';
import { tasksService } from './services/tasks';

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
    return await delayWithRequest(0, () => usersService.checkByLogin(data)).then(userID =>
        sessionService.setUserID(userID)
    );
};

const register = async data => {
    return await delayWithRequest(0, () => usersService.register(data));
};

const getUser = async userID => {
    return await delayWithRequest(0, () => usersService.get(userID));
};

const getTasks = async () => {
    return await delayWithRequest(0, () => tasksService.getAll());
};

const createTask = async data => {
    return await delayWithRequest(0, () => tasksService.create(data));
};

const updateTask = async (id, data) => {
    return await delayWithRequest(0, () => tasksService.update(id, data));
};

const deleteTask = async id => {
    return await delayWithRequest(0, () => tasksService.delete(id));
};

export const api = {
    auth,
    register,
    getUser,

    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
