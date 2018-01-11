import {fetchBook} from './book.action';
import BookAddComment from './bookAddComment/BookAddComment';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Book extends PureComponent {

    bookId = this.props.match.params.id;

    componentDidMount() {
        this.props.fetchBookData(this.bookId);
    }
    
    render() {
        console.log(this.props);
        return (
            <div className='container book-wrapper'>
                <div className='book__title'>
                    {this.props.bookData.title}
                </div>
                <div className='book__description'>
                    {this.props.bookData.title}
                </div>
                <div className='book__image'>
                    <img src={this.props.bookData.PhotoInBinary} alt={this.props.bookData.Title} />
                </div>
                <div className='book__author'>
                    {this.props.bookData.Author}
                </div>
                <div className='book__raiting'>
                    Raiting: 
                </div>
                <div className='book__user-contributor'>
                    {
                        !!this.props.bookData.ContributorId
                        ? <Link to={this.props.bookData.ContributorId} />
                        : <div className='book__user-contributor-empty'>
                            This book was added by community or wished stay hidden.
                         </div>
                    }
                    
                </div>
                <div className='book__user-current'>
                    {this.props.bookData.CurrentUserId}
                </div>
                <div className='book__time-created'>
                    {this.props.bookData.CreatedOn}
                </div>
                <div className='book__time-printed'>
                    {this.props.bookData.PrintedOn}
                </div>
                <div className='book__isbn'>
                    {this.props.bookData.ISBN}
                </div>
                <div className='book__price'>
                    {this.props.bookData.Price}
                </div>
                <div className='book__is-usable'>
                    {this.props.bookData.IsUsable}
                </div>

                <div className='book__comment-wrapper'>
                    {
                        !!this.props.bookData.comments
                        ? this.props.bookData.comments.map((comment, index) => {
                            return (
                                <div className='book__comment' key={index}>
                                    <div className='book__comment_author'>
                                        {comment.author}
                                    </div>
                                    <div className='book__comment_text'>
                                    {comment.text} 
                                    </div>
                                </div>
                            )
                            })
                        : <div className='book__comment-empty'> 
                            Book doesn't have any comment! 
                            Be the first who will comment it :) 
                            </div>
                       
                    }
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
        bookData: state.Book
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookData: (id) => dispatch(fetchBook(id))
    }
}

export default Book = connect(mapStateToProps, mapDispatchToProps)(Book);
