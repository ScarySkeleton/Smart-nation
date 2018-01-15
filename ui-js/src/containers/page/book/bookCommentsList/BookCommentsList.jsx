import React from 'react';
import './bookCommentsList.style.scss'
const BookCommentsList = ({commentsList}) => (
    <div>
    {
        !!commentsList.length
        ? commentsList.map((comment, index) => {
            return (
                <div className='book__comment card' key={index}>
                    <div className='book__comment_author book__comment_author-fio card-header'>
                    <div className="book__comment_auth">
                        {comment.userFirstName} {comment.userLastName} 
                    </div>
                    <div className='book__comment_created-time'>
                       Commented on: {comment.createdOn}
                    </div>
                    
                    </div>
                    {/* <div className='book__comment_author book__comment_author-contacts'>
                        <span>Email: {comment.user.email} </span>
                        <span>Phone: {comment.user.phoneNumber}</span>
                    </div> */}
                    <div className='book__comment_text card-body'>
                        {comment.commentBody} 
                    </div>
                </div>
            )})
        : <div className='book__comment-empty'> 
            Book doesn't have any comment! 
            Be the first who will comment it :) 
            </div>
    
    }
    </div>
)

export {BookCommentsList};
