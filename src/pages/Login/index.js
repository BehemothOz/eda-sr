import { Children } from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
    },
    input: {},
}));

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
    const classes = useStyles();
    const { control, handleSubmit } = useForm();

    const onSubmit = data => console.log('form data after submit: ', data);

    console.count('Render:LoginPage');

    return (
        <CenterScreen>
            <Paper className={classes.paper}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="login"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField label="Login" fullWidth style={{ marginBottom: 8 }} {...field} />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField type="password" label="Password" fullWidth style={{ marginBottom: 8 * 2 }} {...field} />}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Send
                    </Button>
                </form>
            </Paper>
        </CenterScreen>
    );
};
