import Axios from 'axios';
import React, {useState} from 'react';

import {
    BoxComponent,
    RegisterButton,
} from './common'
import './Register.css';

function Markers() {
  const [name, setName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [fPref, setFirstPref] = useState();
  const [hours, setHours] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();

  const send = event => {
    const data = new FormData();
    data.append("firstName", name);
    data.append("lastName",lname)
    data.append("email",email)
    data.append("fPref",fPref)
    data.append("hours",hours)
    data.append("description",description)

    data.append("file", file);

    Axios.post("/api/uploadregistrationform", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <form action="#">
          <div className="flex">
            <label htmlFor="name">First Name</label>
            <input type="text" id="name" onChange={event => {
                const { value } = event.target;
                setName(value);
              }}
            />
            <label htmlFor="lastName">Last Name</label>
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
            <label htmlFor="fPref">Course Preference</label>
            <input type="text" id="fPref" onChange={event => {
                const { value } = event.target;
                setFirstPref(value);
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
              accept=".jpg"
              onChange={event => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </div>
        </form>
        <button onClick={send}>Send</button>
      </header>
    </div>
  );
}

export default Markers;