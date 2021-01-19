import React, { Component } from 'react';
import './Dashboard.css';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import CommonGrid from '../reusable/CommonGrid';
import { Get, Post, Delete } from '../../http-service/httpservice';
class Dashboard extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            employees: [],
            showPopup: false,
            editInfo: this.initialState,
            operations: { insert: true, update: true, delete: true }
        };
        // this.logout = this.logout.bind(this);
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
        event.preventDefault();
    }
    handleClose(event) {
        this.setState({ showPopup: false });
        this.componentDidMount();
    }
    handleShow(event, emp) {
        this.setState({ editInfo: emp });
        this.setState({ showPopup: true });
    }
    addRecord(event) {
        event.preventDefault();
        this.setState({ editInfo: this.initialState });
        this.setState({ showPopup: true });
    }
    async deleteHandler(event, Id) {
        await Delete(`Employee/DeleteEmployee?Id=${Id}`).then(response => {
            this.componentDidMount();
        }).catch(error => {
            alert('error');
        });
    }
    async saveHandler(event) {
        event.preventDefault();
        let body = {
            id: this.state.editInfo.id == 0 ? 0 : this.state.editInfo.id,
            fName: this.state.editInfo.fName,
            lName: this.state.editInfo.lName,
            designation: this.state.editInfo.designation,
            email: this.state.editInfo.email,
            gender: this.state.editInfo.gender
        }
        await Post("Employee/SaveEmployee", body).then(response => {
            this.setState({ editInfo: this.initialState })
            this.setState({ showPopup: false });
            this.componentDidMount();
        }).catch(error => {
            this.setState({ editInfo: this.initialState })
            console.log(error);
            alert('error');
        });
    }
    // logout(event) {
    //     event.preventDefault();
    //     localStorage.clear();
    //     this.props.history.push("/login");
    // }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    componentDidMount() {
        this.getAllEmployees();
    }
    async getAllEmployees() {
        await Get("Employee/GetAllEmployees")
            .then(res => res.data)
            .then(data => {
                data.map(emp => emp["name"] = emp["fName"] + ' ' + emp["lName"])
                this.setState({ employees: data });
            }).catch(error => {
                console.log('Error : ' + error);
            });
    }
    render() {
        if (this.state.employees) {
            return (
                <div className="d-wrapper">
                    {/* <nav className="navbar navbar-expand-md navbar-dark bg-primary">
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
                    </nav> */}
                    <CommonGrid
                        data={this.state.employees}
                        dColNames={['Id', 'Name', 'E-Mail', 'Gender', 'Designation', 'Actions']}
                        colNames={['id', 'name', 'email', 'gender', 'designation']}
                        opi={true}
                        opu={true}
                        opd={true}
                        addRecord={this.addRecord}
                        hrefEdithandler={this.handleShow}
                        hrefDeletehandler={this.deleteHandler}
                    />
                    {/* <CommonGrid addRecord={this.addRecord}
                        data={this.state.employees}
                        dColNames={['Id', 'Name', 'E-Mail']}
                        colNames={['id', 'name', 'email']}
                    /> */}
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
