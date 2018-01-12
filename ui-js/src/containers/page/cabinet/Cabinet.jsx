import React, {PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router';

import './cabinet.scss';
import CabinetNav from './nav/Nav';
import CabinetHome from './home/Home';
import CabinetInfo from './info/Info';
import CabinetBookshelf from './bookshelf/Bookshelf';
import CabinetAddBook from './addBook/AddBook';
import BookDeal from './bookDeal/BookDeal';

let Cabinet = () =>
    <div className='container cabinet'>
        <CabinetNav />

        <Switch>
            <Route exact path='/cabinet/info' component={CabinetInfo} />
            <Route exact path='/cabinet/my-bookshelf' component={CabinetBookshelf} />
            <Route exact path='/cabinet/add-book' component={CabinetAddBook} />
            <Route exact path='/cabinet/deals' component={BookDeal} />            
            <Route path='/cabinet/' component={CabinetHome} />
        </Switch>
    </div>

Cabinet = withRouter(Cabinet);
export default Cabinet;
