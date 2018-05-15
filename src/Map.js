import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import keys from '../config'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 19.432608,
      lng: -99.133209
    },
    zoom: 11
  };

  render() {
    
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  keys.googleMapsKey.apiKey}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Mexico City'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
