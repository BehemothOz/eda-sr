import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography } from '@mui/material';

import { CenterScreen } from '../../components/CenterScreen';
import { QuestionSelect } from '../../components/QuestionSelect'

export const RegisterPage = () => {
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
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="question"
                            control={control}
                            defaultValue="1"
                            render={({ field }) => (
                                <QuestionSelect
                                    label="Question"
                                    fullWidth
                                    required
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="answer"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    label="Answer"
                                    fullWidth
                                    required
                                    {...field}
                                />
                            )}
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
