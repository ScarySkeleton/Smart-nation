import {fetchComment} from './bookAddComment.action';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

class BookAddComment extends PureComponent {

    constructor(props) {
        super(props);

        this.onClear = this.onClear.bind(this);
        this.onLeave = this.onLeave.bind(this);
    }

    onClear() {
        this.comment.value = "";
    }

    onLeave() {
        const comment = this.comment.value;
        if(!!comment) {
            this.props.fetchLeavingComment({
                bookId: this.props.bookId,
                // raiting: this.raiting.value,
                commentText: comment
            })

            // TODO: 
            //  It's a shit
            this.onClear();
        } 
    }

    render() {
        return (
            <div className='book-add-comment form-group'>
            <label>Please Leave a comment</label>
                {/* <input 
                    type='number'
                    min="1"
                    max="10" 
                    className='book-add-comment__raiting form-control'
                    ref={raiting => this.raiting = raiting} /> */}
                <input 
                    type='text' 
                    className='book-add-comment__comment form-control'
                    ref={comment => this.comment = comment} />
                
                <button
                    className="button button__clear btn btn-default"
                    onClick={this.onClear}>
                    Clear
                </button>
                <button
                    className="button button__submit btn btn-primary"
                    onClick={this.onLeave}>
                    Comment!
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchLeavingComment: (commentData) => dispatch(fetchComment(commentData))
    }
}

BookAddComment = connect(null, mapDispatchToProps)(BookAddComment);

export {BookAddComment};
