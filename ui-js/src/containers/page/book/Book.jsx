import {fetchBook} from './book.action';
import BookAddComment from './bookAddComment/BookAddComment';
import './book.style.scss';
import defaultBookPicture from '../../../img/cabinet/default-book.png';
import {BookCommentsList} from './bookCommentsList/BookCommentsList';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Book extends PureComponent {

    bookId = match.params.id;

    componentDidMount() {
        fetchbook(this.bookId);
    }
    
    render() {
        console.log(this.props);

        const book = bookPageData.book;
        const commentsList = bookPageData.commentsList;
        const historyList = bookPageData.historyList;

        console.log(book, commentsList, historyList);
        return (
            <div className='container book-wrapper'>
                <div className='book__title'>
                    {book.title}
                </div>
                <div className='book__description'>
                    {book.title}
                </div>
                <div className='book__image'>
                    {
                        book
                        ? <img src={book.PhotoInBinary} alt={book.title} />
                        : <img src={defaultBookPicture} alt={book.title} />
                    }
                </div>
                <div className='book__author'>
                    {book.author}
                </div>
                <div className='book__raiting'>
                    Raiting: 
                </div>
                <div className='book__user-contributor'>
                    {
                        !!book.ContributorId
                        ? <Link to={book.ContributorId} />
                        : <div className='book__user-contributor-empty'>
                            This book was added by community or wished stay hidden.
                         </div>
                    }
                    
                </div>
                <div className='book__user-current'>
                    {book.CurrentUserId}
                </div>
                <div className='book__time-created'>
                    {book.CreatedOn}
                </div>
                <div className='book__time-printed'>
                    {book.PrintedOn}
                </div>
                <div className='book__isbn'>
                    {book.ISBN}
                </div>
                <div className='book__price'>
                    {book.Price}
                </div>
                <div className='book__is-usable'>
                    {book.IsUsable}
                </div>

                <div className='book__comment-wrapper'>
                    <BookCommentsList comments={commentsList} />
                </div>

                <div className='book__comment-wrapper-add'>
                    <BookAddComment bookId={this.bookId} />
                </div>
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
