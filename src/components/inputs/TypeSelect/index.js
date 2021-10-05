import { forwardRef } from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const list = [
    { label: 'Type 1', value: 1 },
    { label: 'Type 2', value: 2 },
    { label: 'Type 3', value: 3 },
];

const noneOptions = { label: 'None', value: '' };

export const TypeSelect = forwardRef((props, ref) => {
    const { label, size = 'medium', fullWidth = false, withNone = true, ...otherProps } = props;

    const options = withNone ? [noneOptions, ...list] : list;

    return (
        <FormControl size={size} fullWidth={fullWidth}>
            <InputLabel>{label}</InputLabel>
            <Select ref={ref} label={label} {...otherProps}>
                {options.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                        {value === '' ? <em>{label}</em> : label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});
