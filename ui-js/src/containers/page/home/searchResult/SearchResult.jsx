import React from 'react';
import { connect } from 'react-redux';

let SearchResult = props => (
    
    <div className='container search-result'>
        {
            props.searchBooks 
            ? <div className='container search-result__books'></div>
            : <div className='container search-result__books-empty'            
        }
    </div>
)

const mapStateToProps = state => {
    return {
        searchedBooks: state.searchBooks.searchedBooks
    }
}

export default SearchResult = connect(mapStateToProps, null)(SearchResult);
