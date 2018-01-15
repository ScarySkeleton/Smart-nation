import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleMaps = withScriptjs(withGoogleMap((props) => 
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 49.433,lng: 32.067 }}>
        {
            !!props.searchResult
            ? props.searchResult.map((result, index) => {
                if(result.altitudeCoordinate && result.longtiudeCoordinate)
                    return <Marker key={index} position={{ lat: +result.longtiudeCoordinate, lng: +result.altitudeCoordinate }} />
                return null;
            })
            : null
        }
    </GoogleMap>
))

export default GoogleMaps;
