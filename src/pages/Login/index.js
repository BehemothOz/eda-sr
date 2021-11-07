import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography } from '@mui/material';
import { CenterScreen } from 'components/layout/CenterScreen';
import { useMessage } from 'hooks/useMessage';
import { useAuthActions } from 'providers/AuthProvider';

import { api } from '../../api';

export const LoginPage = () => {
    const history = useHistory();
    const msg = useMessage();

    const { setUserID } = useAuthActions();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async values => {
        try {
            const userID = await api.auth(values);
            setUserID(userID);

            history.push('/profile');
        } catch (error) {
            msg.error(error.message);
        }
    };

    const onAnonymousSubmit = () => {
        history.push('/profile');
    };

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
                            defaultValue="aa"
                            render={({ field }) => (
                                <TextField
                                    label="Login"
                                    fullWidth
                                    required
                                    error={Boolean(errors[field.name])}
                                    inputProps={{
                                        autoComplete: 'new-password',
                                        form: {
                                            autoComplete: 'off',
                                        },
                                    }}
                                    {...field}
                                />
                            )}
                            rules={{ required: true }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue="aa"
                            render={({ field }) => (
                                <TextField
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    required
                                    error={Boolean(errors[field.name])}
                                    {...field}
                                />
                            )}
                            rules={{ required: true }}
                        />
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="primary" type="submit" disabled>
                                Send
                            </Button>
                            <Button variant="contained" color="secondary" to="/register" component={RouterLink}>
                                Register
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
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="success" onClick={onAnonymousSubmit}>
                                Anonymous send
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                Send with verification
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </CenterScreen>
    );
};
