import React, {useState} from 'react';
import './App.css';
import { Switch, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/round_long.png";
import sponsor_logo from "./assets/SiteHost_Logo_RGB_Vertical_lighttext.png";
import Addcourse  from './components/add_course.js';
import Register from './components/Register';
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
      <header className="navbar navbar-expand-sm bg-dark navbar-dark" style={{"zIndex": "99999",width: "100%", height:"75px"}}>
        <a href="/" className="navbar-brand">
          <img src={logo} style={{width:"200px", paddingRight:"20px"}} alt="marcLogo"/>
        </a>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item" onClick={()=>SetModalIsOpen(true)}>
            <Link to={"#"} className="nav-link">
              Create Course
            </Link>
          </li>
          <Modal isOpen={modalIsOpen} onRequestClose={() => SetModalIsOpen(false)} >
            <div>
              <button onClick={() => SetModalIsOpen(false)}>X</button>
            </div>
            <Addcourse/>
          </Modal> */}
          {/* <li className="nav-item">
            <Link to={"/#"} className="nav-link">
              Student List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"#"} className="nav-link">
              Colourize Student Status
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"#"} className="nav-link">
              Colourize Student Status
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"#"} className="nav-link">
              Colourize Late Courses
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to={"/emails"} className="nav-link">
              Send Emails
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to={"/markers"} className="nav-link">
              Markers View 
            </Link>
          </li> */}
          <div className="navbar-right">
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register 
            </Link>
          </li>
          </div>
        </div>
        <a href="https://sitehost.nz/" target="_blank" className="navbar-brand" style={{fontSize: "15px", textAlign:"center"}}>
          Sponsored by <br/><img src={sponsor_logo} style={{width:"90px", marginRight:"auto", marginLeft:"auto",}} alt="sponsoreLogo"/>
        </a>
      </header>
      {condition}
      {/* <Route path="/markers" component={Markers} /> */}
      <Route path="/register" component={Register} />
      <Route path="/emails" component={sendEmails} />
    </ReflexContainer>
  )
}


export default App;
