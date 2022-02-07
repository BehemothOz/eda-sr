import { nanoid } from 'nanoid';

const MAX_LENGTH = 6;

const generateIDAdapter = () => {
    return {
        get: (length = MAX_LENGTH) => {
            return nanoid(length);
        },
    };
};

export const generateID = generateIDAdapter();
