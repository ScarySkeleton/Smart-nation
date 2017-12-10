import React from 'react';
import { connect } from 'react-redux';

import Table from '../../../../components/table/Table';

const columns = [
    {
        Header: 'Book id',
        accessor: 'Id',
    },
    {
        Header: 'Author',
        accessor: 'Author',
    },
    {
        Header: 'Create on',
        accessor: 'CreateOn',
    },
    {
        Header: 'Description',
        accessor: 'Description',
    },
    {
        Header: 'Price',
        accessor: 'Price',
    },
    {
        Header: 'ContributorFirstName',
        accessor: 'ContributorFirstName',
    },
    {
        Header: 'ContributorLastName',
        accessor: 'ContributorLastName',
    },
    {
        Header: 'FirstName',
        accessor: 'FirstName',
    },
    {
        Header: 'LastName',
        accessor: 'LastName',
    },
    {
        Header: 'PhoneNumber',
        accessor: 'PhoneNumber',
    },
    {
        Header: 'Genre',
        accessor: 'Genre',
    },
    {
        Header: 'BookType',
        accessor: 'BookType',
    }
];

let SearchResult = props => (
    <div className='container search-result'>
        {
            props.searchBooks 
            ? <div className='container search-result__books'>
                <Table 
                    className={'container search-result__books_table'} 
                    data={props.searchBooks}
                    columns={columns}
                    />
                </div>
            : <div className='container search-result__books_empty'>No books, sorry :((</div>            
        }
    </div>
)

const mapStateToProps = state => {
    return {
        searchedBooks: state.searchBooks.searchedBooks
    }
}

export default SearchResult = connect(mapStateToProps, null)(SearchResult);
