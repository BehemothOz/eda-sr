import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from 'providers/AuthProvider';

export const Layout = props => {
    const { children } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const user = useAuth();

    const handleMenuClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        to="/"
                        component={RouterLink}
                        variant="h6"
                        sx={{ textDecoration: 'none' }}
                        color="white"
                    >
                        Some title
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ flexGrow: 1, textAlign: 'right', px: 2 }}>
                        {user.login || 'anonymous'}
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem to="/profile" component={RouterLink}>
                            Profile
                        </MenuItem>
                        <MenuItem to="/login" component={RouterLink}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <main>{children}</main>
        </>
    );
};
