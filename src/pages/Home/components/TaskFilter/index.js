import { Stack, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export const TaskFilter = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div style={{ padding: 16, backgroundColor: '#fff' }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
                    <TextField label="Outlined" variant="outlined" size="small" />
                    <TextField label="Outlined" variant="outlined" size="small" />
                </Stack>
            </form>
        </div>
    );
};
