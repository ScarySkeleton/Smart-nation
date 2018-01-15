import React from 'react';

const BookHistory = ({historyList}) => {

    const toggleHistory = (index) => {

    }
    
    return (
        <div className='book__history' id="accordion" role="tablist">
        <h3>Book History</h3>
        {
            !!historyList.length
            ? historyList.map((period, index) => {
                return (
                    <div className='book__period card' key={index}>
                        <div className='book__user-info card-header' role="tab" id="headingOne" onClick={index}>
                            <div className='book__user-info_full-name'>
                                <h5 className="mb-0">
                                    <a data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="true" aria-controls="collapseOne">
                                <span> Full name: {period.userFullName} </span>
                                    </a>
                                </h5>
                            </div>
                        
                        </div>
                        <div className='book__using-info collapse show' id="collapseOne" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className='book__user-info_full-name'>
                                    <span> Phone: {period.userEmail} </span>
                                </div>
                                <div className='book__user-info_full-name'>
                                    <span> Email: {period.userPhone} </span>
                                </div>
                                <div className='book__using-info_time'>
                                    <span> From {period.getBookOn} </span>
                                    <span> To {period.giveBookOn} </span>
                                </div>
                                <div className='book__using-info_coordinates'>
                                    <span> Altitude coordinate: {period.altitudeCoordinate} </span>
                                    <span> Longtiude coordinate {period.longtiudeCoordinate} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )})
            : <div className='book__history-empty'> 
                Book doesn't have any history :c Be first who take it!
                </div>
            }
        </div>
    )
}

export {BookHistory};
