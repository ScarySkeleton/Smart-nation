import React, {PureComponent} from 'react';
import {withRouter} from 'react-router';

import './App.scss';
import Header from '../containers/header/Header.jsx';
import Content from './Content/Content';
import Footer from '../containers/footer/Footer.jsx';

class AppComponent extends PureComponent {
  
  render() {
    return (
      <div className="container-fluid data-reactroot">
          <Header />            
          <Content />
          <Footer />
      </div>
    ); 
  }
}

export {AppComponent};
export default AppComponent = withRouter(AppComponent);
