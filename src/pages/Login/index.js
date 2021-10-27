import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography, Alert, AlertTitle, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CenterScreen } from 'components/layout/CenterScreen';
import CloseIcon from '@mui/icons-material/Close';

import { api } from '../../api';
import { useCallback, forwardRef } from 'react';

const Message = forwardRef((props, ref) => {
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

const useMessage = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const toast = useCallback((msg, options) => {
        const { type, title } = options;

        enqueueSnackbar(msg, {
            content: (key, message) => (
                <Message type={type} title={title} content={message} onClose={() => closeSnackbar(key)} />
            ),
        });
    }, []);

    return {
        success: (msg, options = {}) => toast(msg, { type: 'success', ...options }),
        error: (msg, options = {}) => toast(msg, { type: 'error', ...options }),
        onClose: closeSnackbar,
    };
};

export const LoginPage = () => {
    const history = useHistory();
    const msg = useMessage();

    const { control, handleSubmit } = useForm();

    const onSubmit = async data => {
        console.log('form data after submit: ', data);
        const result = await api.auth();

        if (result.token) {
            history.push('/');
        }
    };

    const onClick = () => {
        msg.error('This is big error!');
    };

    const onClick2 = () => {
        msg.success('This is success text');
    }

    return (
        <CenterScreen>
            <Paper sx={{ position: 'relative', width: '100%', p: 2 }}>
                <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
                    Login
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            name="login"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    label="Login"
                                    fullWidth
                                    required
                                    error={false}
                                    inputProps={{
                                        autoComplete: 'new-password',
                                        form: {
                                            autoComplete: 'off',
                                        },
                                    }}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    required
                                    error={false}
                                    {...field}
                                />
                            )}
                        />
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="primary" type="submit">
                                Send
                            </Button>
                            <Button variant="contained" color="secondary" to="/register" component={RouterLink}>
                                Register
                            </Button>

                            <Button variant="contained" color="primary" onClick={onClick}>
                                -
                            </Button>
                            <Button variant="contained" color="primary" onClick={onClick2}>
                                +
                            </Button>

                            {/* <Button
                                color="primary"
                                to="/password"
                                component={RouterLink}
                                style={{ marginLeft: 'auto' }}
                            >
                                Password
                            </Button> */}
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </CenterScreen>
    );
};
