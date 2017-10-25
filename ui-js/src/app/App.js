import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import './App.scss';

import Header from '../containers/header/Header.jsx';
import Footer from '../containers/footer/Footer.jsx';

import HomePage from '../containers/page/home/Home';
import LoginPage from '../containers/page/login/Login';
import RegistrationPage from '../containers/page/register/Register';

class AppComponent extends PureComponent {
  render() {
    return (
      <div className="App">
          <Header />
          
          <hr />
          
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegistrationPage} />

          <hr />

          <Footer />
      </div>
    ); 
  }
}

export { AppComponent };
const App = withRouter(AppComponent);
export default App;
