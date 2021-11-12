import { Grid } from '@mui/material';
import { TaskCard } from '../TaskCard';

export const Tasks = props => {
    const { data, onOpen } = props;

    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {data.map(dataItem => {
                const { id } = dataItem;

                return (
                    <Grid key={id} item xs={4}>
                        <TaskCard data={dataItem} onClick={onOpen} />
                    </Grid>
                );
            })}
        </Grid>
    );
};
