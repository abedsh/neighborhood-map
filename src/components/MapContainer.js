import React, {Component} from 'react';
import {InfoWindow, Marker, Map, GoogleApiWrapper} from 'google-maps-react';
import * as MapMarkerActions from "../actions/MapMarkerActions";
import * as Constants from "../utils/constants";
import MapMarkerStore from "../stores/MapMarkerStore";
import placesFromJson from '../model/places.json';
import ReactTestUtils from 'react-dom/test-utils'; // ES6

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, // selected marker info object
    markers: placesFromJson, // set markers from json file
    initMarkers: placesFromJson // set initial markers to reset filtered list
  };
  constructor(props) {
    super(props)
  }

  // listen to events on mount
  componentDidMount = () => {
    MapMarkerStore.on(Constants.EVENT_TYPE.GET_INFO, this.updateWindowInfo);
    MapMarkerStore.on(Constants.EVENT_TYPE.DISPLAY_ERROR, this.displayErrorMsg);
    MapMarkerStore.on(Constants.EVENT_TYPE.ON_SEARCH_CHANGE, this.onSearchChange);
    MapMarkerStore.on(Constants.EVENT_TYPE.ON_LIST_SELECTION, this.onListSelection);
  }
  // remove listeners on unmount to avoid a memory leak
  componentWillUnmount = () => {
    MapMarkerStore.removeListener(Constants.EVENT_TYPE.GET_INFO, this.updateWindowInfo);
    MapMarkerStore.removeListener(Constants.EVENT_TYPE.DISPLAY_ERROR, this.displayErrorMsg);
    MapMarkerStore.removeListener(Constants.EVENT_TYPE.ON_SEARCH_CHANGE, this.onSearchChange);
    MapMarkerStore.removeListener(Constants.EVENT_TYPE.ON_LIST_SELECTION, this.onListSelection);

  }

  // when user presses on the map close a showing infow window
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({showingInfoWindow: false, activeMarker: null});
    }
  };

// on list selection listener programatically clicks the related marker
  onListSelection = () => {

    var id = MapMarkerStore.getIdSelected();
    var ref = this.refs["idMarker" + id];
    this.onMarkerClick(ref.props, ref.marker);

  }

  // on marker click dispatches the api info getter by marker params

  onMarkerClick = (props, marker, e) => {
    this.setState({selectedPlace: props, activeMarker: marker, showingInfoWindow: true});
    MapMarkerActions.dispatchGetInfo(props.name, marker.position.lat(), marker.position.lng())
  }


  // display api related errors
  displayErrorMsg = () => {
    alert(MapMarkerStore.getErrorMsg())

  }

// updated window info from the received apis
  updateWindowInfo = () => {

    console.log(MapMarkerStore.getInfo());
    this.setState(prevState => ({
      selectedPlace: {
        ...prevState.selectedPlace,
        rating: "Rating: " + (
          MapMarkerStore.getInfo().rating
          ? MapMarkerStore.getInfo().rating
          : "n/a"),
        phone: "Phone: " + (
          MapMarkerStore.getInfo().phone
          ? MapMarkerStore.getInfo().phone
          : "n/a"),
        price: "Price: " + (
          MapMarkerStore.getInfo().price
          ? MapMarkerStore.getInfo().price
          : "n/a")
      }
    }))
  }

//on list search change filter the displayed markers
  onSearchChange = () => {
    console.log(MapMarkerStore.getSearchParam())
    var param = MapMarkerStore.getSearchParam();
    this.setState(prevState => ({
      markers: prevState.initMarkers.filter(marker => (
        param !== ""
        ? marker.name.toLowerCase().includes(param.toLowerCase())
        : true))
    }))


  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({showingInfoWindow: false, activeMarker: null})
    }
  };


  render() {
    return (<Map google={this.props.google} zoom={13} mapTypeControl={false} fullscreenControl={false} style={mapStyles} initialCenter={{
        lat: 48.864716,
        lng: 2.349014
      }} onClick={this.onMapClicked}>

      {
        this.state.markers.map(markerSpecs => (<Marker ref={"idMarker" + markerSpecs.id} name={markerSpecs.name} onClick={this.onMarkerClick} animation={this.state.activeMarker
            ? (
              markerSpecs.name === this.state.activeMarker.name
              ? '1'
              : '0')
            : '0'} position={{
            lat: markerSpecs.latitude,
            lng: markerSpecs.longitude
          }} key={markerSpecs.id}/>))
      }

      <InfoWindow ref="infoWindow" marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
        <div>
          <h4 id="infoWindowContent">{this.state.selectedPlace.name}</h4>
          <h4 >{this.state.selectedPlace.phone}</h4>
          <h4 >{this.state.selectedPlace.rating}</h4>
          <h4>{this.state.selectedPlace.price}</h4>
        </div>
      </InfoWindow>

    </Map>);

  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyDbG7g9Z_czB0xo2iG3HERukg00teL_syY'})(MapContainer);
