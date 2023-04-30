import React, { Component } from "react";
import MapComponent2 from "./MapComponent2";
import MapComponent from "./MapComponent";
import DriveComponent from "./DriveComponent";
import "../styles/RadarComponetStyle.css"


export default class RadarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    };
  }


  render() {
    return (
      <div className="main-container">
        <div className="drive-container">
          <DriveComponent></DriveComponent>
        </div>

        {/* <div className="external-map-container">
          <MapComponent></MapComponent>
        </div> */}

        <MapComponent></MapComponent>

       
      </div>
    );
  }
}
