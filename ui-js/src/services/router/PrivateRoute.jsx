import React, {PureComponent} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Login from '../../containers/page/login/Login';

// function isLogined(WrappedComponent) {
//     return class extends PureComponent {

//         render() {
//             return <WrappedComponent />
//         }
//     }
// }
// const mapStateToProps = state => {
//     return {
//         isLogined: state.Login.isLogined
//     }
// }
// export default isLogined = connect(mapStateToProps, null)(isLogined);

let PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            component={() => 
                rest.isLogined
                ? <Component />
                : <Login />
                }
        />
    );
};

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined
    }
}

PrivateRoute = withRouter(connect(mapStateToProps, null)(PrivateRoute));
export default PrivateRoute;
