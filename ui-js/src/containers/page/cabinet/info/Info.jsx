import {fetchingUserInfo} from './info.actions';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

class Info extends PureComponent {
    
    render() {
        console.log(this.props.userInfo);
        return (
            <div className='container info-cabinet'>
                Info
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.Cabinet
    }
}

// const mapStateToDispatch = dispatch => {
//     return {
//         fetchUserInfo: () => dispatch(fetchingUserInfo())
//     }
// }

export default Info = connect(mapStateToProps, null)(Info);
