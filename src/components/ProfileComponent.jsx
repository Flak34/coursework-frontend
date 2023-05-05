import React, { Component } from "react";
import CarsharingService from "../services/carsharing-service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userReady: false,
      currentUser: { username: "" },
      userDrives: []
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
      <div style={{marginTop: "80px"}}>
        <h1>История ваших поездок</h1>

        <div>
          {
            this.state.userDrives.map(
              drive =>
              <div>Drive id: {drive.id}</div>
            )
          }
        </div>

      </div>
    );
  }
}
