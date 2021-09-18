import { Children } from 'react';
import { TextField, Paper, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';

// const useStyles = makeStyles(theme => ({
//     paper: {
//         padding: theme.spacing(2),
//     },
//     input: {},
// }));

/*
    название задачи
    тип задачи
    плановое время начала
    плановое время окончания
    фактическое время начала
    фактическое время окончания
*/

export const TaskForm = () => {
    const classes = {};
    const history = useHistory();

    const { control, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log('form data after submit: ', data);
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="login"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        label="title"
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
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...field}
                    />
                )}
            />
            <div style={{ display: 'flex' }}>
                <Button variant="contained" color="primary" type="submit" style={{ marginRight: 8 }}>
                    Save
                </Button>
                <Button variant="contained" color="secondary">
                    Close
                </Button>
            </div>
        </form>
    );
};
