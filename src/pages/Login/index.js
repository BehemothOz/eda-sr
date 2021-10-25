import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography, Alert, IconButton, Box, Fade  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CenterScreen } from 'components/layout/CenterScreen';

import msg from 'components/alert'

import { api } from '../../api';

export const LoginPage = () => {
    const history = useHistory();

    const { control, handleSubmit } = useForm();

    const [open, setOpen] = useState(false);

    const onSubmit = async data => {
        console.log('form data after submit: ', data);
        const result = await api.auth();

        if (result.token) {
            history.push('/');
        }
    };

    const onClick = () => {
        msg.error('sadasd');
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
                                +
                            </Button>

                            <Button
                                color="primary"
                                to="/password"
                                component={RouterLink}
                                style={{ marginLeft: 'auto' }}
                            >
                                Password
                            </Button>
                        </Stack>
                    </Stack>
                </form>

                <Fade in={open}>
                    <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: -64 }}>
                        <Alert
                            variant="filled"
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Some error!
                        </Alert>
                    </Box>
                </Fade>
            </Paper>
        </CenterScreen>
    );
};
