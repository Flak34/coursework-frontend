import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import {Link} from "react-router-dom"
import "../styles/HeaderComponentStyle.css"

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };

  }


  render() {

    const { currentUser } = this.state;

    return (

        <div className="header-container">


            <Link to={"/home"} className="link">
                Home
            </Link>

            

            {currentUser ? (
            <div >
                <Link to={"/profile"} className="link">
                  {currentUser.username}
                </Link>
                <a href="/login" onClick={this.props.logOut} className="link">
                  LogOut
                </a>
            </div>
          ) : (
            <div >
                <Link to={"/login"} className="link">
                  Login
                </Link>
                <Link to={"/register"} className="link">
                  SignUp
                </Link>
            </div>
          )}

        </div>

          

    )
    
  }
}
