import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import Dropbox from './dropbox';

import {
    BoxComponent,
    RegisterButton,
} from './common'
import './Register.css';
import { Dropdown } from 'semantic-ui-react';

function Register(props) {
  const [name, setName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [fPref, setFirstPref] = useState();
  const [sPref, setSecondPref] = useState();
  const [tPref, setThirdPref] = useState();
  const [hours, setHours] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();

  const send = event => {
    const data = new FormData();
    data.append("firstName", name);
    data.append("lastName",lname)
    data.append("email",email)
    data.append("fPref",fPref)
    data.append("sPref",sPref)
    data.append("tPref",tPref)
    data.append("hours",hours)
    data.append("description",description)

    data.append("file", file);

    console.log(data)
    Axios.post("/api/uploadregistrationform", data)
      .then((res) =>{
        console.log(data)
        if(res.data === "Registered"){
          console.log(res.data) 
          alert("Registered")
          // resetForm()         
        }
        else{
          console.log(res.data)
          alert("Failed to register")
        }
      })
      .catch(err => console.log(err));
  };
  const resetForm = () => {
    window.location.reload(true);
  }

  const functionFromDropbox = (retrieved_pref, retrieved_course_id) => {
    console.log("Hi I have retrieved ",retrieved_pref, retrieved_course_id);
    if(retrieved_pref === "first"){
      setFirstPref(retrieved_course_id);
    } else if (retrieved_pref === "second"){
      setSecondPref(retrieved_course_id);
    } else if (retrieved_pref === "third") {
      setThirdPref(retrieved_course_id);
    } else {
      console.log("something has happened in functionFromDropbox with ", retrieved_pref, "and", retrieved_course_id)
    }
    
  }

  const check = () => {
    console.log(fPref, sPref, tPref)
  }

  return (
    <BoxComponent>
    <div className="App" style={{background:"white"}}>
      <header className="App-header">
        <form action="#">
          <div className="flex">
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" onChange={event => {
                const { value } = event.target;
                setName(value);
              }}
            />
            <label htmlFor="lName">Last Name</label>
            <input type="text" id="lname" onChange={event => {
                const { value } = event.target;
                setLName(value);
              }}
            />
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" onChange={event => {
                const { value } = event.target;
                setEmail(value);
              }}
            />
            <label htmlFor="fPref">First Preference</label>
            <Dropbox id="fPref" prefFromRegister={"first"} sendToRegister={functionFromDropbox}/>
            <label htmlFor="sPref">Second Preference</label>
            <Dropbox id="sPref" prefFromRegister={"second"} sendToRegister={functionFromDropbox}/>
            <label htmlFor="tPref">Third Preference</label>
            <Dropbox id="sPref" prefFromRegister={"third"} sendToRegister={functionFromDropbox}/>
            <label htmlFor="hours">Hours</label>
            <input type="text" id="hours" onChange={event => {
                const { value } = event.target;
                setHours(value);
              }}
            />
            <label htmlFor="Description">What is the nature of your physical availablity to mark on UoA Campus</label>
            <input type="text" id="description" onChange={event => {
                const { value } = event.target;
                setDescription(value);
              }}
            />
          </div>
          <div className="flex">
            <label htmlFor="file">CV Upload</label>
            <input
              type="file"
              id="file"
              accept=".pdf"
              onChange={event => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </div>
        </form>
        <button onClick={send}>Register</button>
        <button onClick={check}>Check</button>
      </header>
    </div>
    </BoxComponent>
  );
}

export default Register;