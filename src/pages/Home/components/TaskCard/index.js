import { Typography, Card, CardContent, CardActionArea, Box } from '@mui/material';
import { format } from 'date-fns';
import { getLabelForTypeList } from 'libs/getLabelByValue';

const view = date => {
    return format(date, 'd MMM p'); // view ex: day month time
};

const TimeRange = props => {
    const { from, to } = props;

    return (
        <Typography variant="body2">
            <b>from</b>{' '}
            <Box component="span" sx={{ color: 'text.secondary' }}>
                {view(from)}
            </Box>{' '}
            <b>to</b>{' '}
            <Box component="span" sx={{ color: 'text.secondary' }}>
                {view(to)}
            </Box>
        </Typography>
    );
};

export const TaskCard = props => {
    const { data, onClick } = props;
    const { title, type, plannedStartTime, plannedEndTime } = data;

    const handleClick = () => {
        onClick && onClick(data);
    };

    return (
        <Card onClick={handleClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                        <b>type:</b>{' '}
                        <Box component="i" sx={{ color: 'text.secondary' }}>
                            {getLabelForTypeList(type) || 'unknown'}
                        </Box>
                    </Typography>
                    <TimeRange from={plannedStartTime} to={plannedEndTime} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
