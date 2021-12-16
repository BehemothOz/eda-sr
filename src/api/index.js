import { delayWithRequest, delayWithTimeoutRequest } from './request';

import { sessionService } from './services/session';
import { usersService } from './services/users';
import { tasksService } from './services/tasks';



export const testRequest = async () => {
    return await delayWithTimeoutRequest(4000, () => {
        return {
            a: 1000,
            b: 2000
        }
    })
}


const auth = async data => {
    return await delayWithRequest(0, () => usersService.checkByLogin(data)).then(userID =>
        sessionService.setUserID(userID)
    );
};

const register = async data => {
    return await delayWithRequest(0, () => usersService.register(data));
};

const checkUser = async data => {
    return await delayWithRequest(0, () => usersService.checkByLogin(data));
};

const checkUserBySecret = async data => {
    return await delayWithRequest(0, () => usersService.checkBySecret(data));
};

const getUser = async userID => {
    return await delayWithRequest(0, () => usersService.get(userID));
};

const getUserToVerify = async userID => {
    return await delayWithRequest(0, () => usersService.getToVerify(userID));
};

const updateUser = async (userID, data) => {
    return await delayWithRequest(0, () => usersService.update(userID, data));
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
    checkUserBySecret,
    checkUser,
    getUser,
    getUserToVerify,
    updateUser,

    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
