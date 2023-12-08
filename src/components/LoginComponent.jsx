import React, { Component } from "react";


import AuthService from "../services/auth-service";
import "../styles/RegisterLoginComponentsStyle.css"

import {withRouter} from "../common/with-router"



class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);


    this.state = {
      username: "",
      password: "",

      usernameError: "Имя пользователя не может быть пустым!",
      passwordError: "Пароль не может быть пустым!",

      usernameDirty: false,
      passwordDirty: false,

      successful: false,
      message: ""
    };
  }

  blurHandler(e) {
    switch (e.target.name) {
      case 'username':
        this.setState({
          usernameDirty: true
        });
        break;
      case 'password':
        this.setState({
          passwordDirty: true
        });
        break;
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });

    if(e.target.value.length < 5 || e.target.value.length > 20) {
      this.setState({
        usernameError: "Логин должен быть от 5 до 20 символов"
      });
    }
    else if(e.target.value.length == 0) {
      this.setState({
        usernameError: "Логин не может быть пустым"
      });
    }
    else {
      this.setState({
        usernameError: ""
      });
    }
  }



  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });

    if(e.target.value.length < 3 || e.target.value.length > 120) {
      this.setState({
        passwordError: "Пароль должен быть от 3 до 120 символов"
      });
    }
    else if(e.target.value.length == 0) {
      this.setState({
        passwordError: "Пароль не может быть пустым"
      });
    }
    else {
      this.setState({
        passwordError: ""
      });
    }

  }

  handleLogin(e) {
    e.preventDefault();

    if (!this.state.passwordError && !this.state.usernameError) {
      AuthService.login(
        this.state.username,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: "Авторизация прошла успешно!",
            successful: true
          });

          this.props.router.navigate("/profile");
          window.location.reload();
          
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }

  }


  render() {
    return (

      <div className="form-container">

        {!this.state.successful && (

          <form className="form">
            <h1>Вход в аккаунт</h1>

            <div className="input-container">
              {(this.state.usernameDirty && this.state.usernameError) && <div className="inputMessage">{this.state.usernameError}</div>}
              <input onChange={this.onChangeUsername}
                onBlur={this.blurHandler} 
                value={this.state.username} 
                name="username"
                className="input"
                type="text" 
                placeholder="Enter your login..."/>
            </div>
            

            <div className="input-container">
              {(this.state.passwordDirty && this.state.passwordError) && <div className="inputMessage">{this.state.passwordError}</div>}
              <input onChange={this.onChangePassword}
                onBlur={this.blurHandler} 
                value={this.state.password} 
                name="password" 
                className="input"
                type="password" 
                placeholder="Enter your password..."/>
            </div>
            <button onClick={this.handleLogin} className="submit-button" type="submit">Login</button>
          </form>

        )}
 
        {this.state.message && !this.state.successful && (
          <div className="errorMessage" >
            {this.state.message}
          </div>
        )}

      </div>
    );
  }
}

export default withRouter(Login);