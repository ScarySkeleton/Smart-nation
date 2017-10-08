import React, { PureComponent } from 'react';

class LoginContainer extends PureComponent {
     constructor(props) {
         super(props);
     }

    render() {
        console.log("Login page");
        return (
            <div className='container login'>
                Login page
            </div>
        );
    };
}

export default LoginContainer;
