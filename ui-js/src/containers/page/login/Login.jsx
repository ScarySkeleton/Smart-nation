import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import {
    loginRequest
} from './login.actions';
import { validate } from '../../../services/Utils';

class LoginContainer extends PureComponent {
     constructor(props) {
         super(props);

         this.state = {
             userLogInfo: '',
             userPassword: '',
             isLogined: this.props.isLogined,
         }

         this.userLogInfoChange = this.userLogInfoChange.bind(this);
         this.userPasswordChange = this.userPasswordChange.bind(this);
         this.loginRequest = this.loginRequest.bind(this);
     }

     userLogInfoChange(e) {
         this.setState({
             ...this.state,
             userLogInfo: e.target.value,
         })
     }

     userPasswordChange(e) {
         this.setState({
             ...this.state,
            userPassword: e.target.value,
         })
     }

     loginRequest() {

        const data = {
            Email: this.state.userLogInfo,
            Phone: null,
            Password: this.state.userPassword,
        }

        const config = {
            userLogInfo: "isNonEmpty",
            userPassword: "isNonEmpty",
        }

        if(validate(data, config))
            return;

        this.props.loginRequest(data);
     }

    render() {
        
        if(this.props.isLogined) {
            <Redirect to="/" />
            console.log("here");
        }
            

        return (
            <div className='container login'>
                
                <div className='login__block'>
                    <label className='login__block-label'> Login\phone </label>
                    <input className='login__block-input'
                     type='text' name='login'
                     onChange={this.userLogInfoChange} />
                </div>
                
                <div className='login__block'>
                    <label className='login__block-label'> Password </label>
                    <input className='login__block-input'
                     type='password' name='password'
                     onChange={this.userPasswordChange} />
                </div>

                <Link to='/register'> Don't have account </Link>

                <button onClick={this.loginRequest}>
                    Enter
                </button>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (data) => {
            dispatch(loginRequest(data));
        },
    }
}

const Login = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginContainer));
export default Login;
