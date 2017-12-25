import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../../containers/page/login/Login';

const PrivateRoute = ({ component: Component, isLogined, ...rest }) => {
    return (
        <Route 
            {...rest}
            component={() => 
                isLogined
                ? <Component />
                : <Login />
                }
        />
    );
};

export default PrivateRoute;
