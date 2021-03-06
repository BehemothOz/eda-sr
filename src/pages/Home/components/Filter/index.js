import { useEffect } from 'react';
import { Stack, Container } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { TypeSelect } from 'components/inputs/TypeSelect';
import { UserSelect } from 'components/inputs/UserSelect';
import { DatePicker } from 'shared/DatePicker';

export const TaskFilter = props => {
    const { onSetParams } = props;
    const { control, watch, handleSubmit } = useForm();

    useEffect(() => {
        const subscription = watch(() => {
            handleSubmit(onSetParams)();
        });

        return () => subscription.unsubscribe();
    }, [watch, handleSubmit, onSetParams]);

    return (
        <div style={{ padding: '16px 0', backgroundColor: '#fff' }}>
            <Container maxWidth="lg">
                <form noValidate autoComplete="off">
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
                        <Controller
                            name="a"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => <DatePicker label="Time 1" {...field} />}
                        />
                        <Controller
                            name="b"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => <DatePicker label="Time 2" {...field} />}
                        />
                    </Stack>
                </form>
            </Container>
        </div>
    );
};
