import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './NewSignUp.css';
import { Get, Post, Delete } from '../../http-service/httpservice';

function NewSignUp(props) {
    const goBack = (event) => {
        props.history.push("/login");
    }
    const formik = useFormik({
        initialValues: {
            user_id: "",
            id: 0,
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            cPassword: "",
            isActive: true,
        },
        validationSchema:
            Yup.object().shape({
                first_name: Yup.string()
                    .required('Fist Name is required'),
                last_name: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                cPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required'),
                isActive: Yup.bool()
                    .oneOf([true])
            }),
        onSubmit(values) {
            if (!formik.isValid) return;
            Post("SignUp/CreateUser", values, false).then(response => {
                if (response.status == 201) {
                    props.history.push("/login");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    });

    return (
        <div className="wrapper">
            <div id="signup">
                <div className="container">
                    <div id="signup-row" className="row justify-content-center align-items-center">
                        <div id="signup-column" className="col-md-6">
                            <div id="signup-box" className="col-md-12">
                                <form id="signup-form" name="signup-form" className="form" onSubmit={formik.handleSubmit}>
                                    <h3 className="text-center text-info">Signup</h3>
                                    <div className="form-group">
                                        <label className="text-info">First Name:</label><br></br>
                                        <input type="text" name="first_name" id="first_name" className="form-control"
                                            value={formik.values.first_name}
                                            onChange={formik.handleChange}
                                        ></input>
                                        {formik.errors.first_name && formik.touched.first_name && (
                                            <p>{formik.errors.first_name}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">Last Nme:</label><br></br>
                                        <input type="text" name="last_name" id="last_name" className="form-control"
                                            value={formik.values.last_name}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.last_name && formik.touched.last_name && (
                                            <p>{formik.errors.last_name}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">E-Mail:</label><br></br>
                                        <input type="text" name="email" id="email" className="form-control"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.email && formik.touched.email && (
                                            <p>{formik.errors.email}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">Phone:</label><br></br>
                                        <input type="text" name="phone" id="phone" className="form-control"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.phone && formik.touched.phone && (
                                            <p>{formik.errors.phone}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">Password:</label><br></br>
                                        <input type="password" name="password" id="password" className="form-control"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.password && formik.touched.password && (
                                            <p>{formik.errors.password}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">Confirm Password:</label><br></br>
                                        <input type="password" name="cPassword" id="cpasscPasswordword" className="form-control"
                                            value={formik.values.cPassword}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.cPassword && formik.touched.cPassword && (
                                            <p>{formik.errors.cPassword}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">Active:</label> &nbsp;
                                            <input type="checkbox" name="isActive" id="isActive"
                                            defaultChecked={formik.values.isActive}
                                            onClick={formik.handleCheck}
                                        />
                                    </div>
                                    <div className="form-group btn-center">
                                        <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
                                            &nbsp;
                                            <input type="button" name="back" className="btn btn-info btn-md" value="Go to Login" onClick={goBack} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewSignUp
