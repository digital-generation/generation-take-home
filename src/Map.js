import React, { Component } from 'react';
import axios from 'axios'
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import keys from '../config';

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding:'10px'
}

const storesStyle = {
  width: '30vw',
  paddingLeft:'20px',
  listStyleType: 'none'
}

const InitMap = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 19.432608, lng: -99.133209 }}
    >
      {props.locations.map( (store, i) => {
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
      locations: [],
      favoriteStores: []
    }
  }

  componentWillMount = () => {
    axios.get('../store_directory.json')
    .then( response => {
      this.setState({
        stores: response.data
      })
      response.data.map( (store, i) => {

        let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + keys.googleMapsKey.apiKey + '&address="'+ store.Address + '"'

        axios.get(url)
        .then( response => {
          this.setState({
            locations: this.state.locations.concat(response.data)
          })

        })
        .catch(err => console.log(err))
      })
    })
    .catch(err => console.log(err))
  }

  handleMarkerClick = (event) => {
      this.setState({
        favoriteStores: this.state.favoriteStores.concat(event.results[0])
      })
    }

  render() {
    const { markers, center, zoom } = this.props
    const url = 'https://maps.googleapis.com/maps/api/js?key='+keys.googleMapsKey.apiKey+'&v=3.exp&libraries=geometry,drawing,places'
    return (
      <div style={divStyle}>
        <div style={{ height: '100vh', width: '200vh' }}>
          <InitMap
            googleMapURL={url}
            containerElement={<div style={{ height: '92vh' }} />}
            mapElement={<div style={{ height: '92vh' }} />}
            locations={this.state.locations}
            onMarkerClick={this.handleMarkerClick}
          />
        </div>
        <div>
          <ul style={storesStyle}>

            {this.state.favoriteStores.map( (favoriteStore, i) => {
              return <li key={i}>
                <p>{this.state.stores[i].Name}: <span>{favoriteStore.formatted_address}</span></p>

              </li>
            })}

          </ul>
        </div>
      </div>
    );
  }
}
