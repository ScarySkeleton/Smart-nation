import React from 'react';

const BookCommentsList = ({commentsList}) => (
    <div>
    {
        !!commentsList.length
        ? commentsList.map((comment, index) => {
            return (
                <div className='book__comment' key={index}>
                    <div className='book__comment_author book__comment_author-fio'>
                        {comment.user.lastName} {comment.user.firstName} 
                    </div>
                    <div className='book__comment_author book__comment_author-contacts'>
                        <span>Email: {comment.user.email} </span>
                        <span>Phone: {comment.user.phoneNumber}</span>
                    </div>
                    <div className='book__comment_created-time'>
                        {comment.createdOn}
                    </div>
                    <div className='book__comment_text'>
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
