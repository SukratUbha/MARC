import axios from 'axios';
import React, {useState} from 'react';

import {
    BoxComponent,
    RegisterButton,
} from './common'
import './Register.css';

function Register() {

    /*Dynamic form field variables*/
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstPref, setFirstPref] = useState(null);
    const [secondPref, setSecondPref] = useState(null);
    const [thirdPref, setThirdPref] = useState(null);
    const [location, setLocation] = useState("");
    const [hours, setHours] = useState(0);
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Upload CV...");


    /*real-time updating based on form fields input*/
    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const onChangeLastName = (event) => {
        setLastName(event.target.value);
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onChangePassword2 = (event) => {
        setPassword2(event.target.value);
    };
    const onChangeFirstPref = (event) => {
        setFirstPref(event.target.value);
    };
    const onChangeSecondPref = (event) => {
        setSecondPref(event.target.value);
    };
    const onChangeThirdPref = (event) => {
        setThirdPref(event.target.value);
    }
    const onChangeHours = (event) => {
        setHours(event.target.value);
    }
    const onChangeLocation = (event) => {
        setLocation(event.target.value);
    }
    const onChangeFile = (event) => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    };

    /*Upload to server using post request*/
    const uploadUser = () => {

        var formData = new FormData();
       // formData.append('file', file);    //add file after appending data
        
        var data = {
             firstName: firstName,
            lastName: lastName, 
            firstPref: firstPref,
            secondPref: secondPref,
            thirdPref: thirdPref,
            email: email,
            pdfLocation: filename
          };
        formData.append('data', data);
        formData.append('file', file);
        
        try {  
        axios.post('/api/submit', [data, formData], {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {console.log(response)});
        } catch (err) {
        if (err.response.status === 500) {
          console.log('There was a problem with the server');
        } else {
          console.log(err)
        }
      }
    
    };

    const load = () => {
        const student1 = {
            firstName:"Steven", 
            lastName:"Kan", 
            email:"Steven@gmail.com", 
            password: null, 
            firstPref: 1,
            secondPref: null,
            thirdPref: null,
            hours: 10.7,
            description: null, 
            pdfLocation:null 
        };
        const student2 = {
            firstName:"Andrew", 
            lastName:"Pakwing", 
            email:"Andrew@gmail.com", 
            password: null, 
            firstPref: 5,
            secondPref: 6,
            thirdPref: 2,
            hours: 8,
            description: null, 
            pdfLocation:null 
        };
        const student3 = {
            firstName:"Dave", 
            lastName:"Wright", 
            email:"Dave@gmail.com", 
            password: null, 
            firstPref: 3,
            secondPref: 4,
            thirdPref: null,
            hours: 20,
            description: null, 
            pdfLocation:null 
        };
        const student4 = {
            firstName:"Spencer", 
            lastName:"Smith", 
            email:"Spencer@gmail.com", 
            password: null, 
            firstPref: 6,
            secondPref: 4,
            thirdPref: 2,
            hours: 15,
            description: null, 
            pdfLocation:null 
        };
        const student5 = {
            firstName:"Sukrat", 
            lastName:"Ubha", 
            email:"Sukrat@gmail.com", 
            password: null, 
            firstPref: 1,
            secondPref: 3,
            thirdPref: null,
            hours: 18.7,
            description: null, 
            pdfLocation:null 
        };
        axios.post("/api/students/api/registerStudent", student1);
        axios.post("/api/students/api/registerStudent", student2);
        axios.post("/api/students/api/registerStudent", student3);
        axios.post("/api/students/api/registerStudent", student4);
        axios.post("/api/students/api/registerStudent", student5)
    };
    


    /*HTML component rendered on client page*/
    return(
        
        <BoxComponent>
            <button onClick={load}>Load Student</button>
            <form onSubmit={uploadUser}>
                <h1>Marker application form</h1>
                <div className="formField">
                    <label htmlFor='firstName' className='formLabel'> First name </label>
                    <input id="firstName" type='text' name='firstName' className='formInput' placeholder='First name'
                    value={firstName} onChange={onChangeFirstName}/>
                </div>
                <div className="formField">
                    <label htmlFor='lastName' className='formLabel'> Last name </label>
                    <input id="lastName" type='text' name='lastName' className='formInput' placeholder='Last name'
                    value={lastName} onChange={onChangeLastName}/>
                </div>
                <div className="formField">
                    <label htmlFor='email' className='formLabel'> Email </label>
                    <input type='email' name='email' className='formInput' placeholder='abc123@gmail.com'
                    value={email} onChange={onChangeEmail}/>
                </div>
                <div className="formField">
                    <label htmlFor='password' className='formLabel'> Password </label>
                    <input type='password' name='password' className='formInput' placeholder='password'
                    value={password} onChange={onChangePassword}/>
                </div>
                <div className="formField">
                    <label htmlFor='password2' className='formLabel'> Confirm password </label>
                    <input type='password2' name='password2' className='formInput' placeholder='confirm password'
                    value={password2} onChange={onChangePassword2}/>
                </div>
                <div className="formField">
                    <label htmlFor='preferences' className='formLabel'> Course preferences </label> 
                    <div name='preferences'>
                        <input type="text" className="searchbar" placeholder="search courses..."
                        value={firstPref} onChange={onChangeFirstPref}/>
                        <div className="dragDropBox">Drag Drop</div>
                    </div>
                </div>
                <div className="formField">
                    <label htmlFor='hours' className='formLabel'> Hours </label>
                    <input type="text" className="formLabel" placeholder="0"
                    value={hours} onChange={onChangeHours}/>
                </div>
                <div className="formField">
                    <label htmlFor='location' className='formLabel'> What is the nature of your physical availablity to mark on UoA Campus? </label>
                    <input type="text" className="formInput" placeholder="describe circumstances here..."/>
                </div>
                <div className="formField">
                    <label htmlFor='studentCV' className='formLabel'> CV Upload: </label>
                    <input type='file' name='studentCV' className='formInput'
                    value={file} onChange={onChangeFile}/>   
                </div>   
                <RegisterButton type="submit"> Register </RegisterButton>   
            </form>
        </BoxComponent>
    )
} 

export default Register;