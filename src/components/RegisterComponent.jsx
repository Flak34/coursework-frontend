import React, { Component } from "react";

import AuthService from "../services/auth-service";
import "../styles/RegisterLoginComponentsStyle.css"


export default class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",

      usernameError: "Имя пользователя не может быть пустым!",
      emailError: "Email не может быть пустым!",
      passwordError: "Пароль не может быть пустым!",

      usernameDirty: false,
      emailDirty: false,
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
      case 'email':
        this.setState({
          emailDirty: true
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

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(String(e.target.value).toLocaleLowerCase())) {
      this.setState({
        emailError: "Введен некорректный email!"
      });
    }
    else if(String(e.target.value).length == 0) {
      this.setState({
        emailError: "Email не может быть пустым!"
      });
    }
    else {
      this.setState({
        emailError: ""
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


  handleRegister(e) {
    e.preventDefault();
    if (!this.state.emailError && !this.state.passwordError && !this.state.usernameError) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
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
            <h1>Регистрация</h1>

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
              {(this.state.emailDirty && this.state.emailError) && <div className="inputMessage">{this.state.emailError}</div>}
              <input onChange={this.onChangeEmail} 
                onBlur={this.blurHandler}
                value={this.state.email} 
                name="email" 
                className="input"
                type="text" 
                placeholder="Enter your email..."/>
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
            <button onClick={this.handleRegister} className="submit-button" type="submit">Sign Up</button>
          </form>
        


        )}

        {this.state.message && (
          <div className={(this.state.successful ? ('message'): ('errorMessage'))} >
            {this.state.message}
          </div>
        )}
      </div>
    );
  }
}
