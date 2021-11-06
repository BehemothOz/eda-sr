import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { PasswordPage } from './pages/Password';
import { SecretPasswordPage } from './pages/Password/Secret';
import { RestorePasswordPage } from './pages/Password/Restore';
import { HomePage } from './pages/Home';
import { ProfilePage } from './pages/Profile';

export const App = () => {
    return (
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
    );
};

export default App;
