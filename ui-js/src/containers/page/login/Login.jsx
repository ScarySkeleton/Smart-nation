import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as auth from '../../../services/router/Auth/authActions';

class LoginContainer extends PureComponent {
     constructor(props) {
         super(props);

         this.loginRequest = this.loginRequest.bind(this);
     }

     loginRequest() {
        console.log("btn clicked for login request");
        this.props.loginRequest();
     }

    render() {
        console.log(auth);
        return (
            <div className='container login'>
                Login page

                <button onClick={this.loginRequest}>
                    Try log in
                </button>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: () => {
            dispatch(auth.loginRequest());
        },
    }
}

LoginContainer = connect(
    null,
    mapDispatchToProps,
)(LoginContainer);

export default LoginContainer;
