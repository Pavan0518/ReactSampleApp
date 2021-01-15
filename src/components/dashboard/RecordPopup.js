import React, { Component } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';

class RecordPopup extends Component {
    // constructor(props) {
    //     super(props);
    //     const { empdata } = this.props;
    //     this.state = {
    //         showPopup: false,
    //         editInfo: {}
    //     };
    //     this.setState({ editInfo: empdata });
    //     this.handleClose = this.handleClose.bind(this);
    //     this.handleShow = this.handleShow.bind(this);
    // }
    // handleClose(event) {
    //     this.setState({ showPopup: false });
    // }
    // handleShow(event, emp) {
    //     this.setState({ editInfo: emp });
    //     this.setState({ showPopup: true });
    // }
    // saveHandler(event) {

    // }
    // render() {
    //     return (

    //         <div>
    //             <Modal
    //                 show={this.state.showPopup}
    //                 onHide={this.handleClose}
    //                 backdrop="static"
    //                 keyboard={false}
    //             >
    //                 <Modal.Header closeButton>
    //                     <Modal.Title>Edit</Modal.Title>
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     <form id="signup-form" name="signup-form" className="form" onSubmit={this.saveHandler}>
    //                         <div className="form-group">
    //                             <label className="text-info">Id:</label>&nbsp;
    //                                 <b><label name="id" id="id">{this.state.editInfo.id}</label></b>
    //                         </div>

    //                         <div className="form-group">
    //                             <label className="text-info">First Name:</label>&nbsp;
    //                                 <input type="text" name="first_name" id="first_name" className="form-control"
    //                                 value={this.state.editInfo.fName} />
    //                         </div>

    //                         <div className="form-group">
    //                             <label className="text-info">Last Name:</label>&nbsp;
    //                                 <input type="text" name="last_name" id="last_name" className="form-control"
    //                                 value={this.state.editInfo.lName} />
    //                         </div>


    //                         <div className="form-group">
    //                             <label className="text-info">E-Mail:</label>
    //                             <input type="text" name="email" id="email" className="form-control"
    //                                 value={this.state.editInfo.email}
    //                             />
    //                         </div>

    //                         <div className="form-group">
    //                             <label className="text-info">Gender:</label>
    //                             <select className="form-control" name="gender" id="gender">
    //                                 <option value="F">Female</option>
    //                                 <option value="M">Male</option>
    //                             </select>
    //                         </div>

    //                         <div className="form-group">
    //                             <label className="text-info">Designation:</label>
    //                             <input type="text" name="desig" id="desig" className="form-control"
    //                                 value={this.state.editInfo.designation}
    //                             />
    //                         </div>

    //                         <div className="form-group btn-center">
    //                             <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
    //                         </div>

    //                     </form>
    //                 </Modal.Body>
    //             </Modal>

    //         </div>
    //     )
    // }
}

export default RecordPopup
