import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import './addBookForm.scss';
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
            price: 0,

            errorMessage: '',
        }
        
        this.nameUpdate = this.nameUpdate.bind(this);
        this.authorUpdate = this.authorUpdate.bind(this);
        this.listUpdate = this.listUpdate.bind(this);
        this.imageChoosen = this.imageChoosen.bind(this);
        this.priceUpdate = this.priceUpdate.bind(this);
        this.reset = this.reset.bind(this);
        this.addBook = this.addBook.bind(this);
    }

    nameUpdate(e) {
        this.setState({
            name: e.target.value,
            errorMessage: '',
        })
    }

    authorUpdate(e) {
        this.setState({
            author: e.target.value,
            errorMessage: '',
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

    priceUpdate(e) {
        this.setState({
            price: e.target.price
        })
    }

    reset() {
        this.setState({
            name: '',
            author: '',
            type: Types[0],
            genre: Genres[0],
            photo: '',
            price: 0,
        });
    }

    addBook() {
        const data = {
            name: this.state.name,
            author: this.state.author, 
            type: this.state.type,
            genre: this.state.genre,
            photo: this.state.photo,
            price: this.state.price,
        }

        const config = {
            name: "isNonEmpty",
            author: "isNonEmpty",
        }
        
        let toValidate = valid(data, config);
        if(toValidate.validate()) {
            // TODO:
            //      Show error's message
            this.setState({
                errorMessage: toValidate.messages
            })
            return;
        }
        
        this.props.fetchAddingBook(data);
    }

    render() {
        console.log(this.state.errorMessage);    
        return (
            <div className='container add-book-form'>
                <h3>
                    Enter all needed data, thx!
                </h3>

                { 
                    this.state.errorMessage &&  <p 
                        className='container add-book-form__error-message'>
                        {   this.state.errorMessage.map((message, index) => {
                                return (
                                    <label key={index}>
                                        {message}
                                    </label>
                                )
                            })
                        }
                     </p>
                }
               

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Name*: </label>
                    <input className='container add-book-form__container_data-field' 
                        type='text'
                        value={this.state.name}
                        onChange={this.nameUpdate} />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Author*: </label>
                    <input className='container add-book-form__container_data-field' 
                        type='text'
                        value={this.state.author}
                        onChange={this.authorUpdate} />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Type*: </label>
                    <Select data={Types} 
                        selectClassName='container add-book-form__container_data-field add-book-form__container_data-field-select' 
                        selected={this.state.type}
                        onSelect={this.listUpdate} /> 
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Genre*: </label>
                    <Select data={Genres}
                        selectClassName='container add-book-form__container_data-field add-book-form__container_data-field-select'
                        selected={this.state.genre}
                        onSelect={this.listUpdate} />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Photo </label>
                    <input 
                        className='container add-book-form__container_data-field'
                        type='file'
                        accept="image/x-png,image/gif,image/jpeg"
                        value={this.state.photo}
                        onChange={this.imageChoosen} />
                </div>

                <div className='container add-book-form__container'>
                    <label className='container add-book-form__container_description'> Price </label>
                    <input className='container add-book-form__container_data-field'
                    type='number'
                    value={this.state.price}
                    onChange={this.priceUpdate} />
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
