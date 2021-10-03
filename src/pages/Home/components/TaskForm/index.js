import { TextField, Button, FormControl, Select, MenuItem, InputLabel, Stack, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';

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
    console.log(data);
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
                            style={{ marginBottom: 8 * 2 }}
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
                <FormControl sx={{ marginBottom: 2 }} size="small" fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <Select label="Type" {...field}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                {/* <FormHelperText>With label + helper text</FormHelperText> */}
                            </>
                        )}
                    />
                </FormControl>
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
