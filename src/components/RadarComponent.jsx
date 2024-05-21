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
      currentDrive: null,
      zoneId: 1
    };

    this.setCurrentCar = this.setCurrentCar.bind(this);
    this.startDrive = this.startDrive.bind(this);
    this.finishDrive = this.finishDrive.bind(this);
    this.moveCar = this.moveCar.bind(this);
  }

  componentDidMount() {
    CarsharingService.getCurrentDrive().then(response => {
      this.setState({currentDrive: response.data, currentCar: response.data.car});
    })
  }

  setCurrentCar(car) {
    this.setState({currentCar: car});
  }

  startDrive() {
    CarsharingService.startDrive(this.state.currentCar.id).then( response => {
      this.setState({currentDrive: response.data});
    },
    error => {
      console.log(error);
    })
  }

  finishDrive() {
    CarsharingService.finishDrive(this.state.currentDrive.id).then(response => {
      this.setState({currentDrive: null, currentCar: null});
    },
    error => {
      console.log(error);
      alert(error.response.data);
    })
  }

  moveCar(marker) {
    const {lng, lat} = marker.getLngLat();
    const carId = marker.getElement().car.id;
    CarsharingService.moveCar(lng, lat, carId).then(response => {
      marker.getElement().car = response.data;
      console.log(response.data);
    },
    error => {
      console.log(error.data);
      marker.setLngLat(marker.getElement().car.lng, marker.getElement().car.lat)
    })
  }

  render() {

    return (
      <div className="main-container">

        <div className="drive-container">
          <DriveComponent 
          currentDrive={this.state.currentDrive}
          startDrive={this.startDrive}
          currentCar={this.state.currentCar}
          finishDrive={this.finishDrive}/>
        </div>

        
        <div className="map-container">
          {this.state.currentDrive && 
            <MapComponent 
            driveStarted={true}
            currentCar={this.state.currentCar}
            // setCurrentCar={this.setCurrentCar}
            moveCar={this.moveCar}
            zoneId={this.state.zoneId}/>
          }

          {!this.state.currentDrive && 
            <MapComponent 
            driveStarted={false}
            setCurrentCar={this.setCurrentCar}
            zoneId={this.state.zoneId}/>
          }
        </div>

      </div>
    );
  }
}

export default React.memo(RadarComponent);
