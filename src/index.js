import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grow } from '@mui/material';
import { AuthProvider } from 'providers/AuthProvider';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const MAX_SNACK_MSG = 3;

ReactDOM.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SnackbarProvider
                maxSnack={MAX_SNACK_MSG}
                TransitionComponent={Grow}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <AuthProvider>
                    <App />
                </AuthProvider>
            </SnackbarProvider>
        </LocalizationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
