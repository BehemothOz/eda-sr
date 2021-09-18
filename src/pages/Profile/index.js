import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';

import { TextField, Paper, Button } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: '100%',
//         maxWidth: 360,
//         backgroundColor: theme.palette.background.paper,
//     },
//     title: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//     },
// }));

export const ProfilePage = () => {
    const classes = {};

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
                            render={({ field }) => (
                                <TextField label="First name" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField label="Last name" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />
                            )}
                        />
                        <Controller
                            name="q"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField label="Secret Q" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />
                            )}
                        />
                        <Controller
                            name="a"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField label="Secret A" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />
                            )}
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
