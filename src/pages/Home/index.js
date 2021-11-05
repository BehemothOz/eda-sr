import React, { useEffect } from 'react';
import { Container, Drawer, Button } from '@mui/material';
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

export const HomePage = () => {
    const { data, status, run: request } = useResource(api.getTasks);
    console.log(status);

    useEffect(() => {
        request('one_args', 'two_args');
    }, [request]);

    const modalForm = useModalForm();
    const { state: formState } = modalForm;

    const create = async () => {
        try {
            await api.createTask({ title: 'Mock', from: new Date(), to: new Date() });
            request();
        } catch (error) {
            console.log('111111', error);
        }
    };

    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'end', padding: 16, backgroundColor: '#e8e8e8' }}>
                <Button variant="contained" style={{ marginRight: 16 }} onClick={create}>
                    Auto Create
                </Button>
                <Button variant="contained" style={{ marginRight: 16 }} onClick={modalForm.onOpenCreate}>
                    Create
                </Button>
                <SearchInput />
            </div>

            <TaskFilter />

            <Container maxWidth="lg" style={{ paddingTop: 16, paddingBottom: 16 }}>
                <Tasks data={data} onOpen={modalForm.onOpenEdit} />
            </Container>

            <Drawer open={formState.visible} onClose={modalForm.onClose}>
                <TaskForm mode={formState.mode} data={formState.payload} onClose={modalForm.onClose} />
            </Drawer>
        </Layout>
    );
};
