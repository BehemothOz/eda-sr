import { SharedWorkerClient, getPathFromPublic } from './worker';
import { sessionService } from './services/session';

const PATH_WORKER = getPathFromPublic('shared.worker.js');

/*
    TODO: dynamic creating worker
        const blob = new Blob([code], { type: "application/javascript" });
        new SharedWorker(URL.createObjectURL(blob), { type: "module" });
*/
const sharedWorker = new SharedWorker(PATH_WORKER);
const wr = new SharedWorkerClient(sharedWorker);

const auth = async data => {
    return await wr.sendMessage('auth:user', data).then(userID => sessionService.setUserID(userID));
};

const register = async data => {
    return await wr.sendMessage('register:user', data);
};

const checkUser = async data => {
    return await wr.sendMessage('check:user', data);
};

const checkUserBySecret = async data => {
    return await wr.sendMessage('check_secret:user', data);
};

const getUser = async userID => {
    return await wr.sendMessage('get:user', userID);
};

const getUserToVerify = async userID => {
    return await wr.sendMessage('verify:user', userID);
};

const updateUser = async (userID, data) => {
    return await wr.sendMessage('update:user', { id: userID, value: data });
};

const getTasks = async params => {
    return await wr.sendMessage('get:tasks', params);
};

const createTask = async data => {
    return await wr.sendMessage('create:task', data);
};

const updateTask = async (id, data) => {
    return await wr.sendMessage('update:task', { id, value: data });
};

const deleteTask = async id => {
    return await wr.sendMessage('delete:task', { id });
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
