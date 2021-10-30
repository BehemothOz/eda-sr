import { Users } from './services/users';

const userService = new Users();

console.log(userService);

const delayWithResponse = (time, response) => new Promise(resolve => setTimeout(() => resolve(response), time));

const auth = async () => {
    return await delayWithResponse(1000, {
        token: '123456789',
    });
};

const register = async data => {
    const crearedUserID = userService.register(data);

    return await delayWithResponse(0, {
        id: crearedUserID,
    });
};

const search = () => {
    const params = { q: '', f: null };

    const request = async atr => {
        console.log('search', atr);
        await delayWithResponse(1000, {
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
};
