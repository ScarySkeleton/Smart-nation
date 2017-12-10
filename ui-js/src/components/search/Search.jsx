import React from 'react';

import './search.scss';

const Search = props => {

	let titleInput;
	let authorInput;
	let issueInput;
	let categoryInput;

	const search = () => {
		props.clickToSearch({
			titleValue: titleInput.value,
			authorValue: authorInput.value,
			issueValue: issueInput.value,
			categoryValue: categoryInput.value,
		});
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

					{/* // TODO: REFACTOR !!!  */}
					<ul className='additional-list'>
						<li className='additional-list__element'>
							<input 
								type="number"
								ref={year => issueInput = year}
								placeholder="The year of issue" />
						</li>
						<li className='additional-list__element'>
							<input 
								type="text"
								ref={category => categoryInput = category}
								placeholder="CATEGORY" />
						</li>
						<li className='additional-list__element'>
							Popularity
						</li>
						<li className='additional-list__element'>
							The place
						</li>
					</ul>
					
					<button 
						type="button"
						onClick={search}>SEARCH</button>
				</div>
			</div>
		</div>
	)
};

export default Search;
