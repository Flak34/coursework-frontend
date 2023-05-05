import React, { Component } from "react";


export default class DriveComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    };
  }


  render() {

    

    return (
      <div style={{overflowY: "auto"}}>

        {!this.props.currentCar &&
          <h1>Выберите автомобиль для поездки</h1>
        }



        {this.props.currentCar &&

          <div>
            <h1>Текущая поездка</h1>
            <div>Автомобиль: {this.props.currentCar.model}</div>
            <div></div>
          </div>
          
        }



      </div>
    );
  }
}