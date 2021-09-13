import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

import { TextField, Paper, Button } from '@material-ui/core';

import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

export const ProfilePage = () => {
    const classes = useStyles();

    const { control, handleSubmit } = useForm();

    const onSubmit = data => console.log('form data after submit: ', data);

    console.count('Render:ProfilePage');

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
            
            <div style={{ padding: 16 }}>
                <Paper className={classes.paper}>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField label="First name" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField label="Last name" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />}
                        />
                        <Controller
                            name="q"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField label="Secret Q" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />}
                        />
                        <Controller
                            name="a"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField label="Secret A" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />}
                        />
                        {/* <Button variant="contained" color="primary" type="submit">
                            Send
                        </Button> */}
                    </form>
                </Paper>
            </div>
        </>
    );
};
