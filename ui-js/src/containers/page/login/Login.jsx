import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    loginRequest
} from './login.actions';

class LoginContainer extends PureComponent {
     constructor(props) {
         super(props);

         this.loginRequest = this.loginRequest.bind(this);
     }

     loginRequest() {
        this.props.loginRequest();
     }

    render() {
        return (
            <div className='container login'>
                
                

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
            dispatch(loginRequest());
        },
    }
}

const Login = connect(
    null,
    mapDispatchToProps,
)(LoginContainer);
export default Login;
