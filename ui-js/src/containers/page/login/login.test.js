import React from 'react';
import { enzymeConf } from '../../../services/Utils';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Login from './Login';

describe('Login component ', () => {
    enzymeConf();
    it('should render correctly', () => {
        const tree = shallow(<Login />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});
