import { memo } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import { TypeSelect } from 'components/inputs/TypeSelect';
import { DatePicker } from 'shared/DatePicker';

import { MODE_EDIT } from 'hooks/useModalForm';
import { useResource } from 'hooks/request/useResource';
import { useMessage } from 'hooks/useMessage';
import { api } from 'api';

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

const DeleteButton = props => {
    const { id, callAfterSuccessSubmit, onClose } = props;
    const message = useMessage();

    const { run: deleteTask } = useResource(api.deleteTask, {
        onSuccess: () => {
            callAfterSuccessSubmit();
            onClose();

            message.success('Success');
        },
        onError: error => {
            console.log(error);
            message.error('Success');
        },
    });

    const handleClick = () => {
        deleteTask(id);
    };

    return (
        <Button sx={{ marginLeft: 'auto' }} variant="contained" color="error" onClick={handleClick}>
            Delete
        </Button>
    );
};

const TaskFormView = props => {
    const { mode, data = {}, callAfterSuccessSubmit, onClose } = props;
    const { id, ...initialValue } = data;

    /*
        WTF? Why different logs (count logs)?
        console.log('TASK FORM RENDER COUNT') vs console.count('TASK FORM RENDER COUNT');
    */

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues: initialValue });
    const message = useMessage();

    const isEdit = mode === MODE_EDIT;

    const onSubmit = async value => {
        console.log('form data after submit: ', value);

        try {
            await (isEdit ? api.updateTask(id, value) : api.createTask(value));

            callAfterSuccessSubmit();
            onClose();

            message.success(`Success operation`);
        } catch (error) {
            message.error(`Error operation`);
        }
    };

    const onError = error => console.log('Uncaught error', error);

    return (
        <Box sx={{ p: 3 }}>
            <Typography gutterBottom variant="h5" textAlign="end">{`${isEdit ? 'Update' : 'Create'} task`}</Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
                <Stack spacing={2}>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                label="Title"
                                size="small"
                                fullWidth
                                required
                                error={Boolean(errors[field.name])}
                                {...field}
                            />
                        )}
                        rules={{ required: true }}
                    />
                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TypeSelect label="Type" size="small" fullWidth {...field} />}
                    />

                    <Stack direction="row" spacing={2}>
                        <Controller
                            name="plannedStartTime"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <DatePicker
                                    label="Planned Start Time"
                                    required
                                    error={Boolean(errors[field.name])}
                                    {...field}
                                />
                            )}
                            rules={{ required: true }}
                        />
                        <Controller
                            name="plannedEndTime"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <DatePicker
                                    label="Planned End Time"
                                    required
                                    error={Boolean(errors[field.name])}
                                    {...field}
                                />
                            )}
                            rules={{ required: true }}
                        />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <Controller
                            name="actualStartTime"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => <DatePicker label="Actual Start Time" {...field} />}
                        />
                        <Controller
                            name="actualEndTime"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => <DatePicker label="Actual End Time" {...field} />}
                        />
                    </Stack>

                    <div style={{ display: 'flex' }}>
                        <Button variant="contained" color="primary" type="submit" style={{ marginRight: 8 }}>
                            {isEdit ? 'Update' : 'Create'}
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Close
                        </Button>
                        {isEdit && (
                            <DeleteButton id={id} callAfterSuccessSubmit={callAfterSuccessSubmit} onClose={onClose} />
                        )}
                    </div>
                </Stack>
            </form>
        </Box>
    );
};

// Ignore parent component work
export const TaskForm = memo(TaskFormView);
