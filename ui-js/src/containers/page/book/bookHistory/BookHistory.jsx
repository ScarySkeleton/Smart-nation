import React from 'react';

const BookHistory = ({historyList}) => (
    <div className='book__history'>
    {
        !!historyList.length
        ? historyList.map((period, index) => {
            return (
                <div className='book__period' key={index}>
                    <div className='book__user-info'>
                        <div className='book__user-info_full-name'>
                            <span> Full name: {period.userFullName} </span>
                        </div>
                        <div className='book__user-info_full-name'>
                            <span> Phone: {period.userEmail} </span>
                        </div>
                        <div className='book__user-info_full-name'>
                            <span> Email: {period.userPhone} </span>
                        </div>
                    </div>
                    <div className='book__using-info'>
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
            )})
        : <div className='book__history-empty'> 
            Book doesn't have any history :c Be first who take it!
            </div>
        }
    </div>
)

export {BookHistory};
