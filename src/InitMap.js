import React, { Component } from 'react'
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"

const InitMap = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 19.432608, lng: -99.133209 }}
    >
      {props.storeLocations.map( (storeLocation, i) => {
        return <Marker
          key={i}
          position={{ lat: storeLocation.location.results[0].geometry.location.lat, lng: storeLocation.location.results[0].geometry.location.lng }}
          onClick={ () => props.onMarkerClick(storeLocation)}
        />
      })}
    </GoogleMap>
  )
})

export default InitMap
