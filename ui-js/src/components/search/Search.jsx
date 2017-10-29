import React, { PureComponent } from 'react';

import './search.scss';

class Search extends PureComponent {
    render() {
        return (
				
				<div className='container search'>
					<div className='search-title'>
						<h3 >Find your dream book</h3>
					</div>
					<div className='search-form'>
						<div className="search-content">
							<input type="text" name="title" placeholder="TITLE"/>
							<input type="text" name="author" placeholder="AUTHOR"/>
							<button type="button">SEARCH</button>
						</div>
					</div>
				</div>
        );
    };
};

export default Search;
