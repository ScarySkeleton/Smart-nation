import {fetchBook} from './book.action';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

class Book extends PureComponent {

    componentDidMount() {
        console.log(this.props);
        this.props.fetchBookData(this.props.match.params.id);
    }
    
    render() {
        return (
            <div className='container book-wrapper'>
                <div className='book__title'>
                </div>
                <div className='book__description'>
                </div>
                <div className='book__image'>
                </div>
                <div className='book__author'>
                </div>
                <div className='book__raiting'>
                </div>

                <div className='book__comment-wrapper'>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookData: state.Book
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookData: (id) => dispatch(fetchBook(id))
    }
}

export default Book = connect(mapStateToProps, mapDispatchToProps)(Book);
