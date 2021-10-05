import { Stack, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { TypeSelect } from 'components/inputs/TypeSelect';
import { UserSelect } from 'components/inputs/UserSelect';

export const TaskFilter = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div style={{ padding: 16, backgroundColor: '#fff' }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Controller
                        name="user"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <UserSelect label="User" size="small" fullWidth {...field} />}
                    />
                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TypeSelect label="Type" size="small" fullWidth {...field} />}
                    />
                    <TextField label="Outlined" variant="outlined" size="small" />
                    <TextField label="Outlined" variant="outlined" size="small" />
                </Stack>
            </form>
        </div>
    );
};
