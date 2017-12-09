import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import './googleMap.scss';

const GoogleMaps = withScriptjs(withGoogleMap((props) => 
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 49.433,lng: 32.067 }}>
            {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
    </GoogleMap>
))

export default GoogleMaps;
