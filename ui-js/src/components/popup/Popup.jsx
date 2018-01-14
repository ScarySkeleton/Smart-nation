import './popup.style.scss';
import {popupClose} from './popup.action';

import React, {PureComponent} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {connect} from 'react-redux';

const timeToBeginHidding = 10000;
const timeToPopupDestroy = 12500;

class Popup extends PureComponent {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(popup) {
        this.props.close(popup);
    }

    render() {
        const popups = this.props.popups;
        if(!popups.length) {
            return (
                <div className='popup-empty'>
                </div>
            )
        };
        return (
            <div className='popup-wrapper'>
                {
                    popups.map((popup, index) => {

                        setTimeout(() => {
                            this.onSubmit(popup);
                        }, timeToPopupDestroy)

                        return (
                            <div className={`popup ${popup.popupMainClass}`} key={index}>  
                                <div className='popup__header'>
                                    <div className='popup__title'>
                                        {popup.title}
                                    </div>
                                    <div className='popup__close'>
                                    <IconButton 
                                        onClick={this.onClose}
                                        tooltip="Close" 
                                        touch={true} 
                                        tooltipPosition="bottom-right">
                                        <ActionGrade />
                                    </IconButton>
                                    </div>
                                </div>

                                <div className='popup__body'>
                                    {popup.body}
                                </div>
                                
                                <div className='popup__control'>
                                    <RaisedButton 
                                        onClick={() => this.onSubmit(popup)}
                                        label="Ok"
                                        primary={true} />
                                </div>
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
        popups: state.popup
    }
}

const mapDispatchToState = dispatch => {
    return {
        close: (popup) => dispatch(popupClose(popup))
    }
}

Popup = connect(mapStateToProps, mapDispatchToState)(Popup);

export {Popup};
