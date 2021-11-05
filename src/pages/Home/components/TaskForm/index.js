import React, { memo } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';

import { TypeSelect } from 'components/inputs/TypeSelect';
import { DatePicker } from 'shared/DatePicker';

import { MODE_EDIT } from 'hooks/useModalForm';

import { useResource } from 'hooks/useResource';
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

const useFormRequest = (mode, onSuccess, onError) => {
    const { run: create } = useResource(api.createTask, { onSuccess, onError });
    // const { run: update } = useResource(api.updateTask, { onSucces, onError });

    return mode === MODE_EDIT ? () => {} : create;
};

/*
    useForm({ defaultValues: { name: value, ... } })
*/

function usePrevious(value) {
    const ref = React.useRef();

    React.useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

const funcR = (p = {}, c = {}) => {
    return Object.entries(c).reduce((acc, it) => {
        const [key, value] = it;
        return {
            ...acc,
            [key]: {
                prev: p[key],
                curr: value,
                equal: p[key] === value
            }
        }
    }, {})
}

const TaskFormView = props => {
    const { mode, data = {}, callAfterSuccessSubmit, onClose } = props;
    const { title } = data;

    const prevValue = usePrevious(props);

    React.useEffect(() => {
        console.log(funcR(prevValue, props))
    })

    console.log('TASK FORM RENDER COUNT', props);

    const { control, handleSubmit } = useForm();
    const message = useMessage();

    const request = useFormRequest(
        mode,
        () => {
            message.success(`Success operation`);

            callAfterSuccessSubmit();
            onClose();
        },
        () => {
            message.error(`Error operation`);
        }
    );

    const isEdit = mode === MODE_EDIT;

    const onSubmit = async data => {
        console.log('form data after submit: ', data);

        request({ title: '1212', from: new Date(), to: new Date() });
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
                        render={({ field }) => <TypeSelect label="Type" size="small" fullWidth {...field} />}
                    />

                    <Stack direction="row" spacing={2}>
                        <Controller
                            name="plannedStartTime"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => <DatePicker label="Planned Start Time" {...field} />}
                        />
                        <Controller
                            name="plannedEndTime"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => <DatePicker label="Planned End Time" {...field} />}
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
                    </div>
                </Stack>
            </form>
        </Box>
    );
};

// Ignore parent component work
export const TaskForm = memo(TaskFormView);
