import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Paper, Button, Stack, Typography } from '@mui/material';
import { CenterScreen } from 'components/layout/CenterScreen';
import { useMessage } from 'hooks/useMessage';
import { api } from 'api';

export const RestorePasswordForm = props => {
    const { callAfterSuccessSubmit } = props;

    const msg = useMessage();
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async data => {
        console.log('form data after submit: ', data);

        try {
            const userID = await api.checkUser(data);
            const user = await api.getUserToVerify(userID);

            callAfterSuccessSubmit && callAfterSuccessSubmit(user);
        } catch (error) {
            console.log(error);
            msg.error('Error operation');
        }
    };

    return (
        <CenterScreen>
            <Paper sx={{ width: '100%', p: 2 }}>
                <Typography gutterBottom variant="h6" sx={{ color: 'text.secondary' }}>
                    Restore Password
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
                            rules={{ required: true }}
                        />
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="primary" type="submit">
                                Send
                            </Button>
                            <Button color="primary" to="/" component={RouterLink} style={{ marginLeft: 'auto' }}>
                                Back
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </CenterScreen>
    );
};
