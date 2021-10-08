import { forwardRef } from 'react';
import { FormControl, Select as MuiSelect, MenuItem, InputLabel } from '@mui/material';

const noneOptions = { label: 'None', value: '' };

export const Select = forwardRef((props, ref) => {
    const { label, list = [], size = 'medium', fullWidth = false, withNone = true, ...otherProps } = props;

    const options = withNone ? [noneOptions, ...list] : list;

    return (
        <FormControl size={size} fullWidth={fullWidth}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect ref={ref} label={label} {...otherProps}>
                {options.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                        {value === '' ? <em>{label}</em> : label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
});
