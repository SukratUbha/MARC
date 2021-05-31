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
  const [sN, setStudentNumber] = useState();
  const [email, setEmail] = useState();
  const [GPA, setGPA] = useState();
  const [fPref, setFirstPref] = useState();
  const [sPref, setSecondPref] = useState();
  const [tPref, setThirdPref] = useState();
  const [hours, setHours] = useState();
  const [UPI, setUPI] = useState();
  const [year, setYear] = useState();
  const [coursesMarked, setCoursesMarked] = useState("NONE");
  const [degree, setDegree] = useState();
  const [description, setDescription] = useState();
  const [Training, setTraining] = useState("0");
  const [gradType, setGradType] = useState("0");
  const [tutorTraining, settutorTraining] = useState("0");
  const [prevMarked, setPrevMarked] = useState("0");
  const [prevMarkedSecond, setPrevMarkedSecond] = useState("0");
  const [prevMarkedThird, setPrevMarkedThird] = useState("0");
  const [prevEnrolledFirst, setprevEnrolledFirst] = useState("0");
  const [prevEnrolledSecond, setprevEnrolledSecond] = useState("0");
  const [prevEnrolledthird, setprevEnrolledThird] = useState("0");
  
  const [file, setFile] = useState();

  const options = [
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },
    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' },
    { value: 'C-', label: 'C-' },
    { value: 'F', label: 'F' },
  ]

  const send = event => {
    const data = new FormData();
    data.append("firstName", name);
    data.append("lastName",lname)
    data.append("email",email)
    data.append("studentNumber",sN)
    data.append("degree",degree)
    data.append("fPref",fPref)
    data.append("sPref",sPref)
    data.append("tPref",tPref)
    data.append("hours",hours)
    data.append("description",description)
    data.append("Training",Training)
    data.append("GPA",GPA)
    data.append("UPI",UPI)
    data.append("Year",year)
    data.append("GradType",gradType)
    data.append("CoursesMarked",coursesMarked)
    data.append("tutorTraining",tutorTraining)
    data.append("prevMarkedFirst",prevMarked)
    data.append("prevMarkedSecond",prevMarkedSecond)
    data.append("prevMarkedThird",prevMarkedThird)
    data.append("prevEnrolledFirst",prevEnrolledFirst)
    data.append("prevEnrolledSecond",prevEnrolledSecond)
    data.append("prevEnrolledThird",prevEnrolledthird)
    data.append("file", file);
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
    <div className="App" style={{background:"white", margin: "auto"}}>
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
            <label htmlFor="AUID">AUID</label>
            <input type="text" id="AUID" onChange={event => {
                const { value } = event.target;
                setStudentNumber(value);
              }}
            />
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" onChange={event => {
                const { value } = event.target;
                setEmail(value);
              }}
            />
            <label htmlFor="degreeCompleted">Degree</label>
            <input type="text" id="degreeCompleted" onChange={event => {
                const { value } = event.target;
                setDegree(value);
              }}
            />
            <label htmlFor="Description">Are you a postgraduate or an undergraduate?</label>
            <div className="form-check">
            <label><input type = "radio" name = "Gradtype" checked={gradType==='1'} value = '1' className="form-check-input" onChange={(e)=>{setGradType(e.target.value)}}/> Undergraduate</label>
            <label><input type = "radio" name = "Gradtype" checked={gradType==='0'} value = '0' className="form-check-input" onChange={(e)=>{setGradType(e.target.value)}}/>Postgraduate</label>
            </div>    
            <label htmlFor="year">Which year are you in?</label>
            <input type="number" id="year" placeholder = "1,2,3,..., or 7(Postgrad)" onChange={event => {
                const { value } = event.target;
                setYear(value);
              }}
            />
            <br></br>
            <div className="dropdown">
             <label htmlFor="GPA">GPA</label>
             {/* <Select options={options} value = {GPA} onChange={onchangeSelect} getOptionValue={(option) => option.value} 
              getOptionLabel={(option) => option.value}/> */}
            <Select options={options} onChange={onchangeSelect}/>
            <label htmlFor="fPref">First Preference</label>
            <Dropbox id="fPref" prefFromRegister={"first"} sendToRegister={functionFromDropbox}/>

            <label htmlFor="Description">Have you previously marked this course?</label>
            <div className="form-check">
            <label><input type = "radio" name = "Pmarked" checked={prevMarked==='1'} value = '1' className="form-check-input" onChange={(e)=>{setPrevMarked(e.target.value)}}/> Yes</label>
            <label><input type = "radio" name = "Pmarked" checked={prevMarked==='0'} value = '0' className="form-check-input" onChange={(e)=>{setPrevMarked(e.target.value)}}/>No</label>
            </div> 
            <label htmlFor="Description">Were you previously enrolled in this course?</label>
            <div className="form-check">
            <label><input type = "radio" name = "Penrolled1" checked={prevEnrolledFirst==='1'} value = '1' className="form-check-input" onChange={(e)=>{setprevEnrolledFirst(e.target.value)}}/> Yes</label>
            <label><input type = "radio" name = "Penrolled1" checked={prevEnrolledFirst==='0'} value = '0' className="form-check-input" onChange={(e)=>{setprevEnrolledFirst(e.target.value)}}/>No</label>
            </div>

            <label htmlFor="sPref">Second Preference</label>
            <Dropbox id="sPref" prefFromRegister={"second"} sendToRegister={functionFromDropbox}/>

            <label htmlFor="Description">Have you previously marked this course?</label>
            <div className="form-check">
            <label><input type = "radio" name = "Pmarked2" checked={prevMarkedSecond==='1'} value = '1' className="form-check-input" onChange={(e)=>{setPrevMarkedSecond(e.target.value)}}/> Yes</label>
            <label><input type = "radio" name = "Pmarked2" checked={prevMarkedSecond==='0'} value = '0' className="form-check-input" onChange={(e)=>{setPrevMarkedSecond(e.target.value)}}/>No</label>
            </div> 
            <label htmlFor="Description">Were you previously enrolled in this course?</label>
            <div className="form-check">
            <label><input type = "radio" name = "Penrolled2" checked={prevEnrolledSecond==='1'} value = '1' className="form-check-input" onChange={(e)=>{setprevEnrolledSecond(e.target.value)}}/> Yes</label>
            <label><input type = "radio" name = "Penrolled2" checked={prevEnrolledSecond==='0'} value = '0' className="form-check-input" onChange={(e)=>{setprevEnrolledSecond(e.target.value)}}/>No</label>
            </div>


            <label htmlFor="tPref">Third Preference</label>
            <Dropbox id="sPref" prefFromRegister={"third"} sendToRegister={functionFromDropbox}/>

            <label htmlFor="Description">Have you previously marked this course?</label>
            <div className="form-check">
            <label><input type = "radio" name = "Pmarked3" checked={prevMarkedThird==='1'} value = '1' className="form-check-input" onChange={(e)=>{setPrevMarkedThird(e.target.value)}}/> Yes</label>
            <label><input type = "radio" name = "Pmarked3" checked={prevMarkedThird==='0'} value = '0' className="form-check-input" onChange={(e)=>{setPrevMarkedThird(e.target.value)}}/>No</label>
            </div> 
            <label htmlFor="Description">Were you previously enrolled in this course?</label>
            <div className="form-check">
            <label><input type = "radio" name = "Penrolled3" checked={prevEnrolledthird==='1'} value = '1' className="form-check-input" onChange={(e)=>{setprevEnrolledThird(e.target.value)}}/> Yes</label>
            <label><input type = "radio" name = "Penrolled3" checked={prevEnrolledthird==='0'} value = '0' className="form-check-input" onChange={(e)=>{setprevEnrolledThird(e.target.value)}}/>No</label>
            </div>

            </div>
            <br></br>
            <label htmlFor="hours">How many hours do you want to mark?</label>
            <input type="number" id="hours" placeholder = '0' onChange={event => {
                const { value } = event.target;
                setHours(value);
              }}
            />
            <label htmlFor="Description">Do you have bullying and harrasment training?</label>
            <div className="form-check">
            <label><input type = "radio" checked={Training==='1'} value = '1' className="form-check-input" onChange={(e)=>{setTraining(e.target.value)}}/> Yes</label>
              <label><input type = "radio" checked={Training==='0'} value = '0' className="form-check-input" onChange={(e)=>{setTraining(e.target.value)}}/>No</label>
            </div>
            <label htmlFor="Description">Have you received tutor training?</label>
            <div className="form-check">
            <label><input type = "radio" name = "tutorTraining" checked={tutorTraining==='1'} value = '1' className="form-check-input" onChange={(e)=>{settutorTraining(e.target.value)}}/> Yes</label>
            <label><input type = "radio" name = "tutorTraining" checked={tutorTraining==='0'} value = '0' className="form-check-input" onChange={(e)=>{settutorTraining(e.target.value)}}/>No</label>
            </div>   
            
            {/* <label htmlFor="email">If 'Yes' for the above, which courses have you marked? </label>
            <input type="courses" id="courses" onChange={event => {
                const { value } = event.target;
                setCoursesMarked(value);
              }}
            /> */}
            <label htmlFor="Description">What is the nature of your physical availablity to mark on UoA Campus</label>
            <input type="text" id="description" style={{width: '75%', height: '100px'}} placeholder = 'Are you available on city campus?' onChange={event => {
                const { value } = event.target;
                setDescription(value);
              }}
            />
          </div>
          <br></br>
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