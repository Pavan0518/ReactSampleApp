import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function LoginProtectedRoutes({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <Route {...rest} render={
            props => {
                isAuth = localStorage["token"] ? true : false
                return isAuth ? <Component {...rest} {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }
        } />
    )
}

export default LoginProtectedRoutes;
