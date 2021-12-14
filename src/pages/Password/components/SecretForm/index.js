import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography, Box } from '@mui/material';

import { CenterScreen } from 'components/layout/CenterScreen';
import { useMessage } from 'hooks/useMessage';
import { getLabelForQuestionList } from 'libs/getLabelByValue';
import { api } from 'api';

export const SecretPasswordForm = props => {
    const { data, onBack } = props;
    const { secretQuestion } = data;

    const history = useHistory();
    const msg = useMessage();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async value => {
        console.log('form data after submit: ', value);

        try {
            await api.checkUserBySecret({ login: data.login, ...value });

            msg.success('Success operation');
            history.push('/password/restore');
        } catch (error) {
            msg.error('Error operation');
        }
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
                            Question: <i>{getLabelForQuestionList(secretQuestion)}</i>?
                        </Box>
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
                            rules={{ required: true }}
                        />
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="primary" type="submit">
                                Send
                            </Button>
                            <Button color="secondary" to="/" component={RouterLink} style={{ marginLeft: 'auto' }}>
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
