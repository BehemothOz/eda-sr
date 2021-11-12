import { Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { format } from 'date-fns';

const view = date => {
    return format(date, 'd MMMM p'); // view ex: day month time
};

export const TaskCard = props => {
    const { data, onClick } = props;
    const { title, from, to } = data;

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
                    <Typography variant="body2" color="text.secondary">
                        from {view(from)} to {view(to)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
