import { TextField, Button, FormControl, Stack, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import { TypeSelect } from 'components/inputs/TypeSelect';

import { MODE_EDIT } from 'hooks/useModalForm';

/*
    название задачи
    тип задачи
    плановое время начала
    плановое время окончания
    фактическое время начала
    фактическое время окончания

    title
    type
    plannedStartTime
    plannedEndTime
    actualStartTime
    actualEndTime
*/

export const TaskForm = props => {
    const { mode, data = {}, onClose } = props;
    const { title } = data;

    const { control, handleSubmit } = useForm();

    const isEdit = mode === MODE_EDIT;

    const onSubmit = data => {
        console.log('form data after submit: ', data);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography gutterBottom variant="h5" textAlign="end">{`${isEdit ? 'Update' : 'Create'} task`}</Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    defaultValue={title || ''}
                    render={({ field }) => (
                        <TextField
                            label="Title"
                            fullWidth
                            required
                            error={false}
                            size="small"
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
                    name="type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TypeSelect label="Type" size="small" fullWidth {...field} />
                    )}
                />

                <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                    <Controller
                        name="plannedStartTime"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => {
                            return (
                                <DatePicker
                                    label="Planned Start Time"
                                    renderInput={params => <TextField size="small" {...params} />}
                                    {...field}
                                />
                            );
                        }}
                    />
                    <Controller
                        name="plannedEndTime"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DatePicker
                                label="Planned End Time"
                                renderInput={params => <TextField size="small" {...params} />}
                                {...field}
                            />
                        )}
                    />
                </Stack>

                <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                    <Controller
                        name="actualStartTime"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DatePicker
                                label="Actual Start Time"
                                renderInput={params => <TextField size="small" {...params} />}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="actualEndTime"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DatePicker
                                label="Actual End Time"
                                renderInput={params => <TextField size="small" {...params} />}
                                {...field}
                            />
                        )}
                    />
                </Stack>
                
                <div style={{ display: 'flex' }}>
                    <Button variant="contained" color="primary" type="submit" style={{ marginRight: 8 }}>
                        {isEdit ? 'Update' : 'Create'}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </form>
        </Box>
    );
};
