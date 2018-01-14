import defaultBookPicture from '../../../../img/cabinet/default-book.png';

import React from 'react';
import {Link} from 'react-router-dom';

import './bookInfo.scss'

const BookInfo = ({book, picture}) => (
    <div className='book__info'> 
        <div className='book__info__title'>
        {
            book.title
            ? <span> {book.title} </span>
            : <span> Title is unknown </span>
        }
        </div>
        <div className="row">
        <div className='book__image col-md-3'>
        {
            book.picture
            ? <img className="rounded img-fluid" src={picture} alt={book.title} />
            : <img className="rounded img-fluid" src={defaultBookPicture} alt={book.title} />
        }
        </div>
        <div className='book__description col-md-9'>
        {
            book.description
            ? <span> {book.description} </span>
            : <span> Description is unknown </span>
        }
        </div>
        </div>
        <div className='book__characteristic book__author'>
        {
            book.author
            ? <span className="book__characteristic__title"> Author: {book.author} </span>
            : <span> Author is unknown </span>
        }
            
        </div>
        <div className='book__characteristic book__raiting'>
            {/* book.author
            ? <span> Author: {book.author} </span>
            : <span> Author is unknown </span> */}
        </div>
        <div className='book__characteristic book__user-contributor'>
            {
                !!book.ContributorId
                ? <Link to={book.ContributorId} />
                : <div className='book__user-contributor-empty'>
                    This book was added by community or wished stay hidden.
                    </div>
            }
            
        </div>
        <div className='book__characteristic book__user-current'>
        {
            book.CurrentUserId
            ? <span> <span className="book__characteristic__title">Current user:</span> {book.currentUser.lastName} &nbsp; {book.currentUser.firstName}</span>
            : <span className="gray-text"> Current user is unknown </span>
        }
            
        </div>
        <div className='book__characteristic book__time-created'>
            {
                book.createdOn
                ? <span> <span className="book__characteristic__title">Created time:</span> {book.createdOn} </span>
                : <span className="gray-text book__characteristic__title"> Created time id is unknown </span>
            }
        </div>
        <div className='book__characteristic book__time-printed'>
            {
                book.printedOn
                ? <span> <span className="book__characteristic__title">Printed time:</span> {book.printedOn} </span>
                : <span className="gray-text">  Printed time is unknown </span>
            }
        </div>
        <div className='book__characteristic book__isbn'>
            {
                book.isbn
                ? <span> <span className="book__characteristic__title">ISBN:</span> {book.isbn} </span>
                : <span className="gray-text">  ISBN is unknown </span>
                //showDataOrMessageThatDataIsUnknown(book.ISBN)
            }
        </div>
        <div className='book__characteristic book__price'>
            {
                book.price
                ? <span> <span className="book__characteristic__title">Price:</span> {book.price} </span>
                : <span className="gray-text">  No price </span>
                //showDataOrMessageThatDataIsUnknown(book.Price)
            }
        </div>
        <div className='book__characteristic book__is-usable'>
            <span className="book__characteristic__title">Is usable</span> {
                book.IsUsable
                ? <span className="text-green">"yes"</span>
                : <span className="text-red">"no"</span>
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
