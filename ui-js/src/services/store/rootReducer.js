import { combineReducers } from 'redux';


import Login from '../../containers/page/login/login.reducer.js';
import Register from '../../containers/page/register/register.reducer';
import Logout from '../../components/logout/logout.reducer';
import Cabinet from '../../containers/page/cabinet/cabinet.reducer';
import AddBook from '../../containers/page/cabinet/addBook/addBookForm/addBook.reducer';

export default combineReducers({
    Login,
    Register,
    Logout,
    Cabinet,
    AddBook,
});
