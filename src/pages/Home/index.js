import React from 'react';
import { Container, Drawer, Box, CircularProgress, Alert } from '@mui/material';
import { Layout } from 'components/layout/Layout';
import { useModalForm } from 'hooks/useModalForm';
import { useResource } from 'hooks/useResource';
import { api } from 'api';

import { LoadingOverlay } from './components/LoadingOverlay';
import { Heading } from './components/Heading';
import { TaskForm } from './components/Form';
import { Tasks } from './components/Tasks';

/*
    Fields for filter: пользователь, тип задачи, название, плановое время, фактическое время.
*/

const SpinLayout = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
};

const ErrorLayout = props => {
    const { msg = 'Something went wrong' } = props;

    return (
        <Alert severity="error" variant="outlined">
            {msg}
        </Alert>
    );
};

export const HomePage = () => {
    const { data, status, run: getTasks } = useResource(api.getTasks, { initialData: [] });
    console.log('STATUS tasks', status);

    const modalForm = useModalForm();
    const { state: formState } = modalForm;

    return (
        <Layout>
            <Heading onCreate={modalForm.onOpenCreate} getTasks={getTasks} />

            <LoadingOverlay visible={status === 'pending' && data.length !== 0}>
                <Container maxWidth="lg" style={{ paddingTop: 16, paddingBottom: 16 }}>
                    {status === 'pending' && data.length === 0 && <SpinLayout />}
                    {status === 'rejected' && <ErrorLayout />}

                    <Tasks data={data} onOpen={modalForm.onOpenEdit} />
                </Container>
            </LoadingOverlay>

            <Drawer open={formState.visible} ModalProps={{ closeAfterTransition: true }} onClose={modalForm.onClose}>
                <TaskForm
                    mode={formState.mode}
                    data={formState.payload}
                    callAfterSuccessSubmit={getTasks}
                    onClose={modalForm.onClose}
                />
            </Drawer>
        </Layout>
    );
};
