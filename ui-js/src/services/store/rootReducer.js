import { combineReducers } from 'redux';

import globalState from './globalState/global.reducer.js';
import searchBooksReducer from '../../containers/page/home/search/search.reduce';
import Login from '../../containers/page/login/login.reducer.js';
import Register from '../../containers/page/register/register.reducer';
import Logout from '../../components/logout/logout.reducer';
import Cabinet from '../../containers/page/cabinet/cabinet.reducer';
import AddBook from '../../containers/page/cabinet/addBook/addBookForm/addBook.reducer';
import BookShelf from '../../containers/page/cabinet/bookshelf/bookshelf.reducer';

export default combineReducers({
    globalState,
    searchBooksReducer,
    Login,
    Register,
    Logout,
    Cabinet,
    AddBook,
    BookShelf,
});
