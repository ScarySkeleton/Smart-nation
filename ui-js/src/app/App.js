import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import Content from './Content/Content';
import './App.scss';

import Header from '../containers/header/Header.jsx';
import Footer from '../containers/footer/Footer.jsx';


class AppComponent extends PureComponent {
  render() {
    return (
      <div className="App">
          <Header />            
          <Content />
          <Footer />
      </div>
    ); 
  }
}

export { AppComponent };
export default AppComponent = withRouter(AppComponent);
