import React from 'react'
import { Modal, Button, FormControl } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import Pagination from 'react-js-pagination';

function CommonGrid(props) {
    const { dColNames, colNames } = props;
    const { opi, opd, opu } = props;

    // handlePageChange(pageNumber) {
    //     console.log(`active page is ${pageNumber}`);
    //     this.setState({activePage: pageNumber});
    //   }
    return (
        <div className="tbl-parent">
            {

                opi ? <a href="#" onClick={props.addRecord} style={{ float: 'right' }}>Add</a> : null
            }

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        {
                            dColNames.map((colName, index) => <th scope="col" key={colName}>{colName}</th>)
                        }
                        {/* <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Designation</th>
                        <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map(emp => {
                            return (
                                <tr key={emp.id}>
                                    {
                                        colNames.map(col => {
                                            return <td className="word-wrap-text">{emp[col]}</td>
                                        })
                                    }
                                    {
                                        opd || opu ? (
                                            <React.Fragment>
                                                <td>
                                                    {
                                                        opu ?
                                                            (<a style={{ "padding-right": "10px" }} href="#" onClick={() => props.hrefEdithandler(this, emp)}>Edit</a>)
                                                            : null
                                                    }

                                                    {
                                                        opd ?
                                                            <a href="#" onClick={() => props.hrefDeletehandler(this, emp.id)}>Delete</a>
                                                            : null
                                                    }

                                                </td>
                                            </React.Fragment>
                                        ) : null
                                    }


                                    {/* <td className="word-wrap-text">{emp.id}</td>
                                    <td className="word-wrap-text">{emp.fName} {emp.lName}</td>
                                    <td className="word-wrap-text">{emp.email}</td>
                                    <td className="word-wrap-text">{emp.gender}</td>
                                    <td className="word-wrap-text">{emp.designation}</td>
                                    <td>
                                        <a href="#" onClick={() =>
                                            props.hrefEdithandler(this, emp)

                                        }>Edit</a> &nbsp;&nbsp; <a href="#" onClick={() => props.hrefDeletehandler(this, emp.id)}>Delete</a>
                                    </td> */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >

    )
}


export default CommonGrid
