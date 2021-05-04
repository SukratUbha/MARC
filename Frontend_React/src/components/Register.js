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
    const onChangeFile = (event) => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    };

    /*Upload to server using post request*/
    const uploadUser = () => {

        var formData = new FormData();
        formData.append('file', file);

        var data = {
            firstName: firstName,
            lastName: lastName, 
            firstPref: firstPref,
            secondPref: secondPref,
            thirdPref: thirdPref,
            email: email,
            pdfLocation: filename
          };
        
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

    


    /*HTML component rendered on client page*/
    return(
        <BoxComponent>
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
                    <label htmlFor='location' className='formLabel'> Hours </label>
                    <input type="text" className="formLabel" placeholder="0"
                    value={hours} onChange={onChangeHours}/>
                </div>
                <div className="formField">
                    <label htmlFor='location' className='formLabel'> location </label>
                    <select name="location" className='formSelect'>
                        <option value="Auckland">Auckland</option>
                        <option value="Remote">Remote</option>
                    </select>
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