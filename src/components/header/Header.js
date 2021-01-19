import React, { Component } from 'react';
import { getTokenDetails } from '../../services/token.service';
import logo from '../../logo.svg';
import './Header.css';

class Header extends Component {
    userName = "";
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        if (!this.props.isAuth) {
            return null;
        }
        else {
            this.props.handleLogin();
            // this.props.isAuth = true;
            this.userName = getTokenDetails();
        }
        return (
            <div>
                {/* D:\Edu\React\Poc-App\sample-app\src\large.png */}
                <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                    <a className="navbar-brand" href="#"><img src={logo} className="App-logo" alt="logo"></img></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.props.logout}>Logout</a>
                            </li> */}
                        </ul>
                        <h2 className="mid-head">Sample React App</h2>

                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item">
                                <span className="nav-link">Hi {this.userName.FName}</span>
                            </li> */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hi {this.userName.FName}</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#" onClick={this.props.logout}>Logout</a>
                                </div>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        )
    }
}

export default Header



