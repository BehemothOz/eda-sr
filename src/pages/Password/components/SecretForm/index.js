import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography, Box } from '@mui/material';

import { CenterScreen } from 'components/layout/CenterScreen';
import { questionList } from 'components/inputs/QuestionSelect';

export const SecretPasswordForm = props => {
    const { data, onBack } = props;
    const { secretQuestion } = data;

    const history = useHistory();
    const { control, handleSubmit } = useForm();

    const question = questionList.reduce((acc, it) => (it.value === secretQuestion ? it.label : acc), '');

    const onSubmit = async data => {
        console.log('form data after submit: ', data);
        // history.push('/password/restore');
    };

    return (
        <CenterScreen>
            <Paper sx={{ width: '100%', p: 2 }}>
                <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
                    Restore password
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Box>
                            Question: <i>{question}</i>?
                        </Box>
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
                                Login
                            </Button>
                            <Button color="primary" onClick={onBack}>
                                Back
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </CenterScreen>
    );
};
