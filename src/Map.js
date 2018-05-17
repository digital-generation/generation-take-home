import React, { Component } from 'react';
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import keys from '../config';


const InitialMap = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 19.432608, lng: -99.133209 }}
  >
    <Marker
      position={{ lat: 19.28786, lng: -99.65324 }}
    />

  </GoogleMap>
);

export default class Map extends Component {

  render() {
    const { markers, center, zoom } = this.props
    const url = 'https://maps.googleapis.com/maps/api/js?key='+keys.googleMapsKey.apiKey+'&v=3.exp&libraries=geometry,drawing,places'
    return (
      <div style={{ height: '100vh', width: '50%' }}>
        <InitialMap
          googleMapURL={url}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}
