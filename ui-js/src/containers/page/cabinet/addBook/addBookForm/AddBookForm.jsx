import React, { PureComponent } from 'react';

import Select from '../../../../../components/select/Select';

import Types from './Mocks/type.js';
import Genres from './Mocks/genre.js';

class AddBookForm extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {        
        return (
            <div className='container add-book-form'>
                <h3>
                    Enter all needed data, thx!
                </h3>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Name </label>
                    <input className='container add-book-form__container_data-field' type='text' />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Type </label>
                    <Select data={Types} selectClassName='container add-book-form__container_data-field' />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Genre </label>
                    <Select data={Genres} selectClassName='container add-book-form__container_data-field' />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Photo </label>
                    <input className='container add-book-form__container_data-field' type='text' />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Price </label>
                    <input className='container add-book-form__container_data-field' type='text' />
                </div>

                <div className='container add-book-form__container add-book-form__container_control'>
                    <button className='add-book-form__container_button add-book-form__container_button-reset'>
                        reset
                    </button>
                    <button className='add-book-form__container_button add-book-form__container_button-add'>
                        add book
                    </button>
                </div>

            </div>
        )
    }
}

export default AddBookForm;
