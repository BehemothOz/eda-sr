import React, { useState } from 'react';
import { Container, Drawer, Typography, Stack, Card, CardContent, Button, CardActionArea } from '@mui/material';

import { Layout } from '../../components/Layout';
import { SearchInput } from '../../shared/SearchInput';
import { TaskForm } from '../../components/TaskForm';

const data = [
    { id: 1, title: 'Cook pasta with chicken', date: 'Jan 9, 2014' },
    { id: 2, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
];

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
