import Adapter from 'enzyme-adapter-react-15';
import { configure } from 'enzyme';

import validator from './validate/validate';

export function enzymeConf() {
    return configure({ adapter: new Adapter() });
}

export function valid(data, config) {
    validator.data = data;
    validator.config = config;
    return validator;
}
