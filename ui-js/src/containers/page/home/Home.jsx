import React, { PureComponent } from 'react';
import Search from './search/Search.jsx';

class HomeContainer extends PureComponent {
     constructor(props) {
         super(props);
     }

    render() {
        return (
                      

            <div className='container home'>
              <Search />
            </div>
        )
    }
}

export default HomeContainer;
