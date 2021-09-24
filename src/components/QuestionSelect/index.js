import { forwardRef } from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const list = [
    { label: '1 + 1', value: 1 },
    { label: '5 + 5', value: 2 },
    { label: '6 + 7', value: 3 },
    { label: '8 + 9', value: 4 },
];

export const QuestionSelect = forwardRef((props, ref) => {
    const { label, ...otherProps } = props;
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select ref={ref} label={label} {...otherProps}>
                {list.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});
