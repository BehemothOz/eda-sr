import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

export const NotFoundPage = () => {
    const location = useLocation();

    return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography gutterBottom>
                No match for <code>{location.pathname}</code>
            </Typography>
            <Button color="primary" to="/home" component={RouterLink}>
                Home
            </Button>
        </Box>
    );
};
