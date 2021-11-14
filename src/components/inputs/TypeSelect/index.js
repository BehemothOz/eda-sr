import { forwardRef } from 'react';
import { Select } from 'shared/Select';

export const typeList = [
    { label: 'Type 1', value: 1 },
    { label: 'Type 2', value: 2 },
    { label: 'Type 3', value: 3 },
];

export const TypeSelect = forwardRef((props, ref) => <Select ref={ref} list={typeList} {...props} />);
