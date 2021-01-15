import React, { Component } from 'react';
import './Dashboard.css';
import { Modal, Button, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import RecordPopup from './RecordPopup';


class Dashboard extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            employees: [],
            showPopup: false,
            editInfo: this.initialState
        };
        this.logout = this.logout.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.changeEventHandler = this.changeEventHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.addRecord = this.addRecord.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }
    get initialState() {
        return {

            id: 0,
            fName: "",
            lName: "",
            designation: "",
            email: "",
            gender: "F"
        }
    }
    changeEventHandler(event) {
        let editInfo = this.state.editInfo;
        let name = event.target.name;
        editInfo[name] = event.target.value;
        this.setState({ editInfo: editInfo });
        // this.setState({ editInfo: { id: this.state.editInfo.id } });
        event.preventDefault();

    }
    handleClose(event) {
        this.setState({ showPopup: false });
        this.componentDidMount();
    }
    handleShow(event, emp) {
        this.setState({ editInfo: emp });
        this.setState({ showPopup: true });
        // return <RecordPopup show={this.state.showPopup} empdata={this.state.editInfo}></RecordPopup>;
    }
    addRecord(event) {
        event.preventDefault();
        this.setState({ editInfo: this.initialState });
        this.setState({ showPopup: true });
    }
    deleteHandler(event, Id) {
        // event.preventDefault();
        const url = "http://localhost:54385/api/Employee/DeleteEmployee?Id=" + Id;
        var obj = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage['token'],
                'content-type': 'application/json; charset=utf-8'
            },
            body: null
        };
        fetch(url, obj).then(response => {
            this.componentDidMount();
        }).catch(error => {
            alert('error');
        });

    }
    saveHandler(event) {
        event.preventDefault();
        let Id = this.state.editInfo.id == 0 ? 0 : this.state.editInfo.id;
        let url = "http://localhost:54385/api/Employee/SaveEmployee";
        var obj = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage['token'],
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                id: Id,
                fName: this.state.editInfo.fName,
                lName: this.state.editInfo.lName,
                designation: this.state.editInfo.designation,
                email: this.state.editInfo.email,
                gender: this.state.editInfo.gender
            }),
        };
        fetch(url, obj).then(response => {
            this.setState({ editInfo: this.initialState })
            this.setState({ showPopup: false });
            this.componentDidMount();
            // event.preventDefault();

        }).catch(error => {
            this.setState({ editInfo: this.initialState })
            alert('error');
            // event.preventDefault();

        });
        // event.preventDefault();


    }
    logout(event) {
        event.preventDefault();
        localStorage.clear();
        this.props.history.push("/login");
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    componentDidMount() {
        var obj = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage['token'],
                'content-type': 'application/json; charset=utf-8'
            },
            body: null,
        };

        let url = "http://localhost:54385/api/Employee/GetAllEmployees";
        fetch(url, obj)
            .then(res => res.json())
            .then(result => {
                this.setState({ employees: result });
            }).catch(error => {

            });
    }
    render() {
        if (this.state.employees) {
            return (
                <div className="d-wrapper">
                    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                        <a className="navbar-brand" href="#">Logo</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={this.logout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="tbl-parent">
                        <a href="#" onClick={this.addRecord} style={{ float: 'right' }}>Add</a>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">E-Mail</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Designation</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(emp => {
                                        return (
                                            <tr key={emp.id}>
                                                <td className="word-wrap-text">{emp.id}</td>
                                                <td className="word-wrap-text">{emp.fName} {emp.lName}</td>
                                                <td className="word-wrap-text">{emp.email}</td>
                                                <td className="word-wrap-text">{emp.gender}</td>
                                                <td className="word-wrap-text">{emp.designation}</td>
                                                <td>
                                                    <a href="#" onClick={() =>
                                                        this.handleShow(this, emp)

                                                    }>Edit</a> &nbsp;&nbsp; <a href="#" onClick={() => this.deleteHandler(this, emp.id)}>Delete</a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* {
                        this.state.showPopup ?
                            <RecordPopup show={this.state.showPopup} empdata={this.state.editInfo}></RecordPopup> : null
                    } */}

                    <Modal
                        show={this.state.showPopup}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title> {this.state.editInfo.id ? 'Edit' : 'Add'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id="signup-form" name="signup-form" className="form" onSubmit={this.saveHandler}>
                                <div className="form-group">
                                    <label className="text-info">Id:</label>&nbsp;
                                    <b>{this.state.editInfo.id}</b>
                                </div>

                                <div className="form-group">
                                    <label className="text-info">First Name:</label>&nbsp;
                                    <input type="text" name="fName" id="fName" className="form-control"
                                        value={this.state.editInfo.fName}
                                        onChange={this.changeEventHandler}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="text-info">Last Name:</label>&nbsp;
                                    <input type="text" name="lName" id="lName" className="form-control"
                                        value={this.state.editInfo.lName}
                                        onChange={this.changeEventHandler}
                                    />
                                </div>


                                <div className="form-group">
                                    <label className="text-info">E-Mail:</label>
                                    <input type="text" name="email" id="email" className="form-control"
                                        value={this.state.editInfo.email}
                                        onChange={this.changeEventHandler}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="text-info">Gender:</label>
                                    <select value={this.state.editInfo.gender} onChange={this.changeEventHandler} className="form-control" name="gender" id="gender">
                                        <option value="F">Female</option>
                                        <option value="M">Male</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="text-info">Designation:</label>
                                    <input type="text" name="designation" id="designation" className="form-control"
                                        value={this.state.editInfo.designation}
                                        onChange={this.changeEventHandler}
                                    />
                                </div>

                                <div className="form-group btn-center">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
                                </div>

                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    }
}

export default withRouter(Dashboard);
