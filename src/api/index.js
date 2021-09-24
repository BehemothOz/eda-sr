const delayWithResponse = (time, response) => new Promise(resolve => setTimeout(() => resolve(response), time));

const auth = async () => {
    return await delayWithResponse(1000, {
        token: '123456789',
    });
};

export const api = {
    auth,
};
