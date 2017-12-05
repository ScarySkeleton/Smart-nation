import React from 'react';
import propTypes from 'prop-types';

const Select = ({ data, defSelected = 0, selectClassName, optionClassName }) => {
    
    return (
        <select className={selectClassName || 'def-select'}
            ref={select => _select = select}>
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
    ])
}

export default Select;
