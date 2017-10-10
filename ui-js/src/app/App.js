import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import './App.scss';

import Header from '../containers/header/Header.jsx';
import Footer from '../containers/footer/Footer.jsx';

import HomePage from '../containers/page/home/Home';
import LoginPage from '../containers/page/login/Login';
import RegistrationPage from '../containers/page/register/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />

          <br />
          <br />
          <hr />

          <br />
          <br />
          
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegistrationPage} />

          <br />
          <br />
          <hr />

          <br />
          <br />
          <Footer />
      </div>
    ); 
  }
}

App = withRouter(App);

export default App;
