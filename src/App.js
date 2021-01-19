import React, { useState } from 'react';
import appSytles from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/signup/SignUp';
import LoginProtectedRoutes from './protected-routes/LoginProtectedRoutes';
import Header from './components/header/Header';
// import { hashHistory } from 'react-router;'

function App(props) {
  const [isAuth, setIsAuth] = useState(false);
  const handleLogin = e => {
    if (localStorage["token"])
      setIsAuth(true);
    else setIsAuth(false);
  }
  const handleLogout = e => {
    setIsAuth(false);
  }
  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
    return <Redirect to={'/login'}></Redirect>
  }
  return (
    <div className={appSytles.App}>
      <div className={appSytles.wrapper}>
        <Header {...props} logout={logout} handleLogin={handleLogin} isAuth={isAuth}/>
        <Router>
          <Switch>
            <Route exact path="/login" handleLogin={handleLogin} render={() => {
              return localStorage["token"] ? <Redirect to={"/"} /> : <Login handleLogin={handleLogin} {...props}/>
            }}></Route>

            <LoginProtectedRoutes exact path="/" handleLogin={handleLogin} isAuth={isAuth} component={Dashboard} />
            <Route exact path="/signup" handleLogin={handleLogin} render={(props) => {
              return localStorage["token"] ? <Redirect to={"/"} /> : <SignUp {...props} />
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
