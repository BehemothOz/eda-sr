import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import MuiDatePicker from '@mui/lab/DatePicker';

export const DatePicker = forwardRef((props, ref) => {
    const { label, size = 'small', fullWidth = true, ...other } = props;

    return (
        <MuiDatePicker
            ref={ref}
            label={label}
            renderInput={params => <TextField size={size} fullWidth={fullWidth} {...params} />}
            {...other}
        />
    );
});
