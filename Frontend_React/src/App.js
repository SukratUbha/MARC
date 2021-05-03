import React, {useState} from 'react';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/round_long.png";

import Addcourse  from './components/add_course.js';
import Tutorial  from './components/course';
import TutorialsList  from './components/course';
import Register from './components/Register';
import Courses from './components/Courses';
import Markers from './components/Markers';

import Modal from 'react-modal'
/*
By linking frontend to backend
In Frontend_React\package.json
We add backend port "proxy": "http://localhost:8080/",
If we make a request to endpoint and can't find it on the frontend, we go to check and see the proxy

*/
Modal.setAppElement('#root')
function App() {
  const [modalIsOpen, SetModalIsOpen] = useState(false)
  return (
    <div>
      <header class="navbar navbar-expand-sm bg-dark navbar-dark" style={{"z-index": "99999",width: "100%", height:"75px"}}>
        <a href="/" className="navbar-brand">
          <img src={logo} style={{width:"180px"}} alt="marcLogo"/>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item" onClick={()=>SetModalIsOpen(true)}>
            <Link className="nav-link">
              Create
            </Link>
          </li>
          <Modal isOpen={modalIsOpen} onRequestClose={() => SetModalIsOpen(false)}>
            <div>
              <button onClick={() => SetModalIsOpen(false)}>X</button>
            </div>
            <Addcourse/>
          </Modal>
          <li className="nav-item">
            <Link to={"/markers"} className="nav-link">
              Markers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/allocate"} className="nav-link">
              Allocations
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
        
      </header>

      
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route path="/markers" component={Markers} />
          <Route path="/allocate" component={Courses} />
          <Route path="/api/courses/:id" component={Tutorial} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>

      
    </div>
  );
}


export default App;
