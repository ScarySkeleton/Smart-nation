import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import {loginRequest} from './login.actions';
import { valid } from '../../../services/Utils';
import {Facebook} from './Facebook/Facebook';
import './login.scss';

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
            userLogInfo: this.state.userLogInfo,
            Password: this.state.userPassword,
        }

        const config = {
            userLogInfo: "isNonEmpty",
            userPassword: "isNonEmpty",
        }

        let toValidate = valid(data, config);
        if(toValidate.validate()) {
            return;
        }

        this.props.loginRequest(data);
     }

    render() {
        
        if(this.props.isLogined) {
            return <Redirect to="/" />;
        }

        return (
            <div className='login__page'>
                <div className='container login'>

                    <div className='login__title'>
                        <h2>Login</h2>
                    </div>

                    <div className='login__form'> 
                        <div className='login__block'>
                            <input className='login__block-input'
                             type='text' name='login'
                             onChange={this.userLogInfoChange} placeholder='LOGIN/PHONE'/>
                        </div>
                        
                        <div className='login__block'>
                            <input className='login__block-input'
                             type='password' name='password'
                             onChange={this.userPasswordChange} placeholder='PASSWORD' />
                        </div>
                    </div>
                    <div className='login__buttons'>
                        <button className='login__block-btn' onClick={this.loginRequest}>
                            LOGIN
                        </button>
                        <Link to='/registration' className='login__button__link'> Don't have account </Link>
                    </div>
                </div>
                <div className='login__facebook'>
                    <Facebook />
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined,
    }
}

const mapDispatchToProps = dispatch => {
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
