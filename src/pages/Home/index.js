import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import AccountCircle from '@mui/icons-material/AccountCircle';

import { CardActionArea } from '@mui/material';

import { SearchInput } from '../../shared/SearchInput'
import { TaskForm } from '../../components/TaskForm';

const data = [
    { id: 1, title: 'Cook pasta with chicken', date: 'Jan 9, 2014' },
    { id: 2, title: 'Go to the store for glasses', date: 'Jan 9, 2014' },
];

export default function FolderList() {
    const [visible, setVisible] = useState();

    const toggleDrawer = () => {
        setVisible(prev => !prev);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Some title
                    </Typography>

                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => {}}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div style={{ display: 'flex', justifyContent: 'end', padding: 16, backgroundColor: '#e8e8e8' }}>
                <Button variant="contained" style={{ marginRight: 16 }} onClick={toggleDrawer}>Create</Button>
                <SearchInput />
            </div>

            <Container maxWidth="xs" style={{ paddingTop: 16, paddingBottom: 16}}>
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
        </>
    );
}

export const HomePage = () => {
    return <FolderList />;
};
