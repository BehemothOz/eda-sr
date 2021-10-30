import { generateID } from '../adapters/generateID';

export class Users {
    constructor() {
        this.users = [];
    }

    register(data) {
        const id = generateID.get();
        this.users = [...this.users, { id, ...data }];

        this.logs('regiser', this.users);
        return id;
    }

    updateByID() {}

    checkByID(data) {
        const { login } = data;
        const isValidUser = this.users.some(user => user.login === login);

        if (!isValidUser) {
            throw new Error('Invalid login or password');
        }

        return {
            token: '123456',
        };
    }

    logs(type, data) {
        console.group('%c' + type, 'color: red;');
        console.log('users list:', data);
        console.groupEnd();
    }
}
