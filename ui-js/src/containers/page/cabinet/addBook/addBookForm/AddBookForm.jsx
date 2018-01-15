import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import './addBookForm.scss';
import Select from '../../../../../components/select/Select';
import {fetchAddBook} from './addBook.action';
import {isFetching,
    isntFetching} from '../../../../../services/store/globalState/global.actions';

import Types from './Mocks/type.js';
import Genres from './Mocks/genre.js';

import {geolocated} from 'react-geolocated';
import Dropzone from 'react-dropzone';

import {valid} from '../../../../../services/Utils';

class AddBookForm extends PureComponent {
    constructor(props) {
        super(props);

        // TODO:
        //      Logic of def selected el
        this.state = {
            name: '',
            author: '',
            type: Types[0].name,
            genre: Genres[0].name,
            photo: '',
            price: 0,
            accepted: [],
            rejected: [],

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
        console.log(val);
        if(Types.map(type => type.name).indexOf(val) !== -1) {
            this.setState({
                type: val
            });
            return;
        }

        if(this.props.bookGenre.map(genre => genre.name).indexOf(val) !== -1) {
            this.setState({
                genre: val
            });
            return;
        }
    }

    imageChoosen(e) {
        let input = e.target;
        let file = e[0]//.files[0];
        let reader = new FileReader();

        if(!file) {
            return;
        }

        reader.onload = () => {
            let binaryFile = reader.result;
            this.setState({
                photoInBinary: binaryFile,
                errorMessage: '',
            });
        }
        reader.onerror = () => {
            this.setState({
                errorMessage: 'File was not loaded.' 
            })
        }
        reader.onloadend = () => {            
            this.props.isntFetching();
        }

        this.props.isFetching();
        reader.readAsDataURL(file);

        this.setState({
            photo: file.name
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
            genre: this.props.bookGenre[0],
            photo: '',
            price: 0,
            errorMessage: '',
        });
    }

    addBook() {
        const data = {
            name: this.state.name,
            author: this.state.author, 
            type: this.state.type,
            genre: this.state.genre,
            photo: this.state.photo,
            photoInBinary: this.state.photoInBinary || "",
            AltitudeCoordinate: this.props.coords ? this.props.coords.latitude.toString() : "",
            LongitudeCoordinate: this.props.coords ? this.props.coords.longitude.toString() : "",
            price: this.state.price || 0,
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
        return (
            <div className='row'>
                <div className='col-md-7 add-book-form'>
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

                    <div className='form-group add-book-form__container'>
                        <label className='container add-book-form__container_description'> Title<span className='requred_star'>*</span>: </label>
                        <input className='form-control add-book-form__container_data-field' 
                            type='text'
                            value={this.state.name}
                            onChange={this.nameUpdate} />
                    </div>

                    <div className='form-group add-book-form__container'>
                        <label className='container add-book-form__container_description'> Author<span className='requred_star'>*</span>: </label>
                        <input className='form-control add-book-form__container_data-field' 
                            type='text'
                            value={this.state.author}
                            onChange={this.authorUpdate} />
                    </div>

                    <div className='form-group add-book-form__container'>
                        <label className='container add-book-form__container_description'> Type<span className='requred_star'>*</span>: </label>
                        <Select data={Types} 
                            selectClassName='form-control add-book-form__container_data-field add-book-form__container_data-field-select' 
                            selected={this.state.type}
                            onSelect={this.listUpdate} /> 
                    </div>

                    <div className='form-group add-book-form__container'>
                        <label className='container add-book-form__container_description'> Genre<span className='requred_star'>*</span>: </label>
                        <Select data={this.props.bookGenre}
                            selectClassName='form-control add-book-form__container_data-field add-book-form__container_data-field-select'
                            selected={this.state.genre}
                            onSelect={this.listUpdate} />
                    </div>

                    <div className='form-group add-book-form__container'>
                        <label className='form-control add-book-form__container_description'> Photo </label>
                        <Dropzone
                            accept="image/jpeg, image/png"
                            onDrop={(accepted, rejected) => {
                                this.imageChoosen(accepted); 
                            }}
                        >
                            <p>Try dropping some files here, or click to select files to upload.</p>
                            <p>Only *.jpeg and *.png images will be accepted</p>
                        </Dropzone>
                    </div>                    

                    <div className='container add-book-form__container'>
                        <label className='container add-book-form__container_description'> Your current coordinate </label>
                            {
                                !this.props.isGeolocationAvailable
                                ? <div>Your browser does not support Geolocation</div>
                                : !this.props.isGeolocationEnabled
                                ? <div>Geolocation is not enabled</div>
                                : this.props.coords
                                    ? <table>
                                    <tbody>
                                        <tr><td>latitude: </td><td>{this.props.coords.latitude}</td></tr>
                                        <tr><td>longitude: </td><td>{this.props.coords.longitude}</td></tr>
                                    </tbody>
                                    </table>
                                    : <div>Getting the location data&hellip; </div>
                            }                    
                    </div>

                    <div className='form-group add-book-form__container'>
                        <label className='container add-book-form__container_description'> Price </label>
                        <input className='form-control add-book-form__container_data-field'
                        type='number'
                        value={this.state.price}
                        min = '0'
                        onChange={this.priceUpdate} />
                    </div>

                    <div className='container add-book-form__container add-book-form__container_control'>
                        <button className='btn btn-secondary add-book-form__container_button add-book-form__container_button-reset'
                            onClick={this.reset}>
                            reset
                        </button>
                        <button className='btn btn-success add-book-form__container_button add-book-form__container_button-add'
                            onClick={this.addBook}>
                            add book
                        </button>
                    </div>
                </div>
                <div className='col-md-5 add-book-form'>
                    {
                        this.state.photoInBinary
                        ? <div className='form-group add-book-form__container add-book-form__preview-image'>
                            <img src={this.state.photoInBinary} alt={
                                this.state.name
                                ? `${this.state.name}`
                                : `New book`
                            } /> </div>
                        : null
                        }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAddingBook: (data) => dispatch(fetchAddBook(data)),
        isFetching: () => dispatch(isFetching()),
        isntFetching: () => dispatch(isntFetching()),
    }
}

const mapStateToProps = state => { 
    return {
        isBookAddedSuccess: state.AddBook,
        bookGenre: state.CommonBookInfo.bookGenre
    }
}

AddBookForm = geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(AddBookForm);

export default AddBookForm = connect(mapStateToProps, mapDispatchToProps)(AddBookForm);
