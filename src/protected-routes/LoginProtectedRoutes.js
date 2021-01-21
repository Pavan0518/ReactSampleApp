import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ErrorBoundary from '../components/Error/ErrorBoundary';
function LoginProtectedRoutes({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <Route {...rest} render={
            props => {
                isAuth = localStorage["token"] ? true : false
                rest.handleLogin(this);// handleLogin(this);
                return isAuth ? <ErrorBoundary><Component {...props} /></ErrorBoundary> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }
        } />
    )
}

export default LoginProtectedRoutes;
