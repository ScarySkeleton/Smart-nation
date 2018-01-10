import {
    fetchingBookShelfBooks
} from './bookshelf.actions';
import defaulBookImage from '../../../../img/cabinet/book_1.svg';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class Bookshelf extends PureComponent {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        return (
            <div className='container bookshelf-cabinet'>
                {
                    (this.props.bookShelfBooks.length)
                    ?    this.props.bookShelfBooks.map(book => {
                            return (
                                <div className='container bookshelf-cabinet__book'>
                                    <Link to={`${book.id}`}>
                                        <div className='bookshelf-cabinet__book_title book__title'>
                                            {book.Title}
                                        </div>
                                        <div className='bookshelf-cabinet__book_image book__image'>
                                        {
                                            !!book.PhotoInBinary
                                            ? <image src={book.PhotoInBinary} alt={book.Title} />
                                            : <image src={defaulBookImage} />
                                        }
                                        </div>
                                    </Link>
                                    {/* <div className='bookshelf-cabinet__book_description book__description'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_author book__author'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_raiting book__raiting'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_contributor book__user-contributor'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_time-created book__time-created'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_time-printed book__time-printed'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_isbn book__isbn'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_price book__price'>
                                    </div>
                                    <div className='bookshelf-cabinet__book_is-usable book__is-usable'>
                                    </div> */}
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
