import React from 'react';
import { enzymeConf } from '../services/Utils';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';

describe('App component ', () => {
  enzymeConf();
  it('should render correctly', () => {
      const tree = App(<App />);
      expect(toJson(tree)).toMatchSnapshot();
  });
});
 