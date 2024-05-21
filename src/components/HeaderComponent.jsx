import React, { Component } from "react";
import {Link} from "react-router-dom"
import "../styles/HeaderComponentStyle.css"

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };

  }


  render() {

    const { currentUser } = this.props;

    return (

        <div className="header-container">

            <Link to={"/home"} className="link">
                Home
            </Link>

            

            {currentUser ? (
            <div >
                <Link to={"/profile"} className="link">
                  {currentUser.login}
                </Link>
                <a href="/login" onClick={this.props.logOut} className="link">
                  LogOut
                </a>
                <Link to={"/radar"} className="link">
                  Radar
                </Link>
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
