import React from 'react';

import './search.scss';

const Search = props => (
	<div className='container search'>

		<div className='search-title'>
			<h3 >Find your dream book</h3>
		</div>

		<div className='search-form'>
			<div className="search-content">
				<input type="text" name="title" placeholder="TITLE"/>
				<input type="text" name="author" placeholder="AUTHOR"/>
				<button 
					type="button"
					onClick={this.props.clickToSearch}>SEARCH</button>
			</div>
		</div>

	</div>
);

export default Search;
