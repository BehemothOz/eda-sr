import { Box } from '@mui/material';

export const LoadingOverlay = props => {
    const { visible, children } = props;

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: visible ? 5 : 0,
                    backgroundColor: '#ffffffb5',
                    opacity: Number(visible),
                    transition: 'opacity 0.3s ease',
                }}
            ></Box>
        </Box>
    );
};
