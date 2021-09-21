const delay = (time, response) => new Promise(resolve => setTimeout(() => resolve(response), time));

const auth = async () => {
    return await delay(1000, {
        token: '123456789'
    });
}

export const api = {
    auth
}