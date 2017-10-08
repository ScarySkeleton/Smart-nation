import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

import Home from '../page/home/Home.jsx';
import Login from '../page/login/Login.jsx';
import Register from '../page/register/Register.jsx';

class ContentContainer extends PureComponent {
    // constructor(props) {
    //     super(props);
    // }

    render() {

        return (
            <div className='container content'>
                <Route exact path='/' component={Home} />

                <Route path='/Login' component={Login} />
                <Route path='/Register' component={Register} />
            </div>
        );
    }
}

export default ContentContainer;
