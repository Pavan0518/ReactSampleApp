import React, { Component } from "react";
import {getTokenDetails} from '../../services/token.service';
import jwt_decode from 'jwt-decode';
// import axios from "axios";
// import { useHistory } from 'react-router-dom';
import './Login.css';
import Dashboard from "../dashboard/Dashboard";
import { Redirect, withRouter } from "react-router-dom";
// import '../../App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        event.preventDefault();
    }

    navigate(event) {
        this.props.history.push("/signup");
        event.preventDefault();
        
    }

    async handleSubmit(event) {
        event.preventDefault();
        // debugger;
        const { username, password } = this.state;
        let errors = this.state.errors;
        await fetch("http://localhost:54385/api/Login/GenerateToken", {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                email: this.state.username,
                password: this.state.password
            })
        }).then(response => response.json())
            .then(response => {
                if (response.token) {
                    localStorage["token"] = response.token;
                    this.props.handleLogin(this);
                    // this.props.isAuth = true;
                    this.props.history.push("/");
                } else {
                    this.setState({ errors: "Unable to login. Please check your user name or password." })
                }
            })
            .catch(err => {
                this.setState({ errors: "Unable to login. Please check your user name or password." })
                console.log("Unable to login. Please check your user name or password.");
                // event.preventDefault();
            });

    }

    render() {
        // if(this.props.isAuth == true){
        //     return <Redirect to={{ pathname: "/", state: { from: this.props.location }, ...this.props }}></Redirect>
        // }

        return (
            <div className="wrapper">
                <div id="login">
                    <div className="container">
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                                        <h3 className="text-center text-info">Login</h3>
                                        <div className="login-error">
                                            <span>{this.state.errors}</span>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-info">Username:</label><br></br>
                                            <input type="text" name="username" id="username" className="form-control"
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                required></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-info">Password:</label><br></br>
                                            <input type="password" name="password" id="password" className="form-control"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                required />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br></br>
                                            <input type="submit" name="submit" className="btn btn-info btn-md btn-center" value="submit" />
                                        </div>
                                        <div id="register-link" className="text-right">
                                            <a onClick={this.navigate} className="text-info lnk-reg">Register here</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );


    }
}
export default withRouter(Login);