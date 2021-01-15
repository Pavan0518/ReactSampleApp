import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function LoginProtectedRoutes({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <Route {...rest} render={
            props => {
                // debugger;
                // console.log(props.location);
                // if (localStorage["token"] && props.location.pathname != "/") {
                //     return <Component {...rest} {...props} />

                // } else {
                // return <Redirect to={{ pathname: "/", state: { from: props.location } }}></Redirect>
                // }

                return <Component {...rest} {...props} />
                // isAuth = localStorage["token"] ? true : false;
                // if (isAuth && props.location.pathname !== "/login")
                //     return <Component {...rest} {...props} />
                //     else if(props.location.pathname != "/signup")
                // return <Redirect to={{ pathname: "/login", state: { from: props.location } }}></Redirect>

            }
        } />
    )
}

export default LoginProtectedRoutes;
