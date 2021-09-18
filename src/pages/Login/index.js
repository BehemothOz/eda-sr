import { Children } from 'react';
import { TextField, Paper, Button } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';

// const useStyles = makeStyles(theme => ({
//     paper: {
//         padding: theme.spacing(2),
//     },
//     input: {},
// }));

const CenterScreen = props => {
    const { children } = props;

    let child;
    if (process.env.NODE_ENV === 'development') {
        try {
            child = Children.only(children);
        } catch (err) {
            console.error('CenterScreen component render error. See Children.only(children)');
            // TODO: throw new Error('Children.only(children) error');
        }
    } else {
        child = Children.only(children);
    }

    return (
        <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}
        >
            {child}
        </div>
    );
};

export const LoginPage = () => {
    const classes = {};
    const history = useHistory();

    const { control, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log('form data after submit: ', data);
        history.push('/');
    };

    // console.count('Render:LoginPage'); - count 2

    return (
        <CenterScreen>
            <Paper className={classes.paper}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="login"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                label="Login"
                                fullWidth
                                required
                                error={false}
                                style={{ marginBottom: 8 }}
                                inputProps={{
                                    autoComplete: 'new-password',
                                    form: {
                                        autoComplete: 'off',
                                    },
                                }}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                type="password"
                                label="Password"
                                fullWidth
                                required
                                error={false}
                                style={{ marginBottom: 8 * 2 }}
                                {...field}
                            />
                        )}
                    />
                    <div style={{ display: 'flex' }}>
                        <Button variant="contained" color="primary" type="submit" style={{ marginRight: 8 }}>
                            Send
                        </Button>
                        <Button variant="contained" color="secondary" to="/register" component={RouterLink}>
                            Register
                        </Button>
                        <Button color="primary" to="/password" component={RouterLink} style={{ marginLeft: 'auto' }}>
                            Password
                        </Button>
                    </div>
                </form>
            </Paper>
        </CenterScreen>
    );
};
