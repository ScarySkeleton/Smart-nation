import React from 'react';
import { enzymeConf } from '../../../services/Utils';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Register from './Register';

describe('Register component ', () => {
    enzymeConf();
    it('should render correctly', () => {
        const tree = shallow(<Register />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});
