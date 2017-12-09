import React, { PureComponent } from 'react';
import Search from './search/Search.jsx';

import './home.scss';
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
              <GoogleMaps
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />} 
                />
                {/* <GoogleMaps
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<GoogleMapLoading />}
                containerElement={<GoogleMapContainer />}
                mapElement={<GoogleMapElement />}
                /> */}
            </div>
        )
    }
}

export default HomeContainer;
