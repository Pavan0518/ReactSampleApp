import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            id: 0,
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            isActive: true,
            isError: true,
            errors: {}
        };
        this.isValid = true;
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleSignupSubmit(event) {
        event.preventDefault();
        let error = {};
        let isError = false;
        if (!this.state.first_name) {
            error["first_name"] = "First Name is mandatory.";
            isError = !isError ? true : false;
        }
        if (!this.state.last_name) {
            error["last_name"] = "Last Name is mandatory.";
            isError = !isError ? true : false;
        }
        if (!this.state.email) {
            error["email"] = "Email is mandatory.";
            isError = !isError ? true : false;
        }
        if (this.state.email) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                error["email"] = "Please enter valid email address.";
                isError = !isError ? true : false;
            }
        }
        if (!this.state.password) {
            error["password"] = "Password is mandatory.";
            isError = !isError ? true : false;
        }
        if (this.state.cpassword !== this.state.password) {
            error["cpassword"] = "Password and Confirm should be same.";
            isError = !isError ? true : false;
        }
        this.setState({ isError: isError });
        this.setState({ errors: error });
        if (isError) {
            debugger;
            // event.preventDefault();
            return
        };

        const { username, password } = this.state;
        let errors = this.state.errors;
        fetch("http://localhost:54385/api/SignUp/CreateUser", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                user_id: "",
                id: 0,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
                isActive: this.state.isActive
            })
        })
            .then(response => {
                (response.ok && response.status == 201) && this.props.history.push("/");
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        let name = event.target.name;
        let value = event.target.value;
        let error = {};
        switch (name) {
            case "fist_name":
                error["fist_name"] = !value ? "First Name is mandatory." : "";
                break;
            case "last_name":
                error["last_name"] = !value ? "Last Name is mandatory." : "";
                break;
            case "email":
                error["email"] = !value ? "Email is mandatory." : "";
                if (this.state.email) {
                    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (!pattern.test(this.state.email)) {
                        error["email"] = "Please enter valid email address.";
                    }
                }
                break;
            case "password":
                error["password"] = !value ? "Password is mandatory." : "";
                break;
            case "cpassword":
                error["cpassword"] = !value ? "Password is mandatory." : "";
                if (value) {
                    error["cpassword"] = value !== this.state.password ? "Password and Confim password should be same." : "";
                }
                break;
        }
        // this.setState({ isError: error == {} ? false : true });
        this.setState({ errors: error });
        event.preventDefault();
    }

    goBack(event) {
        this.props.history.push("/");
        event.preventDefault();
    }

    handleCheck(event) {
        this.setState({ isActive: !this.state.isActive });
    }

    render() {
        return (
            <div className="wrapper">
                <div id="signup">
                    <div className="container">
                        <div id="signup-row" className="row justify-content-center align-items-center">
                            <div id="signup-column" className="col-md-6">
                                <div id="signup-box" className="col-md-12">
                                    <form id="signup-form" name="signup-form" className="form" onSubmit={this.handleSignupSubmit}>
                                        <h3 className="text-center text-info">Signup</h3>
                                        <div className="form-group">
                                            <label className="text-info">First Name:</label><br></br>
                                            <input type="text" name="first_name" id="first_name" className="form-control"
                                                value={this.state.first_name}
                                                onChange={this.handleChange}
                                            ></input>
                                            <span style={{ color: "red" }}>{this.state.errors["first_name"]}</span>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-info">Last Nme:</label><br></br>
                                            <input type="text" name="last_name" id="last_name" className="form-control"
                                                value={this.state.last_name}
                                                onChange={this.handleChange}
                                            />
                                            <span style={{ color: "red" }}>{this.state.errors["last_name"]}</span>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-info">E-Mail:</label><br></br>
                                            <input type="text" name="email" id="email" className="form-control"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                        </div>
                                        <div className="form-group">
                                            <label className="text-info">Phone:</label><br></br>
                                            <input type="text" name="phone" id="phone" className="form-control"
                                                value={this.state.phone}
                                                onChange={this.handleChange}
                                            />
                                            {/* <span style={{ color: "red" }}>{this.state.errors["phone"]}</span> */}
                                        </div>

                                        <div className="form-group">
                                            <label className="text-info">Password:</label><br></br>
                                            <input type="password" name="password" id="password" className="form-control"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                            <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                        </div>

                                        <div className="form-group">
                                            <label className="text-info">Confirm Password:</label><br></br>
                                            <input type="cpassword" name="cpassword" id="cpassword" className="form-control"
                                                onChange={this.handleChange}
                                            />
                                            <span style={{ color: "red" }}>{this.state.errors["cpassword"]}</span>
                                        </div>

                                        <div className="form-group">
                                            <label className="text-info">Active:</label> &nbsp;
                                            <input type="checkbox" name="isActive" id="isActive"
                                                defaultChecked={this.state.isActive}
                                                onClick={this.handleCheck}
                                            />
                                        </div>


                                        <div className="form-group btn-center">
                                            <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
                                            &nbsp;
                                            <input type="button" name="back" className="btn btn-info btn-md" value="Go to Login" onClick={this.goBack} />
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

export default SignUp;