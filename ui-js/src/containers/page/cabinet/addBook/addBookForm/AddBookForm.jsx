import React, { PureComponent } from 'react';

import Select from '../../../../../components/select/Select';

import Types from './Mocks/type.js';
import Genres from './Mocks/genre.js';

class AddBookForm extends PureComponent {
    constructor(props) {
        super(props);

        // TODO:
        //      Logic of def selected el
        this.state = {
            types: Types[0],
            genres: Genres[0]
        }
        
        this.listUpdate = this.listUpdate.bind(this);
        this.reset = this.reset.bind(this);
        this.addBook = this.addBook.bind(this);
    }

    listUpdate(e) {
        const val = e.target.value;
        if(Types.includes(val)) {
            this.setState({
                types: val
            });
            return;
        }

        if(Genres.includes(val)) {
            this.setState({
                genres: val
            });
            return;
        }
    }

    reset() {
        this.setState({
            types: Types[0],
            genres: Genres[0]
        });
        this.name = '';
        this.author = '';
    }

    addBook() {
        console.log(this.state);
    }

    render() {        
        return (
            <div className='container add-book-form'>
                <h3>
                    Enter all needed data, thx!
                </h3>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Name*: </label>
                    <input className='container add-book-form__container_data-field' 
                        type='text'
                        ref={ name => this.name = name } />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Author*: </label>
                    <input className='container add-book-form__container_data-field' 
                        type='text'
                        ref={ author => this.author = author } />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Type*: </label>
                    <Select data={Types} selectClassName='container add-book-form__container_data-field add-book-form__container_data-field-select' 
                        selected={this.state.types} onSelect={this.listUpdate} /> 
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Genre*: </label>
                    <Select data={Genres} selectClassName='container add-book-form__container_data-field add-book-form__container_data-field-select'
                        selected={this.state.genres} onSelect={this.listUpdate} />
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
                    <button className='add-book-form__container_button add-book-form__container_button-reset'
                        onClick={this.reset}>
                        reset
                    </button>
                    <button className='add-book-form__container_button add-book-form__container_button-add'
                        onClick={this.addBook}>
                        add book
                    </button>
                </div>

            </div>
        )
    }
}

export default AddBookForm;
