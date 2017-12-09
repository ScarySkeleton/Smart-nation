import React, { PureComponent } from 'react';

import Search from '../../../../components/search/Search.jsx';

class SearchContainer extends PureComponent {
    constructor(props) {
        super(props);
        
        this.search = this.search.bind(this);
    }

    search() {
        console.log(search);
    }

    render() {
        return ( 
            <Search
            clickToSearch={this.search} />
        );
    };
};

export default SearchContainer;