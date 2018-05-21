import React, { Component } from 'react';
import axios from 'axios'
import InitMap from './InitMap'
import keys from '../config';

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '-20px',
  padding:'20px',
  backgroundColor: 'rgba(254, 234, 165, .2)'
}

const storesStyle = {
  width: '30vw',
  height: '87vh',
  margin:'0 0 0 10px',
  padding: '10px',
  color: 'rgba(0,0,0,.7)',
  backgroundColor: 'rgba(255,255,255, .7)',
  border: '2px solid rgba(255,255,255,1)',
  'overflow': 'scroll'
}

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
        <div style={{ height: '100vh', width: '150vh' }}>
          <InitMap
            googleMapURL={url}
            containerElement={<div style={{ height: '92vh' }} />}
            mapElement={<div style={{ height: '92vh' }} />}
            locations={this.state.locations}
            onMarkerClick={this.handleMarkerClick}
          />
        </div>
        <div style={storesStyle}>
          <h3>My Favorite Stores</h3>
          <ol>
            {this.state.favoriteStores.map( (favoriteStore, i) => {
              return <li key={i}>
                <p><strong>{this.state.stores[i].Name}: </strong><span>{favoriteStore.formatted_address}</span></p>
              </li>
            })}

          </ol>
        </div>
      </div>
    );
  }
}
