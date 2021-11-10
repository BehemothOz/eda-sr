import { forwardRef } from 'react';
import { Select } from 'shared/Select';

export const questionList = [
    { label: '1 + 1', value: 1 },
    { label: '5 + 5', value: 2 },
    { label: '6 + 7', value: 3 },
    { label: '8 + 9', value: 4 },
];

export const QuestionSelect = forwardRef((props, ref) => <Select ref={ref} list={questionList} {...props} />);
