import React, {Component} from 'react';
import axios from "axios";
import Modal from 'react-modal'
import Course_right  from './course_right_view';
import './course.css';
import Select from 'react-select'
import Email_modal  from './email_modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '70%',
      height                : '70%'
    }
};

export default class course_empty extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            //student details
            id: this.props.dataFromParent.id,
            firstName:this.props.dataFromParent.firstName,
            lastName:this.props.dataFromParent.lastName,
            student_number:this.props.dataFromParent.student_number,
            upi:this.props.dataFromParent.upi,
            degree:this.props.dataFromParent.degree,
            year:this.props.dataFromParent.year,
            type:(this.props.dataFromParent.type)*1,
            gpa:this.props.dataFromParent.gpa,
            firstPref:this.props.dataFromParent.firstPref,
            secondPref:this.props.dataFromParent.secondPref,
            thirdPref:this.props.dataFromParent.thirdPref,
            email:this.props.dataFromParent.email, 
            course_marked: this.props.dataFromParent.course_marked,
            bh_training: (this.props.dataFromParent.bh_training)*1,
            tutor_training: (this.props.dataFromParent.tutor_training)*1,
            total_hours:this.props.dataFromParent.total_hours,
            allocated_hours: this.props.dataFromParent.allocated_hours||0,
            description:this.props.dataFromParent.description,
            mc_description:this.props.dataFromParent.mc_description,
            pdfLocation:this.props.dataFromParent.pdfLocation,

            //student's association
            assoc: this.props.dataFromAssoc,
            courses: this.props.dataFromCourses,
            students: this.props.dataFromStudents,
            all_assoc: this.props.dataFromAllAssoc,
            value: "",
            isInEditMode: false,

            //modal state
            currentModal: "",
            modal_value: "" ,
            course_selected: "", 
            student_selected: "",
            assoc_selected: [],

            //create new association
            selectOptions: [],
            assoc_course_id: "",
            valid_course_id: true, 


        }
    }

    componentDidMount = () => {
        axios.get("/api/courses/association/student/" + this.state.id).then(response =>{
            this.setState({
                assoc: response.data
            });
            console.log(this.state.assoc)
        });
    };

    componentDidUpdate(prevProps, prevState) {
        //trigger when index.js gives different student 
        if (prevState.id !== this.props.dataFromParent.id) {
            // window.open(this.state.pdfLocation);
            this.setState({
                //student details
                id: this.props.dataFromParent.id,
                firstName:this.props.dataFromParent.firstName,
                lastName:this.props.dataFromParent.lastName,
                student_number:this.props.dataFromParent.student_number,
                upi:this.props.dataFromParent.upi,
                degree:this.props.dataFromParent.degree,
                year:this.props.dataFromParent.year,
                type:(this.props.dataFromParent.type)*1,
                gpa:this.props.dataFromParent.gpa,
                firstPref:this.props.dataFromParent.firstPref,
                secondPref:this.props.dataFromParent.secondPref,
                thirdPref:this.props.dataFromParent.thirdPref,
                email:this.props.dataFromParent.email, 
                course_marked: this.props.dataFromParent.course_marked,
                bh_training: (this.props.dataFromParent.bh_training)*1,
                tutor_training: (this.props.dataFromParent.tutor_training)*1,
                total_hours:this.props.dataFromParent.total_hours,
                allocated_hours: this.props.dataFromParent.allocated_hours||0,
                description:this.props.dataFromParent.description,
                mc_description:this.props.dataFromParent.mc_description,
                pdfLocation:this.props.dataFromParent.pdfLocation,
                
                //student's association
                assoc: this.props.dataFromAssoc,
                //list of all courses
                courses: this.props.dataFromCourses,
                //list of all students
                students: this.props.dataFromStudents,
                //list of all associations
                all_assoc: this.props.dataFromAllAssoc,
                
                //always set Edit Mode to false when different student has changed
                isInEditMode: false,
                
                //modal state
                currentModal: "",
                modal_value: "" ,
                course_selected: "", 
                student_selected: "",
                assoc_selected: [],

                //create new association
                selectOptions: [],
                assoc_course_id: "",
                valid_course_id: true, 
            })
        }
    }

    updateComponentValue = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode,//
            firstName:this.refs.firstName.value,
            lastName:this.refs.lastName.value,
            student_number:this.refs.student_number.value,
            upi:this.refs.upi.value,
            degree:this.refs.degree.value,
            year:this.refs.year.value,
            type:(this.refs.type.checked)*1, //postgraduate - 0, undergraduate - 1
            gpa:this.refs.gpa.value,
            courses_marked:this.refs.courses_marked.value,
            email:this.refs.email.value, 
            bh_training: (this.refs.bh_training.checked)*1, //No - 0, Yes - 1
            tutor_training: (this.refs.tutor_training.checked)*1, //No - 0, Yes - 1
            total_hours:this.refs.total_hours.value,
            description:this.refs.description.value,
            mc_description:this.refs.mc_description.value,
        })
        var data = {
            firstName:this.refs.firstName.value,
            lastName:this.refs.lastName.value,
            student_number:this.refs.student_number.value,
            upi:this.refs.upi.value,
            degree:this.refs.degree.value,
            year:this.refs.year.value,
            type:this.refs.type.checked, //postgraduate - 0, undergraduate - 1
            gpa:this.refs.gpa.value,
            courses_marked:this.refs.courses_marked.value,
            email:this.refs.email.value, 
            bh_training: this.refs.bh_training.checked, //No - 0, Yes - 1
            tutor_training: this.refs.tutor_training.checked, //No - 0, Yes - 1
            total_hours:this.refs.total_hours.value,
            description:this.refs.description.value,
            mc_description:this.refs.mc_description.value,
        }
        
        axios.put("/api/students/update/description/"+this.props.dataFromParent.id, data)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });

        this.props.functionCallFromStudent(1); //trigger course.js to refresh student details
    }

    openCV = () => {
        if(this.state.pdfLocation!==null){
            console.log("Opening CV")
            window.open(this.state.pdfLocation);
        } else {
            console.log("Do not have CV")
        }
    }

    // update textbox
    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    renderEditView_firstName = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    defaultValue={this.state.firstName}
                    ref="firstName"
                    name="firstName"
                />
            </div>
        )
    }
    renderEditView_lastName = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    defaultValue={this.state.lastName}
                    ref="lastName"
                    name="lastName"
                />
            </div>
        )
    }
    renderEditView_student_number = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    id="student_number"
                    defaultValue={this.state.student_number}
                    ref="student_number"
                    name="student_number"
                />
            </div>
        )
    }
    renderEditView_upi = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    id="upi"
                    defaultValue={this.state.upi}
                    ref="upi"
                    name="UPI"
                    size="10"
                />
            </div>
        )
    }
    renderEditView_email = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    id="email"
                    defaultValue={this.state.email}
                    ref="email"
                    name="Email"
                    size="30"
                />
            </div>
        )
    }
    renderEditView_degree = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    id="degree"
                    defaultValue={this.state.degree}
                    ref="degree"
                    name="Degree"
                />
            </div>
        )
    }
    renderEditView_year = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    id="year"
                    defaultValue={this.state.year}
                    ref="year"
                    name="Year"
                    size="5"
                />
            </div>
        )
    }
    renderEditView_type = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input 
                    type="radio" 
                    value="0" 
                    name="type" 
                    style={{display:"inline-block" }} 
                    ref="type"
                    defaultChecked={this.state.type===0}
                />PostGraduate &nbsp;
                <input 
                    type="radio" 
                    value="1" 
                    name="type" 
                    ref="type"
                    style={{display:"inline-block"}}
                    defaultChecked={this.state.type===1}
                />UnderGraduate
            </div>
        )
    }
    renderEditView_gpa = () => {
        return (
            <div style={{display:"inline-block"}}>
                <select id="gpa" name="gpa" ref="gpa">
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="F">F</option>
                </select>
            </div>
        )
    }
    renderEditView_course_marked = () => { 
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    id="courses_marked"
                    defaultValue={this.state.courses_marked}
                    ref="courses_marked"
                    name="courses_marked"
                    size= "30"
                    
                />
            </div>
        )
    }
    renderEditView_bh_training = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input 
                    type="radio" 
                    value="0" 
                    name="bh_training" 
                    style={{display:"inline-block" }} 
                    ref="bh_training"
                    defaultChecked={this.state.bh_training===0}
                />No &nbsp;
                <input 
                    type="radio" 
                    value="1" 
                    name="bh_training" 
                    ref="bh_training"
                    style={{display:"inline-block"}}
                    defaultChecked={this.state.bh_training===1}
                />Yes
            </div>
        )
    }
    renderEditView_tutor_training = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input 
                    type="radio" 
                    value="0" 
                    name="tutor_training" 
                    style={{display:"inline-block" }} 
                    ref="tutor_training"
                    defaultChecked={this.state.tutor_training===0}
                />No &nbsp;
                <input 
                    type="radio" 
                    value="1" 
                    name="tutor_training" 
                    ref="tutor_training"
                    style={{display:"inline-block"}}
                    defaultChecked={this.state.tutor_training===1}
                />Yes
            </div>
        )
    }
    renderEditView_total_hours = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="number" 
                    min="0"
                    defaultValue = {this.state.total_hours||0}
                    style={{width:"100px"}}
                    id="total_hours"
                    ref="total_hours"
                    name="Hours Offered"
                />
            </div>
        )
    }
    renderEditView_description = () => { //notes for this student
        return (
            <div style={{width:"200px"}}>
                <input
                    type="text"
                    id="description"
                    defaultValue={this.state.description}
                    ref="description"
                    name="description"
                    size= "45"
                    
                />
            </div>
        )
    }
    renderEditView_mc_description = () => { //notes for this student
        return (
            <div style={{width:"200px"}}>
                <input
                    type="text"
                    id="mc_description"
                    defaultValue={this.state.mc_description}
                    ref="mc_description"
                    name="mc_description"
                    size= "45"
                    
                />
            </div>
        )
    }
    renderEditView_buttons = () => {
        if (this.state.isInEditMode === true){
            return (
                <div style={{display:"inline-block", width:"400px"}}>
                    <button onClick={this.changeEditMode}>cancel</button>
                    <button onClick={this.updateComponentValue}>update</button>
                </div>
            )
        }
    }

    renderDefaultView_firstName = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.firstName}]
        </div>
    }
    renderDefaultView_lastName = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.lastName}]
        </div>
    }
    renderDefaultView_student_number = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.student_number}]
        </div>
    }
    renderDefaultView_upi = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.upi}]
        </div>
    }
    renderDefaultView_email = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.email}]
        </div>
    }
    renderDefaultView_send_email = () => {
        return <div style={{display:"inline-block"}}>
            &nbsp; <button onClick={ () => this.SetModalIsOpen("email", "")}>Send Email</button>
        </div>
    }
    renderDefaultView_degree = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.degree}]
        </div>
    }
    renderDefaultView_year = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.year}]
        </div>
    }
    renderDefaultView_type = () => {
        if (this.state.type === 0){
            return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
                [PostGraduate]
            </div>
        } else {
            return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
                [UnderGraduate]
            </div>
        }
    }
    renderDefaultView_gpa = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.gpa}]
        </div>
    }
    renderDefaultView_courses_marked = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.courses_marked}]
        </div>
    }
    renderDefaultView_bh_training = () => {
        if (this.state.bh_training === 1){
            return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
                [Yes]
            </div>
        } else {
            return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
                [No]
            </div>
        }
    }
    renderDefaultView_tutor_training = () => {
        if (this.state.tutor_training === 1){
            return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
                [Yes]
            </div>
        } else {
            return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
                [No]
            </div>
        }
    }
    renderDefaultView_CV = () => {
        if (this.state.pdfLocation !== null){
            return <div onClick={this.openCV} style={{textDecoration: "underline", cursor : "pointer", display:"inline-block"}}>
                View
            </div>
        } else {
            return <div style={{display:"inline-block"}}>
                NA
            </div>
        }
        
    }                      
    renderDefaultView_total_hours = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.total_hours||0}]
        </div>
    }
    renderDefaultView_allocated_hours = () => {
        var hours = 0;
        for (const assoc_index in this.state.assoc){
            hours += (this.state.assoc[assoc_index].marking_hours||0)
        }

        var deficit_hours = this.state.total_hours - hours;
        
        if (this.state.allocated_hours != hours){
            this.setState({
                allocated_hours: hours
            })

            var data = {
                allocated_hours: hours,
            }
            
            axios.put("/api/students/update/description/"+this.props.dataFromParent.id, data)
                .then(response => {
                  console.log(response.data);
                })
                .catch(e => {
                  console.log(e);
                });
    
            this.props.functionCallFromStudent(1); //trigger course.js to refresh student details
        }

        return(
            <div className="allcHours">
                <h6 style={{fontWeight:"bold", color:"green"}}>
                    Total Hours Allocated: {hours}
                </h6>
                <h6 style={{fontWeight:"bold", color:"#b02117"}}>
                    Total Hours Defecit: {deficit_hours}
                </h6>
            </div>
        );
    }
    renderDefaultView_description = () => {
        return <div onDoubleClick={this.changeEditMode} style={{width:"200px"}}>
            [{this.state.description}]
        </div>
    }
    renderDefaultView_mc_description = () => {
        return <div onDoubleClick={this.changeEditMode} style={{width:"200px"}}>
            [{this.state.mc_description}]
        </div>
    }

    //status of an association 
    render_association_status = (marking_hours, burkhard_proposed, course_proposed, student_proposed, course_blacklist, burkhard_blacklist) => {
        if (marking_hours){
            return <div >
                    <span title="This student is allocated to this course">Allocated</span>
                </div>
        } else if ((course_blacklist||burkhard_blacklist)){
            if (burkhard_blacklist&&course_blacklist){
                return <div >
                    <span title="This student is blacklisted by Marker Coordinator">(MC blacklist)</span>
                    <span title="This student is blacklisted by Course Coordinator">(CC blacklist)</span>
                </div>
            } else if (burkhard_blacklist){
                return <div >
                    <span title="This student is blacklisted by Marker Coordinator">(MC blacklist)</span>
                </div>
            } else {
                return <div >
                    <span title="This student is blacklisted by Course Coordinator">(CC blacklist)</span>
                </div>
            }
        } else if ((burkhard_proposed||course_proposed)){
            if (burkhard_proposed!=0 && course_proposed!=0){
                return <div >
                    <span title={"Marker Coordinator requested " + burkhard_proposed + " hours"}>(MC requested)</span>
                    <span title={"Course Coordinator requested " + course_proposed + " hours"}>(CC requested)</span>
                </div>
            } else if (course_proposed){
                return <div >
                    <span title={"Course Coordinator requested " + course_proposed + " hours"}>(CC requested)</span>
                </div>
            } else {
                return <div >
                    <span title={"Marker Coordinator requested " + burkhard_proposed + " hours"}>(MC requested)</span>
                </div>
            }
        } else {
            return <div >
                <span title="Please Assign this Student">Unallocated</span>
            </div>
        }
        
    }

    //modal function 
    setMessage = () => {
        var message = "\n Allocated hours \n"
        for (const assoc_index in this.state.assoc){
            var assoc = this.state.assoc[assoc_index] 
            
            if (this.state.assoc[assoc_index].marking_hours!==0){
                var assoc_course = ""
                for (const course_index in this.state.courses){
                    if (this.state.courses[course_index].id===assoc.course_id){
                        assoc_course = this.state.courses[course_index].Course_name
                        break;
                    }
                }
                message += assoc_course + " - " + this.state.assoc[assoc_index].marking_hours + " hours \n"
            }
        }  
        return message
    }

    SetModalIsOpen = (identifier, value) => {
        if (identifier === "course"){
            this.setState({
                currentModal: identifier,
                modal_value: value,
            })
        } else if (identifier === "assign"){
            var assoc_course = this.state.courses.find(function(course, index) { //warning in console
                if(course.id === value.course_id){
                    return true;
                }
            })
            var assoc_student = this.state.students.find(function(student, index) { //warning in console
                if(student.id === value.student_id){
                    return true;
                }
            })
            this.setState({
                currentModal: identifier,
                modal_value: value,
                course_selected: assoc_course.Course_name,
                student_selected: assoc_student.firstName + " " + assoc_student.lastName,
                assoc_selected: value
            })
        } else if (identifier === "new"){
            const options = this.state.courses.map(d => ({
                "value" : d.id,
                "label" : d.Course_name
          
            }))
            
            this.setState({
                currentModal: identifier,
                selectOptions: options
            })
        } else if (identifier === "email"){
            this.setState({
                currentModal: identifier
            })
        }else {
            console.log("error in SetModalIsOpen")
        }
    }

    handleModalCloseRequest = () => {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({
            ...this.state,
            //modal state
            currentModal: "",
            modal_value: "" ,
            course_selected: "", 
            student_selected: "",
            assoc_selected: [],

            //create new association
            selectOptions: [],
            assoc_course_id: "",
            valid_course_id: true, 
        });
    }

    toggleModal = key => event => {
        event.preventDefault();
        if (this.state.currentModal) {
          this.handleModalCloseRequest();
          return;
        }
    
        this.setState({
          ...this.state,
          currentModal: key,
        });
    }

    udpate_assign = () => {   
        var data = {
            burkhard_proposed:this.refs.burkhard_proposed.value ||0,
            course_proposed:this.refs.course_proposed.value||0,
            marking_hours:this.refs.marking_hours.value||0,
            
            //No - 0, Yes - 1, it automatically changes to No if allocated has assigned
            burkhard_blacklist: this.refs.burkhard_blacklist.checked&&((this.refs.marking_hours.value||0)==="0"||(this.refs.marking_hours.value||0)===0), 
            previously_enrolled: (this.refs.previously_enrolled.checked)*1, //No - 0, Yes - 1
            previously_marked: (this.refs.previously_marked.checked)*1, //No - 0, Yes - 1
        }

        axios.put("/api/courses/association/update/"+this.state.assoc_selected.id, data)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        
        axios.get("/api/courses/association/student/"+this.state.id)
            .then(response => {
                this.setState({
                    assoc: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });

        this.props.functionCallFromStudent(1); //trigger course.js to refresh student details
        
        if (this.state.currentModal) {
            this.handleModalCloseRequest();
            return;
        }
    }

    handle_course(e){
        var valid_course = true
        for (const assoc_index in this.state.assoc){
            if (this.state.assoc[assoc_index].course_id===e.value){
                valid_course = false
                break;
            }
        } 
        if (valid_course === true){
            this.setState({
                valid_course_id:true,
                assoc_course_id:e.value
            })
        } else {
            this.setState({
                valid_course_id:false,
                assoc_course_id:e.value
            })
        }
        
    }

    create_assign = () => {
        if (this.state.valid_course_id === true && this.state.assoc_course_id!=""){ //check if it has valid course and selected a course
            var data = {
                student_id:this.state.id,
                course_id: this.state.assoc_course_id,
                burkhard_proposed:this.refs.burkhard_proposed.value ||0,
                course_proposed:this.refs.course_proposed.value||0,
                student_proposed: 0, 
                marking_hours:this.refs.marking_hours.value||0,
                course_blacklist: 0,
                //No - 0, Yes - 1, it automatically changes to No if allocated has assigned
                burkhard_blacklist: this.refs.burkhard_blacklist.checked&&((this.refs.marking_hours.value||0)==="0"||(this.refs.marking_hours.value||0)===0), 
                previously_enrolled: (this.refs.previously_enrolled.checked)*1, //No - 0, Yes - 1
                previously_marked: (this.refs.previously_marked.checked)*1, //No - 0, Yes - 1
            }
            console.log(data.student_id, data.course_id)
          
            axios.post("/api/Courses/association/create", data)
                .then(response => {
                  this.setState({
                    assoc_course_id: "",
                    valid_course_id: true, 
                  });
                  console.log(response.data)
                })
                .catch(e => {
                  console.log(e);
                });
            
            axios.get("/api/courses/association/student/"+this.state.id)
                .then(response => {
                    this.setState({
                        assoc: response.data
                    });
                })
                .catch(e => {
                    console.log(e);
                });

            this.props.functionCallFromStudent(1); //trigger course.js to refresh student details
            
            if (this.state.currentModal) {
                this.handleModalCloseRequest();
                return;
            }
        } else {
            console.log("Unable to create class because course existed for this student or did not choose course")
        }
        
    }

    
    render() {
        return (
            <React.Fragment>
                
                <div className="box" style={{padding: '5px', width:"750px"}}>
                    <div className="panelTitle" style={{backgroundColor : '#FFB6A4', marginBottom: '10px'}}>
                        <h1 className="cRightTitle">
                            {this.state.isInEditMode ? this.renderEditView_firstName(): this.renderDefaultView_firstName()}
                            {this.state.isInEditMode ? this.renderEditView_lastName(): this.renderDefaultView_lastName()}
                        </h1>
                    </div>
                    <div className="courseData" style={{backgroundColor :'#E67B8A', marginBottom: '10px'}}>
                        <h6>
                            Student Number: {this.state.isInEditMode ? this.renderEditView_student_number(): this.renderDefaultView_student_number()}
                        </h6>
                        <h6>
                            UPI: {this.state.isInEditMode ? this.renderEditView_upi(): this.renderDefaultView_upi()}
                        </h6>
                        <h6>
                            Email: {this.state.isInEditMode ? this.renderEditView_email(): this.renderDefaultView_email()}
                            {this.state.isInEditMode ? "": this.renderDefaultView_send_email()}
                        </h6>
                        <Modal isOpen={this.state.currentModal==="email"} onRequestClose={this.handleModalCloseRequest} style={customStyles}>
                            <div>
                                <button onClick={this.handleModalCloseRequest}>X</button>
                                <Email_modal dataFromSubject="Message From Marker Coordinator" dataFromParent={this.state.email} dataFromMessage={this.setMessage()}/>
                            </div>
                        </Modal>  
                        <h6>
                            Degree: {this.state.isInEditMode ? this.renderEditView_degree(): this.renderDefaultView_degree()}
                        </h6>
                        <h6>
                            Year: {this.state.isInEditMode ? this.renderEditView_year(): this.renderDefaultView_year()}
                        </h6>
                        <h6>
                            Type: {this.state.isInEditMode ? this.renderEditView_type(): this.renderDefaultView_type()}
                        </h6>
                        <h6>
                            GPA: {this.state.isInEditMode ? this.renderEditView_gpa(): this.renderDefaultView_gpa()}
                        </h6>
                        <h6>
                            Course marked: {this.state.isInEditMode ? this.renderEditView_course_marked(): this.renderDefaultView_courses_marked()}
                        </h6>
                        <h6>
                            Bullying and harassment training: {this.state.isInEditMode ? this.renderEditView_bh_training(): this.renderDefaultView_bh_training()}
                        </h6>
                        <h6>
                            Tutor training: {this.state.isInEditMode ? this.renderEditView_tutor_training(): this.renderDefaultView_tutor_training()}
                        </h6>
                        <h6>
                            CV: {this.renderDefaultView_CV()}
                        </h6>
                        <h6>
                            Hours Offered: {this.state.isInEditMode ? this.renderEditView_total_hours(): this.renderDefaultView_total_hours()}
                        </h6>
                        {this.renderDefaultView_allocated_hours()}
                        <h6>
                            Notes from Student: {this.state.isInEditMode ? this.renderEditView_description() : this.renderDefaultView_description()}
                        </h6>
                        <h6>
                            Notes for this Student: {this.state.isInEditMode ? this.renderEditView_mc_description(): this.renderDefaultView_mc_description()}
                        </h6>
                        <h6>
                            {this.renderEditView_buttons()}
                        </h6>
                    </div>
                    <div className="associationData" style={{backgroundColor : '#DA70D6'}}>
                        <h6>
                            Preferred / Preliminary Classes:
                        </h6>
                        <table> 
                            <tbody>
                                <tr>
                                    <th>Course</th>
                                    <th>PE</th>
                                    <th>PM</th>
                                    <th>AMH</th>
                                    <th>Status</th>
                                </tr>
                                {this.state.assoc.map((filtered_assoc)=>
                                    <tr key={filtered_assoc.id}>
                                            {this.state.courses.filter(course => filtered_assoc.course_id === course.id).map((filtered_course)=>
                                                <td key={filtered_course.id}>
                                                    <button onClick={ () => this.SetModalIsOpen("course", filtered_course)}>
                                                        {filtered_course.Course_name||"NA"}
                                                    </button> 
                                                </td> 
                                            )}
                                            <td>{filtered_assoc.previously_enrolled? "Yes":"No"}</td>
                                            <td>{filtered_assoc.previously_marked? "Yes":"No"}</td>
                                            <td>{filtered_assoc.marking_hours||0}</td>
                                            <td>{this.render_association_status(
                                                filtered_assoc.marking_hours,
                                                filtered_assoc.burkhard_proposed, 
                                                filtered_assoc.course_proposed, 
                                                filtered_assoc.student_proposed, 
                                                filtered_assoc.course_blacklist,
                                                filtered_assoc.burkhard_blacklist,
                                                )}
                                            </td>
                                            <td>
                                                <button onClick={() => this.SetModalIsOpen("assign", filtered_assoc)}>
                                                    assign
                                                </button>     
                                            </td>
                                    </tr>
                                    
                                )}
                            </tbody>
                        </table> 
                        <Modal isOpen={this.state.currentModal==="course"} onRequestClose={this.handleModalCloseRequest} style={customStyles}>
                            <div>
                                <button onClick={this.handleModalCloseRequest}>X</button>
                                    <Course_right dataFromParent={this.state.modal_value} 
                                                    dataFromCourses={this.state.courses} 
                                                    dataFromStudents={this.state.students}
                                    />
                            </div>
                        </Modal>
                        <Modal isOpen={this.state.currentModal==="assign"} onRequestClose={this.handleModalCloseRequest} style={customStyles}>
                            <div>
                                <button onClick={this.handleModalCloseRequest}>X</button>
                                <div className="panelTitle" style={{backgroundColor : '#FFB6A4', marginBottom: '10px'}}>
                                    <h1 className="cRightTitle">
                                        {this.state.student_selected} - {this.state.course_selected}
                                    </h1>
                                </div>
                                <div className="courseData" style={{backgroundColor :'#E67B8A', marginBottom: '10px'}}>
                                    <h6>
                                        Previously Enrolled? &nbsp;
                                        <div style={{display:"inline-block"}}>
                                            <input 
                                                type="radio" 
                                                value="0" 
                                                name="previously_enrolled" 
                                                style={{display:"inline-block" }} 
                                                ref="previously_enrolled"
                                                defaultChecked={this.state.assoc_selected.previously_enrolled===0}
                                            />No &nbsp;
                                            <input 
                                                type="radio" 
                                                value="1" 
                                                name="previously_enrolled" 
                                                ref="previously_enrolled"
                                                style={{display:"inline-block"}}
                                                defaultChecked={this.state.assoc_selected.previously_enrolled===1}
                                            />Yes
                                        </div>
                                    </h6>
                                    <h6>
                                        Previously Marked? &nbsp;
                                        <div style={{display:"inline-block"}}>
                                            <input 
                                                type="radio" 
                                                value="0" 
                                                name="previously_marked" 
                                                style={{display:"inline-block" }} 
                                                ref="previously_marked"
                                                defaultChecked={this.state.assoc_selected.previously_marked===0}
                                            />No &nbsp;
                                            <input 
                                                type="radio" 
                                                value="1" 
                                                name="previously_marked" 
                                                ref="previously_marked"
                                                style={{display:"inline-block"}}
                                                defaultChecked={this.state.assoc_selected.previously_marked===1}
                                            />Yes
                                        </div>
                                    </h6>
                                    <h6>
                                        Marker Coordinator Proposes: 
                                        <div style={{display:"inline-block"}}>
                                            <input
                                                type="number" 
                                                min="0"
                                                defaultValue = {this.state.assoc_selected.burkhard_proposed||0}
                                                style={{width:"75px"}}
                                                id="burkhard_proposed"
                                                ref="burkhard_proposed"
                                                name="burkhard_proposed"
                                            />
                                        </div>
                                    </h6>
                                    <h6>
                                        Course Coordinator Proposes:
                                        <div style={{display:"inline-block"}}>
                                            <input
                                                type="number" 
                                                min="0"
                                                defaultValue = {this.state.assoc_selected.course_proposed||0}
                                                style={{width:"75px"}}
                                                id="course_proposed"
                                                ref="course_proposed"
                                                name="course_proposed"
                                            />
                                        </div>
                                    </h6>
                                    <h6>
                                        Allocate Marking Hours:
                                        <div style={{display:"inline-block"}}>
                                            <input
                                                type="number" 
                                                min="0"
                                                defaultValue = {this.state.assoc_selected.marking_hours||0}
                                                style={{width:"75px"}}
                                                id="marking_hours"
                                                ref="marking_hours"
                                                name="marking_hours"
                                            />
                                        </div>
                                    </h6>
                                    <h6>
                                        Blacklist this student?: &nbsp;
                                        <div style={{display:"inline-block"}}>
                                            <input 
                                                type="radio" 
                                                value="0" 
                                                name="burkhard_blacklist" 
                                                style={{display:"inline-block" }} 
                                                ref="burkhard_blacklist"
                                                defaultChecked={this.state.assoc_selected.burkhard_blacklist===0||this.state.assoc_selected.burkhard_blacklist===null}
                                            />No &nbsp;
                                            <input 
                                                type="radio" 
                                                value="1" 
                                                name="burkhard_blacklist" 
                                                ref="burkhard_blacklist"
                                                style={{display:"inline-block"}}
                                                defaultChecked={this.state.assoc_selected.burkhard_blacklist===1}
                                            />Yes
                                    </div>
                                    </h6>
                                    <div>
                                        <button onClick={this.udpate_assign}>update</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <h6>
                            PE = Previously Enrolled
                        </h6>
                        <h6>
                            PM = Previously Marked
                        </h6>
                        <h6>
                            AMH = Allocated Marking Hours for this course
                        </h6>
                    </div>
                </div>
                <button onClick={ () => this.SetModalIsOpen("new", "")} style={{height: "80px", width:"750px"}}>Assign/ Recommend to new class</button>
                <Modal isOpen={this.state.currentModal==="new"} onRequestClose={this.handleModalCloseRequest} style={customStyles}>
                    <div>
                        <button onClick={this.handleModalCloseRequest}>X</button>
                        <div className="courseData" style={{backgroundColor :'#FFB6A4', marginBottom: '10px'}}>
                            <h6>Course</h6>
                            <Select 
                                options={this.state.selectOptions}
                                onChange={this.handle_course.bind(this)}
                            />
                            <h6 style={{color: "red"}}>
                                {(this.state.assoc_course_id==="") ? "Please choose a course" : ""}
                                {this.state.valid_course_id ? "" : "Course existed for this student!"}
                            </h6>
                            <h6>
                                Previously Enrolled? &nbsp;
                                <div style={{display:"inline-block"}}>
                                    <input 
                                        type="radio" 
                                        value="0" 
                                        name="previously_enrolled" 
                                        style={{display:"inline-block" }} 
                                        ref="previously_enrolled"
                                        defaultChecked
                                    />No &nbsp;
                                    <input 
                                        type="radio" 
                                        value="1" 
                                        name="previously_enrolled" 
                                        ref="previously_enrolled"
                                        style={{display:"inline-block"}}
                                    />Yes
                                </div>
                            </h6>
                            <h6>
                                Previously Marked? &nbsp;
                                <div style={{display:"inline-block"}}>
                                    <input 
                                        type="radio" 
                                        value="0" 
                                        name="previously_marked" 
                                        style={{display:"inline-block" }} 
                                        ref="previously_marked"
                                        defaultChecked
                                    />No &nbsp;
                                    <input 
                                        type="radio" 
                                        value="1" 
                                        name="previously_marked" 
                                        ref="previously_marked"
                                        style={{display:"inline-block"}}
                                    />Yes
                                </div>
                            </h6>
                            <h6>
                                Marker Coordinator Proposes: 
                                <div style={{display:"inline-block"}}>
                                    <input
                                         type="number" 
                                         min="0"
                                         defaultValue = {0}
                                         style={{width:"75px"}}
                                         id="burkhard_proposed"
                                         ref="burkhard_proposed"
                                         name="burkhard_proposed"
                                    />
                                </div>
                            </h6>
                            <h6>
                                Course Coordinator Proposes:
                                <div style={{display:"inline-block"}}>
                                    <input
                                        type="number" 
                                        min="0"
                                        defaultValue = {0}
                                        style={{width:"75px"}}
                                        id="course_proposed"
                                        ref="course_proposed"
                                        name="course_proposed"
                                    />
                                </div>
                            </h6>
                            <h6>
                                Allocate Marking Hours:
                                <div style={{display:"inline-block"}}>
                                    <input
                                        type="number" 
                                        min="0"
                                        defaultValue = {0}
                                        style={{width:"75px"}}
                                        id="marking_hours"
                                        ref="marking_hours"
                                        name="marking_hours"
                                    />
                                </div>
                            </h6>
                            <h6>
                                Blacklist this student from the course? &nbsp;
                                <div style={{display:"inline-block"}}>
                                    <input 
                                        type="radio" 
                                        value="0" 
                                        name="burkhard_blacklist" 
                                        style={{display:"inline-block" }} 
                                        ref="burkhard_blacklist"
                                        defaultChecked
                                    />No &nbsp;
                                    <input 
                                        type="radio" 
                                        value="1" 
                                        name="burkhard_blacklist" 
                                        ref="burkhard_blacklist"
                                        style={{display:"inline-block"}}
                                    />Yes
                                </div>
                            </h6>
                        </div>   
                        <div>
                            <button onClick={this.create_assign}>Create</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
            
        )
    }
    
}