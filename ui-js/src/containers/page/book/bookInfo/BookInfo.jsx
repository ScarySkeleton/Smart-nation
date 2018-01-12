import defaultBookPicture from '../../../../img/cabinet/default-book.png';

import React from 'react';
import {Link} from 'react-router-dom';

const BookInfo = ({book}) => (
    <div className='book__info'>
        <div className='book__title'>
        {
            book.title
            ? <span> {book.title} </span>
            : <span> Title is unknown </span>
        }
        </div>
        <div className='book__description'>
        {
            book.description
            ? <span> {book.description} </span>
            : <span> Description is unknown </span>
        }
        </div>
        <div className='book__image'>
        {
            book.picture
            ? <img src={book.picture} alt={book.title} />
            : <img src={defaultBookPicture} alt={book.title} />
        }
        </div>
        <div className='book__author'>
        {
            book.author
            ? <span> Author: {book.author} </span>
            : <span> Author is unknown </span>
        }
            
        </div>
        <div className='book__raiting'>
            {/* book.author
            ? <span> Author: {book.author} </span>
            : <span> Author is unknown </span> */}
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
        {
            book.CurrentUserId
            ? <span> Current user: {book.currentUser.lastName} &nbsp; {book.currentUser.firstName}</span>
            : <span> Current user is unknown </span>
        }
            
        </div>
        <div className='book__time-created'>
            {
                book.createdOn
                ? <span> Created time: {book.createdOn} </span>
                : <span> Created time id is unknown </span>
            }
        </div>
        <div className='book__time-printed'>
            {
                book.printedOn
                ? <span> Printed time: {book.printedOn} </span>
                : <span>  Printed time is unknown </span>
            }
        </div>
        <div className='book__isbn'>
            {
                book.isbn
                ? <span> ISBN: {book.isbn} </span>
                : <span>  ISBN is unknown </span>
                //showDataOrMessageThatDataIsUnknown(book.ISBN)
            }
        </div>
        <div className='book__price'>
            {
                book.price
                ? <span> Price: {book.price} </span>
                : <span>  No price </span>
                //showDataOrMessageThatDataIsUnknown(book.Price)
            }
        </div>
        <div className='book__is-usable'>
            Is usable {
                book.IsUsable
                ? "yes"
                : "no"
            }
        </div>
    </div>
)

const showDataOrMessageThatDataIsUnknown = (data) => (
    <div>
        {
            data
            ? <span> {data}: {data} </span>
            : <span> {data} is unknown. </span>
        }
    </div>
)

export {BookInfo};
