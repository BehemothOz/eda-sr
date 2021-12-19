import React, { useEffect, useState } from 'react';
import { Container, Drawer, Button, Box, CircularProgress, Alert } from '@mui/material';
import { Layout } from 'components/layout/Layout';
import { SearchInput } from 'components/inputs/SearchInput';
import { useModalForm } from 'hooks/useModalForm';
import { useResource } from 'hooks/useResource';
import { api } from 'api';

import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';
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

const ErrorLayout = () => {
    return (
        <Box>
            <Alert severity="error" variant="outlined">
                This is an error alert — check it out!
            </Alert>
        </Box>
    );
};

const updateParams = newParams => previousParams => ({ ...previousParams, ...newParams });

const Heading = props => {
    const { onCreate, getTasks } = props;

    const [params, setParams] = useState({});

    useEffect(() => {
        getTasks(params);
    }, [getTasks, params]);

    const onSetParams = value => {
        setParams(updateParams(value));
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', padding: 16, backgroundColor: '#e8e8e8' }}>
                <Button variant="contained" style={{ marginRight: 16 }} onClick={onCreate}>
                    Create
                </Button>
                <SearchInput onSetParams={onSetParams} />
            </div>

            <TaskFilter />
        </>
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

            <Container maxWidth="lg" style={{ paddingTop: 16, paddingBottom: 16 }}>
                {status === 'pending' && <SpinLayout />}
                {status === 'rejected' && <ErrorLayout />}
                {status === 'resolved' && data.length !== 0 && <Tasks data={data} onOpen={modalForm.onOpenEdit} />}
                {/* {status === 'resolved' && data.length === 0 && (
                    <Box sx={{ p: 2, textAlign: 'center' }}>Create first task</Box>
                )} */}
            </Container>

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
