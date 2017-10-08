import React, { Component } from 'react';

import './App.scss';

import Header from '../containers/header/Header.jsx';
import Content from '../containers/content/Content.jsx';
import Footer from '../containers/footer/Footer.jsx';

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
          
          <Content />

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
