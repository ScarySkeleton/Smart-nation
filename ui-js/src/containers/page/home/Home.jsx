import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import Search from './search/Search.jsx';
import SearchResult from './searchResult/SearchResult';

import './home.scss';
import './googleMap/googleMap.scss';
// Google map
import GoogleMaps from './googleMap/googleMap';
import GoogleMapLoading from './googleMap/googleMapLoading';

class HomeContainer extends PureComponent {
    render() {
        console.log(this.props.searchResult);
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
        searchResult: state.searchBooks.searchedBooks
    }
}

export default HomeContainer = connect(mapStateToProps, null)(HomeContainer);
