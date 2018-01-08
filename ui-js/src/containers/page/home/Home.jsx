import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import {searchCoordinateResult} from './Mocks/searchResult';
import Search from './search/Search.jsx';
import SearchResult from './searchResult/SearchResult';

import './home.scss';
import './googleMap/googleMap.scss';
// Google map
import GoogleMaps from './googleMap/googleMap';
import GoogleMapLoading from './googleMap/googleMapLoading';

class HomeContainer extends PureComponent {
    render() {
        return (
            <div className='container home'>
              <Search />
              
              <SearchResult />
              
              <GoogleMaps
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<GoogleMapLoading />}
                containerElement={<div className='google-map__container' />}
                mapElement={<div className='google-map__container_element' />}
                searchResult={searchCoordinateResult}
                /> 
            </div>
        )
    }
}

export default HomeContainer = connect(null, null)(HomeContainer);
