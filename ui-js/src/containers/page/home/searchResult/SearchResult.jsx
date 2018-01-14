import React from 'react';

import './searchResult.scss';
import Table from './table/Table';

const columns = [
    {
        Header: 'Book id',
        accessor: 'Id',
    },
    {
        Header: 'Author',
        accessor: 'author',
    },
    {
        Header: 'Title',
        accessor: 'title'
    },
    {
        Header: 'Create on',
        accessor: 'createOn',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Price',
        accessor: 'price',
    },
    {
        Header: 'ContributorFirstName',
        accessor: 'contributorFirstName',
    },
    {
        Header: 'ContributorLastName',
        accessor: 'contributorLastName',
    },
    {
        Header: 'FirstName',
        accessor: 'firstName',
    },
    {
        Header: 'LastName',
        accessor: 'lastName',
    },
    {
        Header: 'PhoneNumber',
        accessor: 'phoneNumber',
    },
    {
        Header: 'Genre',
        accessor: 'genre',
    },
    {
        Header: 'BookType',
        accessor: 'bookType',
    },
    {
        Header: 'Order book',
        accessor: 'orderBook'
    }
];

let SearchResult = props => (
    <div className='search-result'>
        {
            props.searchedBooks.length
            ? <Table 
                    className={'container search-result__books_table'} 
                    data={props.searchedBooks}
                    columns={columns}
                    />
            : <div className='container search-result__books_empty'>
                Feel free to search any book you want!
            </div>            
        }
    </div>
)

export default SearchResult;
