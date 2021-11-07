import { generateID } from '../adapters/generateID';

const initialUser = [['000-S', { login: 'aa' }]];

export class Users {
    constructor() {
        this.users = new Map(initialUser);
    }

    register(data) {
        const id = generateID.get();
        this.users.set(id, data);

        this.logs('regiser', [...this.users]);
        return id;
    }

    checkByLogin({ login }) {
        const user = Array.from(this.users.entries()).find(([_, user]) => user.login === login);

        if (!user) {
            throw new Error('Invalid login or password');
        }

        const [userID] = user;

        this.logs('checkByLogin', user);
        return userID;
    }

    get(id) {
        const user = this.users.get(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    update() {}

    logs(type, data) {
        console.group('%c' + type, 'color: red;');
        console.log('some data about users:', data);
        console.groupEnd();
    }
}
