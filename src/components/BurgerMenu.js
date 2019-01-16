import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu'
import '../styles/menu.css';
import placesFromJson from '../model/places.json';
import * as MapMarkerActions from "../actions/MapMarkerActions";

class BurgerMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = { // init places from the json file
      places: placesFromJson,
      initPlaces:placesFromJson
    }


  }

// on list selection dispatch selected id
  onLiClick = (e) =>{
    console.log(e.currentTarget.id)
    MapMarkerActions.dispatchListSelection(e.currentTarget.id)

  }
// on search change dispatch the entered value to map container and filter the list
  onSearchChange = (e) => {
    console.log(this._newText.value)
    MapMarkerActions.dispatchSearchChange(this._newText.value)

    this.setState(prevState => ({
      places: prevState.initPlaces.filter(place => (this._newText.value!==""?
      place.name.toLowerCase().includes(this._newText.value.toLowerCase()):true))
    }))


  }

  render() {
    return (<Menu outerContainerId={this.props.outerContainerId} pageWrapId={this.props.pageWrapId}>
      <div ><input placeholder="Search..." ref= {input => (this._newText = input)} onChange={this.onSearchChange} id="search-field" type="text" name="lastname"/></div>
      {
        this.state.places.map(place =>
          <li id={place.id} onClick={this.onLiClick} key = {
          place.id
        } > {
          place.name
        }</li>)
      }

    </Menu>);
  }
}

export default BurgerMenu;
