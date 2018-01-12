import {fetchBook} from './book.action';
import {orderBookRequest} from './orderBook/orderBook.action';
import BookAddComment from './bookAddComment/BookAddComment';
import './book.style.scss';
import defaultBookPicture from '../../../img/cabinet/default-book.png';
import {BookCommentsList} from './bookCommentsList/BookCommentsList';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Book extends PureComponent {

    bookId = this.props.match.params.id;

    componentDidMount() {
        this.props.fetchbook(this.bookId);
    }

    orderTheBook() {

    }
    
    render() {
        console.log(this.props);
        const book = this.props.bookPageData.book;
        const commentsList = this.props.bookPageData.commentsList;
        const historyList = this.props.bookPageData.historyList;
        console.log(book, commentsList, historyList);
        return (
            <div className='container book-wrapper'>
               
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookPageData: state.Book
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchbook: (id) => dispatch(fetchBook(id))
    }
}

export default Book = connect(mapStateToProps, mapDispatchToProps)(Book);
