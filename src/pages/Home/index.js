import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { Container, Drawer, Typography, Card, CardContent, Button, CardActionArea, Grid } from '@mui/material';
import { Layout } from 'components/layout/Layout';
import { SearchInput } from 'components/inputs/SearchInput';
import { useModalForm } from 'hooks/useModalForm';

import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';

import { api } from 'api';

const view = date => {
    return format(date, 'd MMMM p'); // view ex: day month time
};

/*
    Fields for filter: пользователь, тип задачи, название, плановое время, фактическое время.
*/

const TaskCard = props => {
    const { data, onClick } = props;
    const { title, from, to } = data;

    const handleClick = () => {
        onClick && onClick(data);
    };

    return (
        <Card onClick={handleClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        from {view(from)} to {view(to)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

/*
    statuses

    idle | pending | resolved | rejected

    isLoading: status === 'idle' || status === 'pending'
*/

function someReducer(state, action) {
    switch (action.type) {
      case 'error': {
        return {
          ...state,
          status: 'rejected',
          error: action.error,
        }
      }
      case 'success': {
        return {
          ...state,
          status: 'resolved',
          position: action.position,
        }
      }
      case 'started': {
        return {
          ...state,
          status: 'pending',
        }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }

/*
    TODO:
        - link for async func
        - clear state
*/
const useResource = asyncFunc => {
    const [data, setData] = useState([]);

    const run = useCallback(
        async (...args) => {
            try {
                const response = await asyncFunc(...args);
                setData(response);
            } catch (error) {
                console.error(error);
            }
        },
        [asyncFunc]
    );

    return {
        data,
        run,
    };
};

export const HomePage = () => {
    const { data, run: request } = useResource(api.getTasks);

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
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {data.map(dataItem => {
                        const { id } = dataItem;

                        return (
                            <Grid key={id} item xs={4}>
                                <TaskCard data={dataItem} onClick={modalForm.onOpenEdit} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            <Drawer open={formState.visible} onClose={modalForm.onClose}>
                <TaskForm mode={formState.mode} data={formState.payload} onClose={modalForm.onClose} />
            </Drawer>
        </Layout>
    );
};
