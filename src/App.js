import React, {Component} from 'react';
import './styles/index.css';
import MapContainer from './components/MapContainer';
import BurgerMenu from './components/BurgerMenu';

class App extends Component {
  render() {
    return (
      <div  id="outer-container">
           <BurgerMenu outerContainerId="outer-container" pagerWrapId="page-wrap" />
           <MapContainer id="page-wrap"/>
    </div>);
  }
}

export default App;
