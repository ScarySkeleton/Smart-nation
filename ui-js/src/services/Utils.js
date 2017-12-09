import Adapter from 'enzyme-adapter-react-15';
import { configure } from 'enzyme';

import valid from './validate/validate';

export function enzymeConf() {
    return configure({ adapter: new Adapter() });
}

export function validate(data, config) {
    valid.config = config;
    return valid.validate(data);
}
