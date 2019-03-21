import React from 'react';
import { Route, Router } from 'react-router-dom';

import Auth from './Auth/Auth';
import history from './history';

import Dashboard from './containers/Dashboard';
import Callback from './Auth/Callback';

const auth = new Auth();

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
}

export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <Route path="/" render={(props) => <Dashboard auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
            }} />
        </Router>
    );
}