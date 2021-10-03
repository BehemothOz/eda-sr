import { Children } from 'react';
import { Container, Box } from '@mui/material';

export const CenterScreen = props => {
    const { maxWidth = 'xs', children } = props;

    let child;
    if (process.env.NODE_ENV === 'development') {
        try {
            child = Children.only(children);
        } catch (err) {
            console.error('CenterScreen component render error. See Children.only(children)');
            // TODO: throw new Error('Children.only(children) error');
        }
    } else {
        child = Children.only(children);
    }

    return (
        <Container maxWidth={maxWidth}>
            <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}
            >
                {child}
            </Box>
        </Container>
    );
};
