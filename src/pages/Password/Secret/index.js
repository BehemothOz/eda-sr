import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography } from '@mui/material';

import { CenterScreen } from '../../../components/CenterScreen';
import { QuestionSelect } from '../../../components/QuestionSelect';

export const SecretPasswordPage = () => {
    const history = useHistory();
    const { control, handleSubmit } = useForm();

    const onSubmit = async data => {
        console.log('form data after submit: ', data);
        history.push('/password/restore');
    };

    return (
        <CenterScreen>
            <Paper sx={{ width: '100%', p: 2 }}>
                <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
                    Restore password
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            name="question"
                            control={control}
                            defaultValue="1"
                            render={({ field }) => <QuestionSelect label="Question" fullWidth required {...field} />}
                        />
                        <Controller
                            name="answer"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField label="Answer" fullWidth {...field} />}
                        />
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="primary" type="submit">
                                Send
                            </Button>
                            <Button color="secondary" to="/login" component={RouterLink} style={{ marginLeft: 'auto' }}>
                                login
                            </Button>
                            <Button color="primary" to="/password" component={RouterLink}>
                                back
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </CenterScreen>
    );
};
