import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import "./App.css";

import AuthService from "./services/auth-service";

import Login from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import Home from "./components/HomeComponent";
import Profile from "./components/ProfileComponent";

import EventBus from "./common/EventBus.js";

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
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <BrowserRouter>
      <div>
        <div>Hello from react Applacatiion tio user!!!!!!!</div>
        <nav>
          <Link to={"/"}>
            bezKoder
          </Link>
          <div>
            <li>
              <Link to={"/home"}>
                Home
              </Link>
            </li>

            {currentUser && (
              <li>
                <Link to={"/user"}>
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div>
              <li>
                <Link to={"/profile"}>
                  {currentUser.username}
                </Link>
              </li>
              <li>
                <a href="/login" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to={"/login"}>
                  Login
                </Link>
              </li>

              <li>
                <Link to={"/register"}>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

      </div>
      </BrowserRouter>
    
    );
  }
}

export default App;
