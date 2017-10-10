import React, { Component } from 'react';

import './App.scss';

import Header from '../containers/header/Header.jsx';
import Footer from '../containers/footer/Footer.jsx';
import HomePage from '../containers/page/home/Home';

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
          
          <HomePage />

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

export default App;
