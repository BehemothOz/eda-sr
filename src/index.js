import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from 'components/alert';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Slide}  from '@mui/material'

import './index.css';
// import App from './App';

import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { PasswordPage } from './pages/Password';
import { SecretPasswordPage } from './pages/Password/Secret';
import { RestorePasswordPage } from './pages/Password/Restore';
import { HomePage } from './pages/Home';
import { ProfilePage } from './pages/Profile';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SnackbarProvider maxSnack={3} TransitionComponent={Slide} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <SnackbarUtilsConfigurator />
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/profile">
                            <ProfilePage />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route exact path="/register">
                            <RegisterPage />
                        </Route>
                        <Route exact path="/password">
                            <PasswordPage />
                        </Route>
                        <Route exact path="/password/secret">
                            <SecretPasswordPage />
                        </Route>
                        <Route exact path="/password/restore">
                            <RestorePasswordPage />
                        </Route>
                    </Switch>
                </Router>
            </SnackbarProvider>
        </LocalizationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
