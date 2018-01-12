import {changeUserInfo, changeUserPicture} from './info.actions';
import {loadData} from '../home/cabinet.actions';
import {isFetching, isntFetching} from '../../../../services/store/globalState/global.actions.js';
import defaultUserPicture from '../../../../img/default-user.png';
import defaultBookPictire from '../../../../img/cabinet/default-book.png';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone'

class Info extends PureComponent {

    constructor(props) {
        super(props);

        this.changeValue = this.changeValue.bind(this);
        this.dropImage = this.dropImage.bind(this);
        this.reset = this.reset.bind(this);
        this.isChangedUserData = this.isChangedUserData.bind(this);
        this.change = this.change.bind(this);

        this.state = {
            ...this.props.userInfo,
            accepted: [],
            rejected: []
        }
    }

    componentDidMount() {
        if(!this.props.userInfo.id) {
            this.props.loadUserData();
        }

        if(this.props.userInfo.id) {
            this.setState({
                ...this.props.userInfo
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.userInfo
        })
    }

    changeValue({target: {value}}, prop) {
        this.setState({
            [prop]: value
        })     
    }

    dropImage(...data) {
        console.log(data);
    }

    reset() {
        this.setState({
            ...this.props.userInfo,
            accepted: [],
            rejected: []
        })
    }

    isChangedUserData() {
        for(let key in this.state) {
            if(this.props.userInfo[key] && this.state[key] !== this.props.userInfo[key]) {
                return true;
            }
        }

        return false;
    }

    change() {
        if(this.isChangedUserData()) {
            const {accepted, rejected, ...stateData} = this.state;
            const updatedUserData = {
                ...this.props.userInfo,
                ...stateData
            }

            this.props.changeUserInfo(updatedUserData);
        }

        if(!!this.state.accepted.length) {
            let file = this.state.accepted[Math.floor(Math.random() * this.state.accepted.length)];

            let reader = new FileReader();
            reader.onload = () => {
                let binaryFile = reader.result;
                this.props.isntFetching();

                this.props.changeUserPicutre(binaryFile);
            }
            reader.onerror = () => {
                // TODO
                //      Error
            }
            reader.onloadend = () => {            
                this.props.isntFetching();
            }
    
            this.props.isFetching();
            reader.readAsDataURL(file);
        }

        this.setState({
            ...this.state
        })
    }
    
    render() {

        if(!this.props.userInfo.id || !this.state) {
            return <div> Loading ... </div>
        }


        return (
            <div className='container info-cabinet'>
                <div className='container info-cabinet__container'>
                    <label> My photo: </label>

                    {
                        !!this.state.photoinBinary
                        ? <img src={this.state.photoinBinary}
                            alt={`${this.state.lastName} ${this.state.firstName}`} />
                        : <img src={defaultUserPicture} alt={'Default user picture'} />
                    }
                </div>

                <div className='container info-cabinet__container'>
                    <label> FIO: </label>

                    <input className='container info-cabinet__container_data-field' 
                        type='text'
                        value={this.state.firstName}
                        onChange={e => this.changeValue(e, 'firstName')} />

                    <input className='container info-cabinet__container_data-field' 
                        type='text'
                        value={this.state.lastName}
                        onChange={e => this.changeValue(e, 'lastName')} />
                </div>

                <div className='container info-cabinet__container'>
                    <label> Contact info: </label>

                    <input className='container info-cabinet__container_data-field' 
                        type='text'
                        value={this.state.email}
                        onChange={e => this.changeValue(e, 'email')} />

                    <input className='container info-cabinet__container_data-field' 
                        type='text'
                        value={this.state.phoneNumber}
                        onChange={e => this.changeValue(e, 'phoneNumber')} />

                </div>

                <div className='container info-cabinet__container'>
                    <label> Other info: </label>

                    <input className='container info-cabinet__container_data-field' 
                        type='text'
                        value={this.state.birthDate}
                        onChange={e => this.changeValue(e, 'birthDate')} />

                    <input className='container info-cabinet__container_data-field' 
                        type='text'
                        value={this.state.availableFrom}
                        onChange={e => this.changeValue(e, 'availableFrom')} />

                    <input className='container info-cabinet__container_data-field' 
                        type='text'
                        value={this.state.availableTill}
                        onChange={e => this.changeValue(e, 'availableTill')} />
                </div>

                <div className='container info-cabinet__container'>
                    <label className='container info-cabinet__container_description'> Photo </label>
                    <Dropzone
                        accept="image/jpeg, image/png"
                        onDrop={(accepted, rejected) => {
                            this.setState({ accepted, rejected }); 
                        }}
                    >
                        <p>Try dropping some files here, or click to select files to upload.</p>
                        <p>Only *.jpeg and *.png images will be accepted</p>
                    </Dropzone>

                    <h3>Loaded photo:</h3>
                    {
                        this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                    }
                    <h3>Rejected files:</h3>
                    {
                        this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                    }
                </div>


                <div className='container info-cabinet__container info-cabinet__container_control'>
                    <button className='info-cabinet__container_button info-cabinet__container_button-reset'
                        onClick={this.reset}>
                        reset
                    </button>
                    <button className='info-cabinet__container_button info-cabinet__container_button-add'
                        onClick={this.change}>
                        change
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.Cabinet
    }
}

const mapDispatchToProps = dispatch => {
    return {
        isFetching: () => dispatch(isFetching()),
        isntFetching: () => dispatch(isntFetching()),
        loadUserData: () => dispatch(loadData()),
        changeUserInfo: (userInfo) => dispatch(changeUserInfo(userInfo)),
        changeUserPicutre: (userPicture) => dispatch(changeUserPicture(userPicture))
    }
}

export default Info = connect(mapStateToProps, mapDispatchToProps)(Info);
