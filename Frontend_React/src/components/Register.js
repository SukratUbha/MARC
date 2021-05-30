import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import Dropbox from './dropbox';
import Select from 'react-select'
import {
    BoxComponent,
    RegisterButton,
} from './common'
import './Register.css';

function Register(props) {
  const [name, setName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [fPref, setFirstPref] = useState();
  const [sPref, setSecondPref] = useState();
  const [tPref, setThirdPref] = useState();
  const [hours, setHours] = useState();
  const [UPI, setUPI] = useState();
  const [description, setDescription] = useState();
  const [Training, setTraining] = useState();
  const [GPA, setGPA] = useState();
  const [file, setFile] = useState();

  const options = [
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' }
  ]

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
    data.append("bTraining",Training)
    data.append("GPA",GPA)
    data.append("UPI",UPI)
    data.append("file", file);
    console.log(Training);
    Axios.post("/api/uploadregistrationform", data)
      .then((res) =>{
        console.log(data)
        if(res.data === "Registered"){
          console.log(res.data) 
          alert("Registered")
          resetForm()         
        }
        else{
          console.log(res.data)
          alert("Failed to register: Fill in all your details and upload CV in PDF format")
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
  const onchangeSelect = (item) => {
    setGPA(item.value);
  };
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
            <label htmlFor="UPI">UPI</label>    
            <input type="text" id="UPI" onChange={event => {
                const { value } = event.target;
                setUPI(value);
              }}
            />
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" onChange={event => {
                const { value } = event.target;
                setEmail(value);
              }}
            />
            <div class="dropdown">
            <label htmlFor="GPA">GPA</label>
             <Select options={options} value = {GPA} onChange={onchangeSelect} getOptionValue={(option) => option.value} 
                getOptionLabel={(option) => option.value}/>
            <label htmlFor="fPref">First Preference</label>
            <Dropbox id="fPref" prefFromRegister={"first"} sendToRegister={functionFromDropbox}/>
            <label htmlFor="sPref">Second Preference</label>
            <Dropbox id="sPref" prefFromRegister={"second"} sendToRegister={functionFromDropbox}/>
            <label htmlFor="tPref">Third Preference</label>
            <Dropbox id="sPref" prefFromRegister={"third"} sendToRegister={functionFromDropbox}/>
            </div>
            <label htmlFor="hours">Hours Marked</label>
            <input type="number" id="hours" placeholder = '0' onChange={event => {
                const { value } = event.target;
                setHours(value);
              }}
            />
            <label htmlFor="Description">Bullying and Harrasment Training</label>
            <div className="form-check">
              <label><input type="radio" value="Trial" name = 'Check' checked={true} className="form-check-input"/>Yes</label>
              <label><input type="radio" value="Trial2" name = 'Check' checked={true} className="form-check-input"/>No</label>
            </div>
            <label htmlFor="Description">What is the nature of your physical availablity to mark on UoA Campus</label>
            <input type="text" id="description" placeholder = 'Available on City Campus' onChange={event => {
                const { value } = event.target;
                setDescription(value);
              }}
            />
          </div>
          <div className="flex">
            <label htmlFor="file">Upload CV
            <input
              type="file"
              id="file"
              accept=".pdf"
              onChange={event => {
                const file = event.target.files[0];
                setFile(file);
              }}
            /></label>
          </div>
        </form>
        <button className="btn btn-primary" onClick={send}>Register</button>
        {/* <button onClick={check}>Check</button> */}
      </header>
    </div>
    </BoxComponent>
  );
}

export default Register;