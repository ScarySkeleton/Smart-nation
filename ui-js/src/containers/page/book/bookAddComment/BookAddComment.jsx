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
        this.raiting.value = "";
        this.comment.value = "";
    }

    onLeave() {
        const comment = this.comment.value;
        if(!!comment) {
            this.props.fetchLeavingComment({
                bookId: this.props.bookId,
                raiting: this.raiting.value,
                comment: comment
            })

            // TODO: 
            //  It's a shit
            this.onClear();
        } 
    }

    render() {
        return (
            <div className='book-add-comment'>
                <input 
                    type='number'
                    min="1"
                    value="9"
                    max="10" 
                    className='book-add-comment__raiting'
                    ref={raiting => this.raiting = raiting} />
                <input 
                    type='text' 
                    className='book-add-comment__comment'
                    ref={comment => this.comment = comment} />
                
                <button
                    className="button button__clear"
                    onClick={this.onClear}>
                    Clear
                </button>
                <button
                    className="button button__submit"
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

export default BookAddComment = connect(null, mapDispatchToProps)(BookAddComment);
