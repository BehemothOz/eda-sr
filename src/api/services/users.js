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

    updateUserByID() {}

    checkUserByID() {}

    logs(type, data) {
        console.group('%c' + type, 'color: red;');
        console.log('users list:', data);
        console.groupEnd();
    }
}
