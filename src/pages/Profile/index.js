import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Paper, Container, Stack, Button } from '@mui/material';

import { Layout } from '../../components/Layout';

const Upload = () => {
    return <div style={{ width: 100, height: 100, backgroundColor: '#5c8ae85c' }}></div>
}

export const ProfilePage = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = data => console.log('form data after submit: ', data);

    return (
        <Layout>
            <Container maxWidth="xs" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <Upload />
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField label="First name" size="small" fullWidth {...field} />
                                )}
                            />
                            <Controller
                                name="middleName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField label="Middle name" size="small" fullWidth {...field} />
                                )}
                            />
                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField label="Last name" size="small" fullWidth {...field} />
                                )}
                            />
                            <Controller
                                name="q"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <TextField label="Secret Q" size="small" fullWidth {...field} />}
                            />
                            <Controller
                                name="a"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <TextField label="Secret A" size="small" fullWidth {...field} />}
                            />
                        
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Layout>
    );
};
