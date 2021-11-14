import { generateID } from '../adapters/generateID';
import { initialUser } from './__mock';

class Users {
    constructor() {
        this.users = new Map(initialUser);
    }

    register(data) {
        const id = generateID.get();
        this.users.set(id, { id, ...data });

        this._logs('regiser', this.users);
        return id;
    }

    checkByLogin({ login }) {
        const user = this._find(([_, user]) => console.log(user) || user.login === login);

        if (!user) {
            throw new Error('Invalid login or password');
        }

        const [userID] = user;

        this._logs('check_by_login', userID);
        return userID;
    }

    checkBySecret({ login, secretAnswer }) {
        const [userID] = this._find(([_, user]) => user.login === login && user.secretAnswer === secretAnswer);

        this._logs('check_by_secret', userID);
        return userID;
    }

    get(userID) {
        const user = this.users.get(userID);

        if (!user) {
            throw new Error('User not found');
        }

        this._logs('get_user', user);
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

        this._logs('get_user_to_verify', res);
        return res;
    }

    update(userID, data) {
        this.users.set(userID, { id: userID, ...data });

        this._logs('get_user_after_update', this.users);
        return userID;
    }

    _find(cb) {
        return Array.from(this.users.entries()).find(cb);
    }

    _logs(type, data) {
        console.group('%c' + type, 'color: red;');
        console.log('some data about users:', data);
        console.groupEnd();
    }
}

export const usersService = new Users();
