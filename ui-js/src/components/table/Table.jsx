import React from 'react';
import ReactTable from 'react-table'

const Table = ({className, data, columns}) => {
    console.log(data);
    return (
        <div className={className}>
            <ReactTable
                data={data}
                columns={columns} />
        </div>
    )
}

export default Table;
