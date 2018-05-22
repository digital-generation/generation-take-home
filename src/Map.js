import React, { Component } from 'react'
import axios from 'axios'
import InitMap from './InitMap'
import keys from '../config'

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '-10px',
  padding: '10px',
  paddingBottom: '0',
  marginBottom: '0',
  backgroundColor: 'rgba(254, 234, 165, .5)'
}

const storesStyle = {
  width: '30vw',
  height: '87.5vh',
  marginLeft:'5px',
  padding: '10px',
  color: 'rgba(0,0,0,.7)',
  backgroundColor: 'rgba(255,255,255, .5)',
  border: '1px solid rgb(255,255,255)',
  'overflow': 'scroll'
}

export default class Map extends Component {
  constructor() {
    super()
    this.state = {
      storeLocations: [],
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
          let storeObject = {store: store, location: response.data}
          this.setState({
            storeLocations: this.state.storeLocations.concat(storeObject)
          })
        })
        .catch(err => console.log(err))
      })
    })
    .catch(err => console.log(err))
  }

  handleMarkerClick = (event) => {
    this.setState({
      favoriteStores: this.state.favoriteStores.concat(event)
    })
  }

  render() {
    const url = 'https://maps.googleapis.com/maps/api/js?key='+keys.googleMapsKey.apiKey+'&v=3.exp&libraries=geometry,drawing,places'
    return (
      <div style={divStyle}>
        <div style={{ height: '100vh', width: '150vh' }}>
          <InitMap
            googleMapURL={url}
            containerElement={<div style={{ height: '92vh' }} />}
            mapElement={<div style={{ height: '92vh', border:'1px solid rgb(255,255,255)' }} />}
            locations={this.state.locations}
            storeLocations={this.state.storeLocations}
            onMarkerClick={this.handleMarkerClick}
          />
        </div>
        <div style={storesStyle}>
          <h3>My Favorite Stores</h3>
            {this.state.favoriteStores.map( (favoriteStore, i) => {
              return <div key={i}>
                <p><strong>{favoriteStore.store.Name}: </strong><span>{favoriteStore.location.results[0].formatted_address}</span></p>
              </div>
            })}
        </div>
      </div>
    )
  }
}
