import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Button, Box, Typography } from '@mui/material';
import { Layout } from 'components/layout/Layout';
import { useAuth } from 'providers/AuthProvider';

import { ProfileForm } from './components/ProfileForm';

const RedirectButton = props => {
    const { to = '/' } = props;

    return (
        <Button color="primary" variant="outlined" to={to} component={RouterLink}>
            Go to login
        </Button>
    );
};

export const ProfilePage = () => {
    const user = useAuth();

    return (
        <Layout>
            <Container maxWidth="xs" sx={{ p: 2 }}>
                {Object.keys(user).length !== 0 ? (
                    <ProfileForm data={user} />
                ) : (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography gutterBottom>Oops! I don't know you.</Typography>
                        <RedirectButton to={'/'} />
                    </Box>
                )}
            </Container>
        </Layout>
    );
};
