import React, { Component } from "react";

import MapComponent from "./MapComponent";
import DriveComponent from "./DriveComponent";
import "../styles/RadarComponetStyle.css"
import CarsharingService from "../services/carsharing-service";


class RadarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: [],
      currentCar: null,
      driveStarted: false,
      currentDrive: null
    };

    this.setCurrentCar = this.setCurrentCar.bind(this);
  }

  componentDidMount() {
  }

  setCurrentCar(car) {
    this.setState({currentCar: car});
  }

  setCurrentDrive(drive) {
    this.setState({currentDrive: drive});
  }

  render() {

    return (
      <div className="main-container">

        <div className="drive-container">
          <DriveComponent currentCar={this.state.currentCar}></DriveComponent>
        </div>

        
        <div className="map-container">
          
          <MapComponent 
          setCurrentCar={this.setCurrentCar}/>

        </div>

      </div>
    );
  }
}

export default React.memo(RadarComponent);
