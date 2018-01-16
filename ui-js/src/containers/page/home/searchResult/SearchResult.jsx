import './searchResult.scss';
import Table from './table/Table';
import {NoResult} from './table/NoResult/NoResult';

import React from 'react';


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
            props.searchedBooks.length && Array.isArray(props.searchedBooks)
            ? <Table 
                    className={'container search-result__books_table'} 
                    data={props.searchedBooks}
                    columns={columns}
                    />
            : <NoResult />         
        }
    </div>
)

export default SearchResult;
