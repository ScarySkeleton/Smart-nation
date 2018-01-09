import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router-dom';
import './table.scss';
const Table = ({className, data, columns}) => {
    console.log(data);
    data.map(book => addOrderButtonToEachBook(book));
    return (
        <div className={className}>
            <BootstrapTable data={data} striped={true} hover={true} version='4'>
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>
                    ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="title" dataSort={true}>
                    Title
                </TableHeaderColumn>
                <TableHeaderColumn dataField="author" dataSort={true}>
                    Author
                </TableHeaderColumn>
                <TableHeaderColumn dataField="createdOn" dataSort={true}>
                    Added to system
                </TableHeaderColumn>
                <TableHeaderColumn  
                    dataField="orderBook"
                    dataSort={false}
                    dataFormat={showOrderButton}>
                    Order the book
                </TableHeaderColumn>
            </BootstrapTable>
        </div>
    )
}

const addOrderButtonToEachBook = book => 
    book.orderBook = {
        order: <Link to={`orderBook/${book.id}`} className="orderBook">Order</Link>
    }

const showOrderButton = book => {
    return book.order;
}

export default Table;
