import React, { Component } from 'react';
import Map from './Map';
import Stores from './Stores';

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start'
};

export default class App extends Component {
  render() {
    return (
      <div style={divStyle}>
		      <Map />
        <Stores />
      </div>
    );
  }
};
