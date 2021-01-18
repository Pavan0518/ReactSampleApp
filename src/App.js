import React, { useState } from 'react';
import logo from './logo.svg';
import appSytles from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/signup/SignUp';
import LoginProtectedRoutes from './protected-routes/LoginProtectedRoutes';
import RecordPopup from './components/dashboard/RecordPopup';
import auth from './services/Auth';

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
        <Router>
          <Switch>
            <Route exact path="/login" handleLogin={handleLogin} render={() => {
              return localStorage["token"] ? <Redirect to={"/"} /> : <Login />
            }}></Route>
            <LoginProtectedRoutes exact path="/" handleLogin={handleLogin} isAuth={isAuth} component={Dashboard} />
            <Route exact path="/signup" handleLogin={handleLogin} render={(props) => {
              return localStorage["token"] ? <Redirect to={"/"} /> : <SignUp {...props}/>
            }}></Route>
          </Switch>
        </Router>
      </div>
    </div >
  );
}
// ReactDOM.render(<BrowserRouter><App></App></BrowserRouter>,
//   document.getElementById("root"));
export default App;
