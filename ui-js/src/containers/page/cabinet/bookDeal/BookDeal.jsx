import {fetchingBookDealData, fetchingBookDealChange} from './bookDeal.actions';
import {ResolveButtons} from './resolveButtons/ResolveButtons';
import './bookDeal.style.scss'

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {geolocated} from 'react-geolocated';

const BookRecievedMethod = 'BookRecieved';
const DeclineDealMethod = 'DeclineDeal';
const ApproveDealMethod = 'ApproveDeal';
const CloseDealMethod = 'CloseDeal';

export {
    BookRecievedMethod,
    DeclineDealMethod,
    ApproveDealMethod,
    CloseDealMethod
}

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

        const dealData = {
            id
        }
        if(method === BookRecievedMethod) {
            dealData.dealData;
        }

        this.props.changeDeal({
            method,
            dealData
        })
    }

    render() {
        const deals = this.props.dealData;
        if(!deals.length) {
            return (
                <div> Loading ... </div>
            )
        }
        return (
            <div className='container deals'>
                <div className='row'>
                {
                    deals.map((deal, index) => {
                        return (
                            <div className='card deals__deal col-md-6 col-lg-6 col-sm-12' key={index}>
                                <div className = 'card-body'>
                                    <div className='text-center container-fluid col-md-12 dials__deal_book'>
                                        <Link to={`/book/${deal.bookId}`} className='card-title'>
                                            Dealing book
                                        </Link>
                                    </div>
                            
                                <div className='card-text text-left deals__deal_status'>
                                   <p> Deal status: {deal.dealStatusName} </p>
                                </div>
                                <div className='text-left card-text deals__time'>
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
                            </div>
                        )
                    })
                }
                </div>
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

BookRequest = geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(BookRequest);
export default BookRequest = connect(mapStateToProps, mapDispatchToProps)(BookRequest);
