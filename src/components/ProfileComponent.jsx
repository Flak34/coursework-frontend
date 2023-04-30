import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth-service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {

    const { currentUser } = this.state;

    return (
      <div >
        {(this.state.userReady) ?
        <div>
        <header >
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null}
      </div>
    );
  }
}
