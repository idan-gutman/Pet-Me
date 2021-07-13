import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';


const AnyReactComponent = ({ text }) => (
  <div>
    {/* <div className="map-txt">{ text }</div> */ }
    < div className="map-pin" ><PersonPinCircleIcon /></div>


  </div>



)

class _GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 15
  };


  render() {
    const KEY = 'AIzaSyCY2IxLhaoBnaCRaEN5hoe6pTAuimLuxUg'
    return (
      // Important! Always set the container height explicitly
      <div style={ { height: '50vh', width: '100%', margin: '20px 0' } }>
        <GoogleMapReact
          bootstrapURLKeys={ { key: KEY } }
          defaultCenter={ (this.props.loc) ? this.props.loc : this.props.center }
          defaultZoom={ this.props.zoom }
        >
          <AnyReactComponent
            lat={ this.props.loc.lat }
            lng={ this.props.loc.lng }
            text={ this.props.loc.address }
          />

        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    pets: state.petModule.pets,
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {

}

export const GoogleMap = connect(mapStateToProps, mapDispatchToProps)(_GoogleMap)
