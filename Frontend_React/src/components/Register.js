import Axios from 'axios';
import React, {useState} from 'react';

import {
    BoxComponent,
    RegisterButton,
} from './common'
import './Register.css';

function Register() {
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

    Axios.post("/api/uploadregistrationform", data)
      .then(res => resetForm()
      )
      .catch(err => console.log(err));
  };
  function resetForm(){
    this.setState({fname: "", lName: "", email: "", fPref: "", sPref: "", tPrf: "", hours: "", description: "", file: null})
  }
  
  return (
    <div className="App">
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
            <input type="text" id="fPref" onChange={event => {
                const { value } = event.target;
                setFirstPref(value);
              }}
            />
            <label htmlFor="sPref">Second Preference</label>
            <input type="text" id="sPref" onChange={event => {
                const { value } = event.target;
                setSecondPref(value);
              }}
            />
            <label htmlFor="tPref">Third Preference</label>
            <input type="text" id="tPref" onChange={event => {
                const { value } = event.target;
                setThirdPref(value);
              }}
            />
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
      </header>
    </div>
  );
}

export default Register;