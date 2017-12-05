import React from 'react';
import propTypes from 'prop-types';

const Select = ({ data, defSelected = 0 }) => {
    console.log(data, defSelected);
    return (
        <select>
            {
                data.map((el, index) => {
                    return <option key={index}> {el} </option>
                })
            }
        </select>
    );
}

Select.propTypes = {
    data: propTypes.array,
    defSelected: propTypes.oneOf([
        propTypes.number,
        propTypes.string
    ])
}

export default Select;
