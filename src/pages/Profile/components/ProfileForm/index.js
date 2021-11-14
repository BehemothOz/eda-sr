import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Paper, Stack, Button } from '@mui/material';
import { QuestionSelect } from 'components/inputs/QuestionSelect';

import { useMessage } from 'hooks/useMessage';
import { useAuthActions } from 'providers/AuthProvider';

import { api } from 'api';

const Upload = () => {
    return <div style={{ width: 100, height: 100, backgroundColor: '#5c8ae85c' }}></div>;
};

export const ProfileForm = props => {
    const { data } = props;
    const { id, ...initialValues } = data;

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues: initialValues });

    const { setUser } = useAuthActions();
    const msg = useMessage();

    const onSubmit = async value => {
        try {
            await api.updateUser(id, value);
            setUser({ id, ...value });

            msg.success('Success operation');
        } catch (error) {
            msg.error('Error operation');
        }
    };

    return (
        <Paper sx={{ p: 2 }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <Upload />
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField label="First name" size="small" fullWidth {...field} />}
                    />
                    <Controller
                        name="middleName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField label="Middle name" size="small" fullWidth {...field} />}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField label="Last name" size="small" fullWidth {...field} />}
                    />
                    <Controller
                        name="secretQuestion"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <QuestionSelect label="Question" size="small" fullWidth withNone={false} {...field} />
                        )}
                    />
                    <Controller
                        name="secretAnswer"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                label="Answer"
                                size="small"
                                required
                                error={Boolean(errors[field.name])}
                                fullWidth
                                {...field}
                            />
                        )}
                        rules={{ required: true }}
                    />

                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
};
