import React from 'react';

const Error = props => (
    <div className='error'>
        <div className='error__message'>
            {props.message}
        </div>

        {
            props.desclaimer
            ? <div className='error__desclaimer'>
                {props.desclaimer}
            </div>
            : null
        }
    </div>
)

export {Error};
