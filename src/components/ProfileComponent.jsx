import React, { Component } from "react";
import CarsharingService from "../services/carsharing-service";
import "../styles/ProfileComponentStyle.css"

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userReady: false,
      currentUser: { username: "" },
      userDrives: [],
    };
  }

  componentDidMount() {
    CarsharingService.getUserDrives().then(
      (response) => {
        this.setState({userDrives: response.data});
    })
  }

  render() {
    return (
      <div style={{marginTop: "80px"}} className="tableContainer">
        <h1>История ваших поездок</h1>
        <table className="countLines table">
          
          <thead>
            <tr>
              <th>Номер поездки</th>
              <th>Начало поездки</th>
              <th>Окочание поездки</th>
              <th>Длительность поездки</th>
              <th>Автомобиль</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.userDrives.map(
                drive => {
                  var date = new Date();
                  date.setTime(Date.parse(drive.start));
                  drive.start = date;

                  date = new Date();
                  date.setTime(Date.parse(drive.finish));
                  drive.finish = date;
                
                  return (
                  <tr key={drive.id}>
                    <td></td>
                    <td>{drive.start.toLocaleDateString() + " " + drive.start.toLocaleTimeString()}</td>
                    <td>{drive.finish.toLocaleDateString() + " " + drive.finish.toLocaleTimeString()}</td>
                    <td></td>
                    <td>{drive.car.model}</td>
                  </tr>
                  )
                }
              )
            }
          </tbody>

        </table>

        

      </div>
    );
  }
}
