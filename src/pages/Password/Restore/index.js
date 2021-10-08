import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography } from '@mui/material';

import { CenterScreen } from 'components/layout/CenterScreen';

export const RestorePasswordPage = () => {
    const history = useHistory();

    const { control, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log('form data after submit: ', data);
        history.push('/login');
    };

    return (
        <CenterScreen>
            <Paper sx={{ width: '100%', p: 2 }}>
                <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
                    New Password
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            name="newPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
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
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="primary" type="submit">
                                Send
                            </Button>
                            <Button color="primary" to="/login" component={RouterLink} style={{ marginLeft: 'auto' }}>
                                login
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </CenterScreen>
    );
};
