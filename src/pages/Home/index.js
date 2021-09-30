import React, { useState } from 'react';
import {
    Container,
    Drawer,
    Typography,
    Stack,
    Card,
    CardContent,
    Button,
    CardActionArea,
    TextField,
    Grid,
} from '@mui/material';

import { Layout } from '../../components/Layout';
import { SearchInput } from '../../shared/SearchInput';
import { TaskForm } from '../../components/TaskForm';
import { previousDay } from 'date-fns';

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

const MODE_EDIT = 'edit';
const MODE_CREATE = 'create';

const defaultState = {
    visible: false,
    mode: MODE_CREATE,
    payload: null,
};

const useModalForm = () => {
    const [state, setState] = useState(defaultState);

    const onOpenEdit = payload => {
        setState({
            visible: true,
            mode: MODE_EDIT,
            payload,
        });
    };

    const onOpenCreate = () => {
        setState({
            visible: true,
            mode: MODE_CREATE,
            payload: null,
        });
    };

    const onClose = () => {
        setState(defaultState);
    };

    return {
        state,
        onOpenEdit,
        onOpenCreate,
        onClose,
    };
};

export const HomePage = () => {
    const modalForm = useModalForm();

    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'end', padding: 16, backgroundColor: '#e8e8e8' }}>
                <Button variant="contained" style={{ marginRight: 16 }} onClick={modalForm.onOpenCreate}>
                    Create
                </Button>
                <SearchInput />
            </div>

            <div style={{ padding: 16, backgroundColor: '#fff' }}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                </Stack>
            </div>

            <Container maxWidth="lg" style={{ paddingTop: 16, paddingBottom: 16 }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {data.map(dataItem => {
                        const { id, title } = dataItem;

                        return (
                            <Grid item xs={4}>
                                <Card key={id} onClick={() => modalForm.onOpenEdit()}>
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
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            <Drawer open={modalForm.state.visible} onClose={modalForm.onClose}>
                <TaskForm />
            </Drawer>
        </Layout>
    );
};
