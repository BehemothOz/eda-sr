import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Paper, Container, Stack, Button } from '@mui/material';

import { Layout } from 'components/layout/Layout';
import { QuestionSelect } from 'components/inputs/QuestionSelect';

import { useResource } from 'hooks/useResource';
import { api } from 'api';

const Upload = () => {
    return <div style={{ width: 100, height: 100, backgroundColor: '#5c8ae85c' }}></div>;
};

const ProfileForm = () => {
    const { control, handleSubmit } = useForm();
    // console.count('ProfilePage')
    const onSubmit = data => console.log('form data after submit: ', data);

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
                        render={({ field }) => <TextField label="Answer" size="small" fullWidth {...field} />}
                    />

                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
};

export const ProfilePage = () => {
    return (
        <Layout>
            <Container maxWidth="xs" sx={{ p: 2 }}>
                <ProfileForm />
            </Container>
        </Layout>
    );
};
