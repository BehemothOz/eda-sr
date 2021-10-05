import { forwardRef } from 'react';
import { Select } from 'shared/Select';

const list = [
    { label: 'User 1', value: 1 },
    { label: 'User 2', value: 2 },
    { label: 'User 3', value: 3 },
];

export const UserSelect = forwardRef((props, ref) => <Select ref={ref} list={list} {...props} />);
