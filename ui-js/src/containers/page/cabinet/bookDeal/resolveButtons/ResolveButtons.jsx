import React from 'react';
import * as BackEndCallingMethods from '../BookDeal';

const ResolveButtons = ({onClickControlButton, isDonor, dealStatus, dealId}) => {
    let button1Text;
    let button2Text;
    let callingMethod1;
    let callingMethod2;
    
    if(isDonor) {
        switch(dealStatus) {
            case 1:
                button1Text = 'Aprove';
                callingMethod1 = BackEndCallingMethods.ApproveDealMethod;
                button2Text = 'Decline';
                callingMethod2 = BackEndCallingMethods.DeclineDealMethod;
                break;

            case 4: 
                button1Text = 'Close';
                callingMethod1 = BackEndCallingMethods.CloseDealMethod;
                button2Text = 'Decline';
                callingMethod2 = BackEndCallingMethods.DeclineDealMethod;
                break;

        }
    } else {
        if(dealStatus === 2) {
            button1Text = 'Book recieved';
            callingMethod1 = BackEndCallingMethods.BookRecievedMethod;
            button2Text = 'Decline';
            callingMethod2 = BackEndCallingMethods.DeclineDealMethod;
        }
    }

    if(!button1Text) {
        return (
            <div className='message badge badge-warning'>
                Waiting approwing from another side.
            </div>
        )
    }

    return (
        <div className='deals__control'>
            <button
                onClick={onClickControlButton}
                className = 'btn btn-success'
                data-method={`${callingMethod1}`}
                data-id={`${dealId}`}>
                {button1Text}
            </button>
            <button
                onClick={onClickControlButton}
                className='btn btn-warning'
                data-method={`${callingMethod2}`}
                data-id={`${dealId}`}>
                {button2Text}
            </button> 
        </div>
                
        )
}

export {ResolveButtons};
