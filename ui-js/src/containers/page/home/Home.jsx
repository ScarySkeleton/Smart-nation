import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import Search from './search/Search.jsx';
import SearchResult from './searchResult/SearchResult';

import './home.scss';
import './googleMap/googleMap.scss';
// Google map
import GoogleMaps from './googleMap/googleMap';
import GoogleMapLoading from './googleMap/googleMapLoading';
import {Error} from '../../../components/popup/Error/Error';
import {popupOpen, popupClose} from '../../../components/popup/popup.action';

class HomeContainer extends PureComponent {

    componentDidMount() {
        const popupTest = {
            title: 'test popup',
            body: <Error message={'test message'} /> 
        }
        this.props.popupOpen(popupTest);

        const popupTes2 = {
            title: 'test popup 2',
            body: <Error message={'test message'} /> 
        }

        this.props.popupOpen(popupTes2);
    }

    render() {
        return (
            <div className='home'>
              <Search />
              
              <SearchResult
                searchedBooks={this.props.searchResult} />
              
              <GoogleMaps
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<GoogleMapLoading />}
                containerElement={<div className='google-map__container' />}
                mapElement={<div className='google-map__container_element' />}
                searchResult={this.props.searchResult}
                /> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchResult: state.searchBooks.searchedBooks,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        popupOpen: (popup) => dispatch(popupOpen(popup)),
        popupClose: (popup) => dispatch(popupClose(popup)) 
    }
}

export default HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
