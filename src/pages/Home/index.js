import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';

import ImageIcon from '@mui/icons-material/Image';
import AccountCircle from '@mui/icons-material/AccountCircle';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { TaskForm } from '../../components/TaskForm'

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: '100%',
//         maxWidth: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
//     title: {
//         flexGrow: 1,
//     },
// }));

const data = [
    { id: 1, name: 'Name 1', date: 'Jan 9, 2014' },
    { id: 2, name: 'Name 2', date: 'Jan 9, 2014' },
    { id: 3, name: 'Name 3', date: 'Jan 9, 2014' },
];

export default function FolderList() {
    const classes = {};
    const [visible, setVisible] = useState();

    const toggleDrawer = () => {
        setVisible(prev => !prev)
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
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

            <div style={{ height: 32 }} />

            <Container maxWidth="md">
                <List className={classes.root}>
                    {data.map(dataItem => {
                        return (
                            <ListItem key={dataItem.id} onClick={toggleDrawer} style={{ cursor: 'pointer' }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={dataItem.name} secondary={dataItem.date} />
                            </ListItem>
                        );
                    })}
                </List>
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
