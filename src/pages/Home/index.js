import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

import { TaskForm } from '../../components/TaskForm'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        flexGrow: 1,
    },
}));

const data = [
    { id: 1, name: 'Name 1', date: 'Jan 9, 2014' },
    { id: 2, name: 'Name 2', date: 'Jan 9, 2014' },
    { id: 3, name: 'Name 3', date: 'Jan 9, 2014' },
];

export default function FolderList() {
    const classes = useStyles();
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
