import React, {PureComponent} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import './orderBook.scss';
import defBookImg from 'img/cabinet/book.png'
import {orderBookRequest} from './orderBook.action';

class OrderBook extends PureComponent {

    componentDidMount() {
        this.props.getOrderBookData({id: this.props.match.params.id});
    }

    render() {
        console.log(this.props.bookData);
        const data = this.props.bookData;
        return (
            <div className='book-order'>
                <div className='book-order__image'>
                    {
                        data.image !== null 
                        ? <img className='book-order__image_img' 
                            src={data.image} 
                            alt={`${data.title}-${data.author}-${data.genre}`} />
                        : <img className='book-order__image_img' 
                            src={defBookImg} 
                            alt={`${data.title}-${data.author}-${data.genre}`} />
                    }
                </div>
                <div className='book-order__title'>
                    <h3 className='book-order__title_text'>
                        Title: <span className='bold'>{data.title}</span>
                    </h3>
                </div>
                <div className='book-order__author'>
                    <h3 className='book-order__author_text'>
                        Author: <span className='bold'>{data.author}</span>
                    </h3>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookData: state.OrderBook
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderBookData: (bookId) => dispatch(orderBookRequest(bookId))
    }
}

OrderBook = withRouter(connect(
    mapStateToProps, mapDispatchToProps)(OrderBook));

export default OrderBook;
