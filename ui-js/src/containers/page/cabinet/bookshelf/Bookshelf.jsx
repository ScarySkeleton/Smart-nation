import {
    fetchingBookShelfBooks
} from './bookshelf.actions';

import defaulBookPicture from '../../../../img/cabinet/default-book.png';
import './bookshelf.scss'

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//import Image from 'react-image';

class Bookshelf extends PureComponent {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        return (
            <div className='container bookshelf-cabinet'>
            <div className='row'>
                {
                    (this.props.bookShelfBooks.length)
                    ?    this.props.bookShelfBooks.map((book, index) => {
                            return (
                                <div className="title-list-bookShelf col-md-6 col-sm-12 col-lg-6 col-xs-12" key={index}>
                                    <div className='card bookshelf-cabinet__book'>
                                        
                                        <div className='text-center bookshelf-cabinet__book_image book__image'>
                                            {
                                                !!book.photoInBinary
                                                ? <img className='card-img-left' src={book.photoInBinary} alt={book.title} scale="0" />
                                                : <img className='card-img-left' src={defaulBookPicture} alt='Default book picture' />
                                            }
                                            <div className='card-body'>
                                                <h5 className='card-title bookshelf-cabinet__book_title book__title col align-self-center'>
                                                    {book.title}
                                                </h5>
                                                <div className='text-right'>
                                                    <Link to={`/book/${book.id}`} className='btn btn-primary to-right-side'>See Details</Link>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    : (
                        <div className='container bookshelf-cabinet__no-books'>
                            You don't have any books
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookShelfBooks: state.BookShelf.bookShelfBooks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBooks: () => dispatch(fetchingBookShelfBooks())
    }
}

export default Bookshelf = connect(mapStateToProps, mapDispatchToProps)(Bookshelf);
