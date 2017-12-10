import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const Table = ({className, data, columns}) => {
    console.log(data);
    console.log(columns);
    return (
        <div className={className}>
            <BootstrapTable data={data} striped={true} hover={true}>
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="title" dataSort={true}>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="author" dataSort={true}>Author</TableHeaderColumn>
                <TableHeaderColumn dataField="createdOn" dataSort={true}>Added to system</TableHeaderColumn>
            </BootstrapTable>
        </div>
    )
}

export default Table;
