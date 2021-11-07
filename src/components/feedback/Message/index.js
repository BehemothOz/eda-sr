import { forwardRef } from 'react';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/*
    TODO: replace the green color with this one - #4caf50
*/

export const Message = forwardRef((props, ref) => {
    const { type = 'default', title, content, onClose, ...other } = props;

    return (
        <Alert
            ref={ref}
            severity={type}
            variant="filled"
            action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            {...other}
        >
            {title && <AlertTitle>{title}</AlertTitle>}
            {content}
        </Alert>
    );
});
