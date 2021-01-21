import React from 'react'


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
                                        colNames.map((col, index) => {
                                            return <td key={index} className="word-wrap-text">{emp[col]}</td>
                                        })
                                    }
                                    {
                                        opd || opu ? (
                                            <React.Fragment>
                                                <td>
                                                    {
                                                        opu ?
                                                            (<a style={{ "paddingRight": "10px" }} href="#" onClick={() => props.hrefEdithandler(this, emp)}>Edit</a>)
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
