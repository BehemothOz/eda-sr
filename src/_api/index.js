import { SharedWorkerClient, getPathFromPublic } from 'worker';

const PATH_WORKER = getPathFromPublic('shared.worker.js');

const sharedWorker = new SharedWorker(getPathFromPublic(PATH_WORKER));
const wr = new SharedWorkerClient(sharedWorker);

console.log(wr);

const auth = async data => {
    return await delayWithTimeoutRequest(0, () => usersService.checkByLogin(data)).then(userID =>
        sessionService.setUserID(userID)
    );
};

const register = async data => {
    return await delayWithTimeoutRequest(0, () => usersService.register(data));
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

const getTasks = async params => {
    return await delayWithTimeoutRequest(1000, () => tasksService.getAll(params));
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
