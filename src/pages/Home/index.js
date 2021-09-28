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
} from '@mui/material';

import { Layout } from '../../components/Layout';
import { SearchInput } from '../../shared/SearchInput';
import { TaskForm } from '../../components/TaskForm';

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

export const HomePage = () => {
    const [visible, setVisible] = useState();

    const toggleDrawer = () => {
        setVisible(prev => !prev);
    };

    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'end', padding: 16, backgroundColor: '#e8e8e8' }}>
                <Button variant="contained" style={{ marginRight: 16 }} onClick={toggleDrawer}>
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

            <Container maxWidth="xs" style={{ paddingTop: 16, paddingBottom: 16 }}>
                <Stack spacing={1}>
                    {data.map(dataItem => {
                        const { id, title } = dataItem;

                        return (
                            <Card key={id} onClick={toggleDrawer}>
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
                    })}
                </Stack>
            </Container>

            <Drawer open={visible} onClose={toggleDrawer}>
                <TaskForm />
            </Drawer>
        </Layout>
    );
};
