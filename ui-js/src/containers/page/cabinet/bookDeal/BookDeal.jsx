import {fetchingBookDealData, fetchingBookDealChange} from './bookDeal.actions';
import {ResolveButtons} from './resolveButtons/ResolveButtons';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class BookRequest extends PureComponent {

    constructor(props) {
        super(props);

        this.onClickControlButton = this.onClickControlButton.bind(this);
    }

    componentDidMount() {
        this.props.getAllDeals();
    }

    onClickControlButton({target}) {
        let id = target.dataset.id;
        let method = target.dataset.method;

        this.props.changeDeal({
            id,
            method
        })
    }

    render() {
        console.log(this.props);
        const deals = this.props.dealData;
        if(!deals.length) {
            return (
                <div> Loading ... </div>
            )
        }
        return (
            <div className='deals'>
                {
                    deals.map((deal, index) => {
                        return (
                            <div className='deals__deal' key={index}>
                                <div className='dials__deal_book'>
                                    <Link to={`/book/${deal.bookId}`}>
                                        Dealing book
                                    </Link>
                                </div>
                                <div className='deals__deal_status'>
                                    Deal status: {deal.dealStatusName}
                                </div>
                                <div className='deals__time'>
                                    <div className='deals__time_created'>
                                        Deal created: {deal.createdOn}
                                    </div>
                                    <div className='deals__time_ended'>
                                        Deal ended: {deal.endedOn}
                                    </div>
                                    <div className='deals__time_expired'>
                                        Deal expired: {deal.expiredOn}
                                    </div>
                                    <div className='deals__time_modified'>
                                        Deal last modified: {deal.modifiedOn}
                                    </div>
                                </div>
                                <div className='deals__participants'>
                                    <div className='deals__participants_acceptor'>
                                        Acceptor: {deal.acceptorId}
                                    </div>
                                    <div className='deals__participants_donor'>
                                        Donor: {deal.donorId}
                                    </div>
                                </div>

                                <ResolveButtons 
                                    onClickControlButton={this.onClickControlButton}
                                    isDonor={deal.isDonor}
                                    dealStatus={deal.dealStatusId}
                                    dealId={deal.id} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        dealData: state.bookDeal.bookDealData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllDeals: () => dispatch(fetchingBookDealData()),
        changeDeal: (dealData) => dispatch(fetchingBookDealChange(dealData))
    }
}

export default BookRequest = connect(mapStateToProps, mapDispatchToProps)(BookRequest);
