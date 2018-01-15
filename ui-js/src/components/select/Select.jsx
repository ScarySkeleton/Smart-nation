import React from 'react';
import propTypes from 'prop-types';

const Select = ({ data, selected: defSelected = 0, onSelect, selectClassName, optionClassName }) => {
    return (
        <select 
            className={selectClassName || 'def-select'}
            onChange={onSelect}
            value={defSelected}>
            {
                data.length !== 0
                ? data.map((el, index) => {
                    return (
                        <option 
                            key={index}
                            className={optionClassName || 'def-option'}>
                                {el.name} 
                         </option>
                    )
                })
                : <option 
                    className={optionClassName || 'def-option'}>
                        Other
                    </option>
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
    onSelect: propTypes.func,
    selectClassName: propTypes.string,
    optionClassName: propTypes.string,
}

export default Select;
