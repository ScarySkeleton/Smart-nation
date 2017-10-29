import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './register.scss';

class RegisterContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            password: '',
        }

        this.userPhoneChange = this.userPhoneChange.bind(this);
        this.userPasswordChange = this.userPasswordChange.bind(this);
        this.userPasswordConfirmationChange = this.userPasswordConfirmationChange.bind(this);
        this.Clear = this.Clear.bind(this);
        this.registerRequest = this.registerRequest.bind(this);
    }

    userPhoneChange(e) {
        this.setState({
            phone: e.target.value,
        })
    }

    userPasswordChange(e) {
        this.setState({
            password: e.target.value,
        })
    }

    userPasswordConfirmationChange(e) {
        if(this.state.password !== e.target.value)
            console.log("ne sovpali");
    }

    Clear() {
        this.userPhone.value = '';
        this.userPassword.value = '';
        this.userPasswordConfirm.value = '';

        this.setState({
            phone: '',
            password: '',
        })
    }

    registerRequest() {

    }

    render() {
        return (
            <div className='container register'>
                <div className='register__block'>
                    <label className='register__block-label'> Phone </label>
                    <input className='register__block-input'
                     type='text' name='register'
                     ref={curr=> this.userPhone = curr}
                     onChange={this.userPhoneChange} />
                </div>
                
                <div className='register__block'>
                    <label className='register__block-label'> Password </label>
                    <input className='register__block-input'
                     type='password' name='password'
                     ref={curr => this.userPassword = curr}
                     onChange={this.userPasswordChange} />
                </div>

                <div className='register__block'>
                    <label className='register__block-label'> Confirm password </label>
                    <input className='register__block-input'
                     type='password' name='confirmPassword'
                     ref={curr => this.userPasswordConfirm = curr}
                     onChange={this.userPasswordConfirmationChange} />
                </div>

                <Link to='/login'> Have an account </Link>

                <button onClick={this.Clear}>
                    Clear
                </button>
                <button onClick={this.registerRequest}>
                    Register
                </button>
            </div>
        );
    }
}

export default RegisterContainer;
