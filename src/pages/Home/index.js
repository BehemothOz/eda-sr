import React from 'react';
import { Container, Drawer, Typography, Card, CardContent, Button, CardActionArea, Grid } from '@mui/material';
import { Layout } from 'components/layout/Layout';
import { SearchInput } from 'components/inputs/SearchInput';
import { useModalForm } from 'hooks/useModalForm';

import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';

const data = [
    { id: 1, title: 'Cook pasta with chicken', date: 'Jan 9, 2014' },
    { id: 2, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
    { id: 3, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
    { id: 4, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
    { id: 5, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
    { id: 6, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
    { id: 7, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
    { id: 8, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
];

/*
    Fields for filter: пользователь, тип задачи, название, плановое время, фактическое время.
*/

const TaskCard = props => {
    const { data, onClick } = props;
    const { title } = data;

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
                        from 12 to 21
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export const HomePage = () => {
    const modalForm = useModalForm();
    const { state: formState } = modalForm;

    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'end', padding: 16, backgroundColor: '#e8e8e8' }}>
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
