import React, { useState } from 'react';
import logo from './logo.svg';
import appSytles from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/signup/SignUp';
import LoginProtectedRoutes from './protected-routes/LoginProtectedRoutes';
import RecordPopup from './components/dashboard/RecordPopup';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const handleLogin = e => {
    if (localStorage["token"])
      setIsAuth(true);
    else setIsAuth(false);
  }
  const handleLogout = e => {
      setIsAuth(false);
  }
  return (
    <div className={appSytles.App}>
      <div className={appSytles.wrapper}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/" component={Dashboard}></Route>
            {/* <Route exact path='/' handleLogin={handleLogin} render={props => <Login {...props} isAuth={isAuth} handleLogin={handleLogin} />} /> */}
            {/* <LoginProtectedRoutes path="/" handleLogout={handleLogout} isAuth={isAuth} component={Dashboard} /> */}
            <Route path="/signup" component={SignUp}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
// ReactDOM.render(<BrowserRouter><App></App></BrowserRouter>,
//   document.getElementById("root"));
export default App;
