import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import {
    fetchingBookShelfBooks
} from './bookshelf.actions';

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
                                        <div className='container bookshelf-cabinet__book_title book__title'>
                                        </div>
                                        <div className='container bookshelf-cabinet__book_image book__image'>
                                        </div>
                                    </Link>
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
