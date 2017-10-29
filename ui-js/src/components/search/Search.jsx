import React, { PureComponent } from 'react';

class Search extends PureComponent {
    render() {
        return (
				
				<div id="wrapper_search_form">
					<h3>Find your dream book</h3>
					<input type="text" name="title" placeholder="TITLE"/>
					<input type="text" name="author" placeholder="AUTHOR"/>
					<button type="button">SEARCH</button>
				</div>
        );
    };
};

export default Search;
