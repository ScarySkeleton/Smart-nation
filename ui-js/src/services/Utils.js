import Adapter from 'enzyme-adapter-react-15';
import { configure } from 'enzyme';

export function enzymeConf() {
    return configure({ adapter: new Adapter() });
}