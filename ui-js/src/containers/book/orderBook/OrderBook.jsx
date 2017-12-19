import React, {PureComponent} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import {orderBookRequest} from './orderBook.action';

class OrderBook extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getOrderBookData({id: this.props.match.params.id});
    }

    render() {
        console.log(this.props.bookData);
        return (
            <div className='container book-order'>
                order book
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

export {OrderBook};
