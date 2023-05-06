import React, { Component } from "react";
import "../styles/DriveComponentStyle.css"

export default class DriveComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    };

    this.handleStartDrive = this.handleStartDrive.bind(this);
  }


  handleStartDrive() {
    this.props.startDrive();
  }


  render() {
    return (
      <div style={{overflowY: "auto"}} className="drive-container">

        {!this.props.currentCar &&
          <h1>Выберите автомобиль для поездки</h1>
        }



        {this.props.currentCar &&

          <div>
            <h1>Автомобиль: {this.props.currentCar.model}</h1>
            {!this.props.currentDrive &&
              <button onClick={this.handleStartDrive}>Начать поездку</button>
            }
          </div>
          
        }

        {!this.props.currentDrive &&
          <div>Current drive</div>
        }

        {this.props.currentDrive && 
          <div>
            <div>Drive start: {this.props.currentDrive.start}</div>
          </div>

        }



      </div>
    );
  }
}