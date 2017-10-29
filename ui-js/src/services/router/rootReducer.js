import { combineReducers } from 'redux';

import Login from '../../containers/page/login/login.reducer.js';
import Register from '../../containers/page/register/register.reducer';

export default combineReducers({
    Login,
    Register,
});
