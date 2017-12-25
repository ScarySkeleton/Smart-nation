import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router-dom';

import {OrderBook} from '../../../../book/orderBook/OrderBook';

const Table = ({className, data, columns}) => {
    return (
        <div className={className}>
            <BootstrapTable data={data} striped={true} hover={true}>
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
                <TableHeaderColumn dataField="orderBook" dataSort={false}>
                    <Link to={'/order-book/'+data.id} className="orderBook"> Order </Link>
                </TableHeaderColumn>
            </BootstrapTable>
        </div>
    )
}

export default Table;
