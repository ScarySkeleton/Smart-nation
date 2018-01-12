import React from 'react';

const ResolveButtons = ({onClickControlButton, isDonor, dealStatus}) => {
    let button1Text;
        let button2Text;
        let callingMethod1;
        let callingMethod2;
        
        if(isDonor) {
            switch(dealStatus) {
                case 1:
                    button1Text = 'Aprove';
                    callingMethod1 = 'ApproveDeal';
                    button2Text = 'Decline';
                    callingMethod2 = 'DeclineDeal';
                    break;
    
                case 3: 
                    button1Text = 'Close';
                    callingMethod1 = 'CloseDeal';
                    button2Text = 'Decline';
                    callingMethod2 = 'DeclineDeal';
                    break;
    
            }
        } else {
            if(dealStatus === 2) {
                button1Text = 'Book recieved';
                callingMethod1 = 'BookRecieved';
                button2Text = 'Decline';
                callingMethod2 = 'DeclineDeal';
            }
        }
    
        return (
            <div className='deals__control'>
                <button
                    onClick={onClickControlButton}
                    data-method={`${callingMethod1}`}
                    data-dealStatus={`${dealStatus}`}>
                    {button1Text}
                </button>
                <button
                    onClick={onClickControlButton}
                    data-method={`${callingMethod2}`}
                    data-dealStatus={`${dealStatus}`}>
                    {button2Text}
                </button> 
            </div>
                
        )
}

export {ResolveButtons};
