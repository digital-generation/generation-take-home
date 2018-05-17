import React, { Component } from 'react';
import axios from 'axios'
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Stores from './Stores';
import keys from '../config';

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start'
};

const InitMap = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 19.432608, lng: -99.133209 }}
  >
    {/* {this.state.stores.map( (store, i) => {
      return <Marker lat={store.results[0].geometry.location.lat} lng={store.results[0].geometry.location.lng} />
    })} */}
    <Marker
      position={{ lat: 19.28786, lng: -99.65324 }}
    />
  </GoogleMap>
);

export default class Map extends Component {

  constructor() {
    super()
    this.state = {
      stores: [],
      markers: [
        {position: { lat: 19.405274529, lng: -99.181835108 }},
        {position: { lat: 19.403979246, lng: -99.122440271 }}
      ]
    }
  }

  componentWillMount = () => {
    axios.get('../store_directory.json')
    .then( response => {

      response.data.map( (store, i) => {

        let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + keys.googleMapsKey.apiKey + '&address="'+ store.Address + '"'

        axios.get(url)
        .then( response => {
          this.setState({
            stores: this.state.stores.concat(response.data)
          })

        })
        .catch(err => console.log(err))
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.stores);
    const { markers, center, zoom } = this.props
    const url = 'https://maps.googleapis.com/maps/api/js?key='+keys.googleMapsKey.apiKey+'&v=3.exp&libraries=geometry,drawing,places'
    return (
      <div style={divStyle}>
        <div style={{ height: '100vh', width: '50%' }}>
          <InitMap
            googleMapURL={url}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            markers={this.state.markers}
          />
        </div>
        <Stores />
      </div>
    );
  }
}
