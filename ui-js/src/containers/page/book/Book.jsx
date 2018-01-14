import {fetchBook} from './book.action';
import {orderBookRequest} from './orderBook/orderBook.action';
import './book.style.scss';
import {BookInfo} from './bookInfo/BookInfo';
import {BookCommentsList} from './bookCommentsList/BookCommentsList';
import {BookAddComment} from './bookAddComment/BookAddComment';
import {BookHistory} from './bookHistory/BookHistory';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Book extends PureComponent {

    bookId = this.props.match.params.id;

    constructor(props) {
        super(props);

        this.orderThisBook = this.orderThisBook.bind(this);
    }

    componentDidMount() {
        this.props.fetchbook(this.bookId);
    }

    orderThisBook() {
        console.log(this.props, this.bookId);
        if(this.props.isLogined)
            this.props.orderBook(this.bookId);
    }
    
    render() {
        const book = this.props.bookPageData.book;
        const picture = this.props.bookPageData.photoInBinary;
        const historyList = this.props.bookPageData.historyList;
        const commentsList = this.props.bookPageData.commentsList;
        return (
            <div className='container book-wrapper'>

                <div className='book__controls_top'>
                    <button className={`book__controls_order btn btn-success ${this.props.isLogined ? 'button-active' : 'button-unactive'}`}
                        onClick={this.orderThisBook}>
                        Order book now!
                    </button>
                </div>

                <div className='book__info-wrapper'>
                    <BookInfo book={book} picture={picture} />
                </div>

                <div className='book__history-wrapper'>
                    <BookHistory historyList={historyList} />
                </div>

                    <h3>Comments</h3>
                <div className='book__comment-wrapper-add'>
                    <BookAddComment bookId={this.bookId} />
                </div>

                <div className='book__comment-wrapper'>
                    <BookCommentsList commentsList={commentsList} />
                </div>


                <div className='book__controls'>
                    <button className={`book__controls_order btn btn-success ${this.props.isLogined ? 'button-active' : 'button-unactive'}`}
                        onClick={this.orderThisBook}>
                        Order book now!
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookPageData: state.Book,
        isLogined: state.Login.isLogined
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchbook: (id = this.bookId) => dispatch(fetchBook(id)),
        orderBook: (id = this.bookId) => dispatch(orderBookRequest(id))
    }
}

export default Book = connect(mapStateToProps, mapDispatchToProps)(Book);
