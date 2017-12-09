import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Select from '../../../../../components/select/Select';
import {
    fetchAddBook
} from './addBook.action';

import Types from './Mocks/type.js';
import Genres from './Mocks/genre.js';

import { valid } from '../../../../../services/Utils';

class AddBookForm extends PureComponent {
    constructor(props) {
        super(props);

        // TODO:
        //      Logic of def selected el
        this.state = {
            name: '',
            author: '',
            type: Types[0],
            genre: Genres[0],
            photo: '',
        }
        
        this.nameUpdate = this.nameUpdate.bind(this);
        this.authorUpdate = this.authorUpdate.bind(this);
        this.listUpdate = this.listUpdate.bind(this);
        this.imageChoosen = this.imageChoosen.bind(this);
        this.reset = this.reset.bind(this);
        this.addBook = this.addBook.bind(this);
    }

    nameUpdate(e) {
        this.setState({
            name: e.target.value
        })
    }

    authorUpdate(e) {
        this.setState({
            author: e.target.value
        })
    }

    listUpdate(e) {
        const val = e.target.value;
        if(Types.includes(val)) {
            this.setState({
                type: val
            });
            return;
        }

        if(Genres.includes(val)) {
            this.setState({
                genre: val
            });
            return;
        }
    }

    imageChoosen(e) {
        this.setState({
            photo: e.target.value
        })
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
        const data = {
            name: this.state.name,
            author: this.state.author, 
            type: this.state.type,
            genre: this.state.genre,
            photo: this.photo,
            price: 0,
        }

        const config = {
            name: "isNonEmpty",
            author: "isNonEmpty",
        }
        
        let toValidate = valid(data, config);
        if(toValidate.validate()) {
            // TODO:
            //      Show error's message
            return;
        }
        
        this.props.fetchAddingBook(data);
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
                        onChange={this.nameUpdate} />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Author*: </label>
                    <input className='container add-book-form__container_data-field' 
                        type='text'
                        onChange={this.authorUpdate} />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Type*: </label>
                    <Select data={Types} selectClassName='container add-book-form__container_data-field add-book-form__container_data-field-select' 
                        selected={this.state.type} onSelect={this.listUpdate} /> 
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Genre*: </label>
                    <Select data={Genres} selectClassName='container add-book-form__container_data-field add-book-form__container_data-field-select'
                        selected={this.state.genre} onSelect={this.listUpdate} />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Photo </label>
                    <input 
                        className='container add-book-form__container_data-field'
                        type='file'
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={this.imageChoosen} />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Price </label>
                    <input className='container add-book-form__container_data-field' type='number' />
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

const mapDispatchToProps = dispatch => {
    return {
        fetchAddingBook: (data) => dispatch(fetchAddBook(data)),
    }
}

export default AddBookForm = connect(null, mapDispatchToProps)(AddBookForm);
