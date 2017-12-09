import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { enzymeConf } from '../../../services/Utils';
import Cabinet from './Cabinet';

describe('Cabinet render', () => {
    beforeAll(() => {
        enzymeConf();
    });
    
    it('should render correctly', () => {
        const tree = shallow(<Cabinet />);
        expect(toJson(tree)).toMatchSnapshot();
    })
});