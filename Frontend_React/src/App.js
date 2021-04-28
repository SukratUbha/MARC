import React from 'react';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/round_long.png"

import Addcourse  from './components/add_course.js';
import Tutorial  from './components/course';
import TutorialsList  from './components/course';
import Register from './components/Register';

/*
By linking frontend to backend
In Frontend_React\package.json
We add backend port "proxy": "http://localhost:8080/",
If we make a request to endpoint and can't find it on the frontend, we go to check and see the proxy

*/

function App() {
  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <a href="/api/courses" className="navbar-brand">
          <img src={logo} style={{width:"180px"}} alt="marcLogo"/>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"#"} className="nav-link">
              Markers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Create course
            </Link>
          </li>
          <div className="navbar-right">
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={Addcourse} />
          <Route path="/api/courses/:id" component={Tutorial} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </div>
  );
}


export default App;
