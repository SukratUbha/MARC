import React, {useState} from 'react';
import './App.css';
import { Switch, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/round_long.png";
import Addcourse  from './components/add_course.js';
import Register from './components/Register';
import Courses from './components/Courses';
import Markers from './components/Markers';
import sendEmails from './components/SendEmails';
import Overview  from './components/index';

import Modal from 'react-modal'

import 'react-reflex/styles.css'
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'
/*
By linking frontend to backend
In Frontend_React\package.json
We add backend port "proxy": "http://localhost:8080/",
If we make a request to endpoint and can't find it on the frontend, we go to check and see the proxy

*/
Modal.setAppElement('#root')
function App() {
  const [modalIsOpen, SetModalIsOpen] = useState(false)
  let condition
  const location = useLocation().pathname
  if (location==='/'){ 
    condition=<Overview/>
  }

  return (
    <ReflexContainer orientation="horizontal">
      <div>
        <ReflexElement className="header" flex={0.1}>
          <header className="navbar navbar-expand-sm bg-dark navbar-dark" style={{"zIndex": "99999",width: "100%", height:"75px"}}>
            <a href="/" className="navbar-brand">
              <img src={logo} style={{width:"200px", paddingRight:"20px"}} alt="marcLogo"/>
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item" onClick={()=>SetModalIsOpen(true)}>
                <Link to={"#"} className="nav-link">
                  Create
                </Link>
              </li>
              <Modal isOpen={modalIsOpen} onRequestClose={() => SetModalIsOpen(false)} >
                <div>
                  <button onClick={() => SetModalIsOpen(false)}>X</button>
                </div>
                <Addcourse/>
              </Modal>
              <li className="nav-item">
                <Link to={"/markers"} className="nav-link">
                  Markers View
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/allocate"} className="nav-link">
                  Course List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/emails"} className="nav-link">
                  Send Emails
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
          
        </ReflexElement>
        {condition}
        <div className="container mt-3">
            <Route path="/markers" component={Markers} />
            <Route path="/allocate" component={Courses} />
            <Route path="/register" component={Register} />
            <Route path="/emails" component={sendEmails} />
        </div>
        
      </div>
      </ReflexContainer>
  );
}


export default App;
