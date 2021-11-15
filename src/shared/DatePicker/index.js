import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import MuiDatePicker from '@mui/lab/DatePicker';

/*
    Validation: https://next.material-ui-pickers.dev/guides/forms
*/

export const DatePicker = forwardRef((props, ref) => {
    const { label, size = 'small', fullWidth = true, required = false, error = false, ...other } = props;

    return (
        <MuiDatePicker
            ref={ref}
            label={label}
            renderInput={params => {
                const { error: inputError, ...otherParams } = params;
                return (
                    <TextField size={size} fullWidth={fullWidth} required={required} error={error} {...otherParams} />
                );
            }}
            {...other}
        />
    );
});
