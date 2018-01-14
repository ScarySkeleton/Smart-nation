import React from 'react';
import './search.scss';
import genre from '../../containers/page/cabinet/addBook/addBookForm/Mocks/genre';

const Search = props => {

	let titleInput;
	let authorInput;
	let issueInput;
	let categoryInput;

	const search = () => {
		props.clickToSearch({
			titleValue: titleInput.value,
			authorValue: authorInput.value,
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

					<select
						ref={categoryValue => categoryInput = categoryValue}
						>
						{
							!!props.genres
							? props.genres.map((genre, index) => {
								return <option value={genre.id} key={genre.id}> {genre.name} </option> 
							})
							: <option value='other'> other </option> 
						}
						</select>

					<button 
						type="button"
						onClick={search}>SEARCH</button>
				</div>
			</div>
		</div>
	)
};

export default Search;


