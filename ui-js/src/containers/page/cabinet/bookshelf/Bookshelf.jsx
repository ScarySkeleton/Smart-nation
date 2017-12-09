import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
    fetchingBookShelfBooks
} from './bookshelf.actions';


class Bookshelf extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        console.log(this.props.bookShelfBooks);
        return (
            <div className='container bookshelf-cabinet'>
                {
                    (this.props.bookShelfBooks.length)
                    ?    this.props.bookShelfBooks.map(book => {
                            return (
                                <div className='container bookshelf-cabinet__book'>
                                    {book}
                                </div>
                            )
                        })
                    : (
                        <div className='container bookshelf-cabinet__no-books'>
                            No books
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
