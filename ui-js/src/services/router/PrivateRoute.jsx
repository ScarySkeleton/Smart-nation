import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from '../../containers/page/login/Login';

const PrivateRoute = ({ component: Component, isLogined, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={() => 
                isLogined
                ? <Component />
                : <Login />
                }
        />
    );
};

export default PrivateRoute;
