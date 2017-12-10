import React from 'react';

import './search.scss';

const Search = props => {

	let titleInput;
	let authorInput;

	const search = () => {
		props.clickToSearch(titleInput.value, authorInput.value);
	}

	return ( 
		<div className='container search'>
			<div className='search-title'>
				<h3 >Find your dream book</h3>
			</div>

			<div className='search-form'>
				<div className="search-content">
					<input 
						type="text"
						ref={title => titleInput = title}
						placeholder="TITLE"/>
					<input 
						type="text"
						ref={author => authorInput = author}
						placeholder="AUTHOR"/>
					<button 
						type="button"
						onClick={search}>SEARCH</button>
				</div>
			</div>
		</div>
	)
};

export default Search;
