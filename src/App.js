import React, { Component } from "react";
import { Routes, Route} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import "./App.css";

import AuthService from "./services/auth-service";

import Login from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import Home from "./components/HomeComponent";
import Profile from "./components/ProfileComponent";
import Protected from "./common/Protected";
import HeaderComponent from "./components/HeaderComponent";
import RadarComponent from "./components/RadarComponent";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
    
  }


  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;
    const isLoggedIn  = (currentUser? true: false)

    return (
      <BrowserRouter>
      <div>

        <HeaderComponent currentUser={currentUser} logOut={this.logOut} />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterComponent />} />

            <Route path="/profile" 
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Profile />
                </Protected>
            } />

            <Route path="/radar" 
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <RadarComponent />
                </Protected>
            } />

          </Routes>
        </div>

      </div>
      </BrowserRouter>
    
    );
  }
}

export default App;