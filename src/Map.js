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
  alignItems: 'flex-start',
};


const InitMap = withGoogleMap(props => {
  // console.log('props', props);
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 19.432608, lng: -99.133209 }}
    >
      {props.stores.map( (store, i) => {
        return <Marker
          key={i}
          position={{ lat: store.results[0].geometry.location.lat, lng: store.results[0].geometry.location.lng }}
          onClick={ () => props.onMarkerClick(store)}
        />
      })}
    </GoogleMap>
  )
});

export default class Map extends Component {

  constructor() {
    super()
    this.state = {
      stores: [],
      favoriteStores: []
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

  handleMarkerClick = (event) => {
      // console.log('clicked', event.results[0]);
      this.setState({
        favoriteStores: this.state.favoriteStores.concat(event.results[0])
      })
    }

  render() {
    // console.log(this.state.stores);
    console.log('this.state.favoriteStores', this.state.favoriteStores);
    const { markers, center, zoom } = this.props
    const url = 'https://maps.googleapis.com/maps/api/js?key='+keys.googleMapsKey.apiKey+'&v=3.exp&libraries=geometry,drawing,places'
    return (
      <div style={divStyle}>
        <div style={{ height: '100vh', width: '200vh' }}>
          <InitMap
            googleMapURL={url}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            stores={this.state.stores}
            onMarkerClick={this.handleMarkerClick}
          />
        </div>
        <Stores favoriteStores={this.state.favoriteStores}/>
      </div>
    );
  }
}
