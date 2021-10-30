import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography } from '@mui/material';

import { CenterScreen } from 'components/layout/CenterScreen';
import { QuestionSelect } from 'components/inputs/QuestionSelect';

import { api } from 'api';

export const RegisterPage = () => {
    const history = useHistory();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async data => {
        console.log('form data after submit: ', data);
        const result = await api.register(data);

        if (result) {
            history.push('/login');
        }
    };

    return (
        <CenterScreen>
            <Paper sx={{ width: '100%', p: 2 }}>
                <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
                    Registration
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
                            rules={{
                                required: true,
                            }}
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
                                    error={Boolean(errors[field.name])}
                                    {...field}
                                />
                            )}
                            rules={{
                                required: true,
                            }}
                        />
                        <Controller
                            name="secretQuestion"
                            control={control}
                            defaultValue="1"
                            render={({ field }) => (
                                <QuestionSelect label="Question" fullWidth required withNone={false} {...field} />
                            )}
                            rules={{
                                required: true,
                            }}
                        />
                        <Controller
                            name="secretAnswer"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    label="Answer"
                                    fullWidth
                                    required
                                    error={Boolean(errors[field.name])}
                                    {...field}
                                />
                            )}
                            rules={{
                                required: true,
                            }}
                        />
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="primary" type="submit">
                                Register
                            </Button>
                            <Button color="primary" to="/login" component={RouterLink} style={{ marginLeft: 'auto' }}>
                                Back
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </CenterScreen>
    );
};
