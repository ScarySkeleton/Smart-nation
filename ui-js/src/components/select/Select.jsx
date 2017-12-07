import React from 'react';
import propTypes from 'prop-types';

const Select = ({ data, selected: defSelected = 0, selectClassName, optionClassName, onSelect }) => {
    return (
        <select 
            className={selectClassName || 'def-select'}
            onChange={onSelect}
            value={defSelected}>
            {
                data.map((el, index) => {
                    return (
                        <option 
                            key={index}
                            className={optionClassName || 'def-option'}>
                                {el} 
                         </option>
                    )
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
    ]),
    selectClassName: propTypes.string,
    optionClassName: propTypes.string,
    onSelect: propTypes.func,
}

export default Select;
