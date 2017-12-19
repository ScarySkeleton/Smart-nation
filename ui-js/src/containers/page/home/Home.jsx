import React, { PureComponent } from 'react';

import Search from './search/Search.jsx';
import SearchResult from './searchResult/SearchResult';

import './home.scss';
import './googleMap/googleMap.scss';
// Google map
import GoogleMaps from './googleMap/googleMap';
import GoogleMapLoading from './googleMap/googleMapLoading';
import GoogleMapContainer from './googleMap/googleMapContainer';
import GoogleMapElement from './googleMap/googleMapElement';

class HomeContainer extends PureComponent {
     constructor(props) {
         super(props);
     }

    render() {
        return (
            <div className='container home'>
              <Search />
              
              <SearchResult />
              
              
              <GoogleMaps
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<GoogleMapLoading />}
                containerElement={<div className='contss' style={{ height: `400px` }} />}
                mapElement={<div className='contt111' style={{ height: `100%` }} />} 
                />  
                
                <GoogleMaps
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<GoogleMapLoading />}
                containerElement={<GoogleMapContainer />}
                mapElement={<div style={{ height: `100%` }} />}
                /> 
            </div>
        )
    }
}

export default HomeContainer;
