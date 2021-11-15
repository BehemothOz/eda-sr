import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth, useAuthActions } from 'providers/AuthProvider';

const UserMenu = props => {
    const { anchorEl, onClose } = props;

    const history = useHistory();
    const { logout } = useAuthActions();

    const logoutClick = () => {
        logout();
        history.push('/login');
    };

    return (
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
            onClose={onClose}
        >
            <MenuItem to="/profile" component={RouterLink}>
                Profile
            </MenuItem>
            <MenuItem onClick={logoutClick}>Logout</MenuItem>
        </Menu>
    );
};

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
                        to="/home"
                        component={RouterLink}
                        variant="h6"
                        sx={{ textDecoration: 'none' }}
                        color="white"
                    >
                        Some title
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ flexGrow: 1, textAlign: 'right', px: 2 }}>
                        {user.login || ''}
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
                    <UserMenu anchorEl={anchorEl} onClose={handleClose} />
                </Toolbar>
            </AppBar>
            <main>{children}</main>
        </>
    );
};
