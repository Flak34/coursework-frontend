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
    this.startDrive = this.startDrive.bind(this);
  }

  componentDidMount() {
    CarsharingService.getCurrentDrive().then(response => {
      let driveStarted = (response.data ? true : false);
      this.setState({currentDrive: response.data, currentCar: response.data.car, driveStarted: driveStarted});
    })
  }

  setCurrentCar(car) {
    this.setState({currentCar: car});
  }

  startDrive() {
    CarsharingService.startDrive(this.state.currentCar.id).then( response => {
      this.setState({currentDrive: response.data, driveStarted: true});
    },
    error => {
      console.log(error);
    })
  }


  render() {

    return (
      <div className="main-container">

        <div className="drive-container">
          <DriveComponent 
          currentDrive={this.state.currentDrive}
          startDrive={this.startDrive}
          currentCar={this.state.currentCar}/>
        </div>

        
        <div className="map-container">
          {this.state.driveStarted && 
            <MapComponent 
            driveStarted={true}
            currentCar={this.state.currentCar}
            setCurrentCar={this.setCurrentCar}/>
          }

          {!this.state.driveStarted && 
            <MapComponent 
            driveStarted={false}
            currentCar={this.state.currentCar}
            setCurrentCar={this.setCurrentCar}/>
          }
        </div>

      </div>
    );
  }
}

export default React.memo(RadarComponent);
