import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import Main from './components/Main';

function App() {
  return (
    <Router>
       <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              WriteIt_DoIt
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
				
              <Route path="/sign-in"><Login /></Route>
              <Route path="/sign-up"><SignUp /></Route>
			  <Route path="/main"><Main /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
