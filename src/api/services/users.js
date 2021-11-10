import { generateID } from '../adapters/generateID';

const initialUser = [
    [
        '000-S',
        {
            id: '000-S',
            login: 'some@sm.bg',
            firstName: '',
            middleName: '',
            lastName: '',
            secretQuestion: 1,
            secretAnswer: '2',
        },
    ],
];

class Users {
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
        const [userID] = Array.from(this.users.entries()).find(([_, user]) => user.login === login);

        if (!userID) {
            throw new Error('Invalid login or password');
        }

        this.logs('check_by_login', userID);
        return userID;
    }

    checkBySecret() {}

    get(id) {
        const user = this.users.get(id);

        if (!user) {
            throw new Error('User not found');
        }

        this.logs('get_user', user);
        return user;
    }

    update(id, data) {
        this.users.set(id, { id, ...data });

        this.logs('get_user_after_update', this.users);
        return id;
    }

    logs(type, data) {
        console.group('%c' + type, 'color: red;');
        console.log('some data about users:', data);
        console.groupEnd();
    }
}

export const usersService = new Users();
