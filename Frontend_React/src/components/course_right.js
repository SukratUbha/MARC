import React, {Component} from 'react';
import axios from "axios";
import Modal from 'react-modal'
import './course.css';
import Course_student  from './course_student_view';
import Email_modal  from './email_modal';
import Select from 'react-select'
      
//Need to now fetch user of course cordinator Id
//Need to fetch each filtered student
//The add student options, should it provide a list of students who have any proposed flag
//should clicking on the student's name redirect them to their student profile?
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

export default class Course extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.dataFromParent.id,
            Course_name: this.props.dataFromParent.Course_name,
            CC: this.props.dataFromParent.CC,
            CC_email: this.props.dataFromParent.CC_email,
            Year: this.props.dataFromParent.Year,
            Deadline: this.props.dataFromParent.Deadline,
            Hours: this.props.dataFromParent.Hours,
            Total_student: this.props.dataFromParent.Total_student,
            comment_CC: this.props.dataFromParent.comment_CC,
            comment_MC: this.props.dataFromParent.comment_MC,

                    
            CCUser: [],
            Student: [],
            allocationData: [],

            //course's association
            assoc: [],
            //list of all courses
            courses: this.props.dataFromCourses,
            //list of all students
            students: this.props.dataFromStudents,
            //list of all associations
            all_assoc: this.props.dataFromAllAssoc,

            //always set Edit Mode to false when different student has changed
            isInEditMode: false,

            //function for marker assignments
            assoc_student: "",

            //modal state
            currentModal: "",
            modal_value: "" ,
            course_selected: "", 
            student_selected: "",
            assoc_selected: [],

            //create assign
            selectOptions: [],
            assoc_student_id: "",
            valid_student_id: true, 
        }
    }

    componentDidMount = () => {
        axios.get("/api/courses/association/course/" + this.state.id).then(response =>{
            this.setState({
                assoc: response.data
            });
        });
    };

    componentDidUpdate(prevProps, prevState) {
        //trigger when index.js gives different courses 
        if (prevState.id !== this.props.dataFromParent.id) {
            this.setState({
                //course details
                id: this.props.dataFromParent.id,
                Course_name: this.props.dataFromParent.Course_name,
                CC: this.props.dataFromParent.CC,
                CC_email: this.props.dataFromParent.CC_email,
                Year: this.props.dataFromParent.Year,
                Deadline: this.props.dataFromParent.Deadline,
                Hours: this.props.dataFromParent.Hours,
                Total_student: this.props.dataFromParent.Total_student,
                comment_CC: this.props.dataFromParent.comment_CC,
                comment_MC: this.props.dataFromParent.comment_MC,
                
                //course's association
                assoc: this.props.dataFromAssoc,
                //list of all courses
                courses: this.props.dataFromCourses,
                //list of all students
                students: this.props.dataFromStudents,
                //list of all associations
                all_assoc: this.props.dataFromAllAssoc,
                
                //always set Edit Mode to false when different student has changed
                isInEditMode: false,

                //function for marker assignments
                assoc_student: "",

                //modal state
                currentModal: "",
                modal_value: "" ,
                course_selected: "", 
                student_selected: "",
                assoc_selected: [],

                //create assign
                selectOptions: [],
                assoc_student_id: "",
                valid_student_id: true, 
                
            })
        }
    }
    //reload
    reloadData(){
        //in progress
        //its possible react always does this already.
    }


    //Panel header
    

    //Render course data components
    loadCoordinator(){
        //handle request
        return(
            <div className="coordinatorTab">
                    <h5>
                        Course Coordinator:
                    </h5>
                    <div>
                        {(this.state.CCUser || {}).firstName} {(this.state.CCUser || {}).lastName}
                    </div>
                    <div className="emailCC" style={{display: 'inline-flex'}}>
                        <div>
                            Fetch From User table (no field yet)
                        </div>
                        <div style={{float : 'right'}}>
                            <button onclick={this.sendCCEmail()}>send email</button>
                        </div>
                    </div>
                    <div>
                        <h6 onClick="resetPassword" style={{cursor : "pointer"}}>
                            (reset password)
                        </h6>
                    </div>
                </div>
        );
    }

    getCoordinatorDetails() {
        this.setState({
            CCUser: {
                firstName: "Need",
                lastName: "Route",
                },
        });
        /*
        axios.get("/api/user/details").then(response =>{
            this.setState({
                CCUser: response.data
            });
        });
        */
    }
    
    loadCourseDeadline(){
        return(
            <div className="courseDeadline">
                <div>
                    Enrolment Deadline:{(this.props.dataFromParent || {}).Deadline}
                    {this.isDeadlinePassed()}
                </div>
            </div>
        );
    }

    loadCourseHours(){
        return(
            <div className="courseHours">
                <div style={{display: "inline-flex"}}>
                    Student Hours required:
                    <input 
                    style={{height: '25px', width: '50px', border: '0px solid', backgroundColor: 'transparent', color: 'black'}}
                    id = "totalHours" 
                    placeholder={this.getTotalHours()} //temporary
                    disabled='true'
                    />
                    <button onClick={this.overrideReqHours("totalHours")} style={{float: 'right', height: '25px'}}>
                        override
                    </button>
                    <button type="submit" id="submitReqHours" style={{display: 'none'}} onClick={this.submitReqHours()}>Confirm</button>
                    <button type="submit" id="cancelReqHours" style={{display: 'none'}} onClick={this.cancelReqHours()}>X</button> 

                </div>
            </div>
        );
    }

    

    
    
    //Course data functionalities

    sendCCEmail(){
        //in progress
    }
    
    resetPassword() {
        //complete reset password action
        //have marker be able to type in a new password?
        //or send email with temporary password?
    }

    reAssignHours (elementID) {
        //in progress,
    }

    overrideReqHours(elementId) {
        //var element = document.getElementById(idString);        
        //change the element to be an input field. 
        //have a cancel, and a use computed hours button.
        //axios post.
        //var element = document.getElementById(elementId);
        //element.contentEditable( element.contentEditable === false ? true : false )
        //change the button to say confirm
        //include an x to cancel?
    }

    submitReqHours(elementId) {
        //in progress, have this triggered by enter or confirm
        //axios post
    }

    cancelReqHours(elementId) {
        //in progress, have this triggered by esc or x
    }

    editComment(elementID) {
        //in progress,
    }

    submitComment(elementID) {
        //this will allow for the submitted
        //Needs to check if its the CC or Admin comment
    }
    
    addMarker(){
        //in progress
        //confused, is there a modal
        //trigger reload function
        this.reloadData();
    }

    deleteMarker(studentID){
        //in progress
        this.reloadData();
    }

    changeMarkerHours() {
        //in progress
        this.reloadData();
    }

   
    isHoursComputed() {
        //Placeholder for database total hours, not in backend yet
        const computedHours = ((this.props.dataFromParent || {}).Hours  
            * (this.props.dataFromParent || {}).Total_student);
        
        if (computedHours === (this.props.dataFromParent || {}).Total_hours) {
                return (<p className="computed">(computed)</p>);   
            }
        return {}; //update to false later
    }

    isDeadlinePassed() {
        // //do i need some date calculation?
        // //Used by SO https://stackoverflow.com/questions/11309730/compare-sql-date-to-javascript-date
        // var sqlDateStr = (this.props.dataFromParent || {}).Deadline; // as for MySQL DATETIME
        // sqlDateStr = sqlDateStr.replace(/:| /g,"-");
        // var YMDhms = sqlDateStr.split("-");
        // var deadlineDate = new Date();
        // deadlineDate.setFullYear(parseInt(YMDhms[0]), parseInt(YMDhms[1])-1,
        //                                          parseInt(YMDhms[2]));
        // /*                                         
        // deadlineDate.setHours(parseInt(YMDhms[3]), parseInt(YMDhms[4]), 
        //                                       parseInt(YMDhms[5]), 0msValue);
        // also comment out 0msValue*/
        
        // const today = new Date();
        // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        // return ((deadlineDate <= date) ? <>(late)</> : <></>);
    }

    // update textbox
    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    updateComponentValue = () => {
        var deadline = null
        if (this.refs.Deadline.value !== ""){
            deadline = this.refs.Deadline.value+":00.000Z"
        }
        this.setState({
            isInEditMode: !this.state.isInEditMode,//
            Course_name:this.refs.Course_name.value,
            CC:this.refs.CC.value,
            CC_email:this.refs.CC_email.value,
            Year:this.refs.Year.value||1,
            Deadline:deadline,
            Hours:this.refs.Hours.value||0,
            Total_student:this.refs.Total_student.value||0,
            comment_CC:this.refs.comment_CC.value,
            comment_MC:this.refs.comment_MC.value,
        })
        var data = {
            Course_name:this.refs.Course_name.value,
            CC:this.refs.CC.value,
            CC_email:this.refs.CC_email.value,
            Year:this.refs.Year.value||1,
            Deadline: deadline,
            Hours:this.refs.Hours.value||0,
            Total_student:this.refs.Total_student.value||0,
            comment_CC:this.refs.comment_CC.value,
            comment_MC:this.refs.comment_MC.value,
        }

        axios.put("/api/courses/update/"+this.state.id, data)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });

        this.props.functionCallFromCourse(1); //trigger course.js to refresh student details
    }

    renderEditView_CourseName = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    className="form-control"
                    id="Course_name"
                    defaultValue={this.state.Course_name}
                    ref="Course_name"
                    name="Course_name"
                />
            </div>
        )
    }
    renderEditView_CC = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    id="CC"
                    defaultValue={this.state.CC}
                    ref="CC"
                    name="Course Coordinator"
                />
            </div>
        )
    }
    renderEditView_CC_email = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="text"
                    id="CC_email"
                    defaultValue={this.state.CC_email}
                    ref="CC_email"
                    name="CC_email"
                    size="30"
                />
            </div>
        )
    }
    renderEditView_Year = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="number" 
                    min="1"
                    defaultValue = {this.state.Year}
                    style={{width:"75px"}}
                    id="Year"
                    ref="Year"
                    name="Year"
                />
            </div>
        )
    }
    renderEditView_Deadline = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="datetime-local" 
                    id="Deadline"
                    ref="Deadline"
                    name="Deadline"
                />
            </div>
            
        )
    }
    renderEditView_Hours = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="number" 
                    min="0"
                    defaultValue = {this.state.Hours}
                    style={{width:"75px"}}
                    id="Hours"
                    ref="Hours"
                    name="Hours"
                />
            </div>
        )
    }
    renderEditView_Total_student = () => {
        return (
            <div style={{display:"inline-block"}}>
                <input
                    type="number" 
                    min="0"
                    defaultValue = {this.state.Total_student}
                    style={{width:"100px"}}
                    id="Total_student"
                    ref="Total_student"
                    name="Total_student"
                />
            </div>
        )
    }
    renderEditView_comment_CC = () => {
        return (
            <div>
                <input
                    type="text"
                    id="comment_CC"
                    defaultValue={this.state.comment_CC}
                    ref="comment_CC"
                    name="comment_CC"
                    size= "45"
                />
            </div>
        )
    }
    renderEditView_comment_MC = () => {
        return (
            <div>
                <input
                    type="text"
                    id="comment_MC"
                    defaultValue={this.state.comment_MC}
                    ref="comment_MC"
                    name="comment_MC"
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

    renderDefaultView_CourseName = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.Course_name}] &nbsp;
        </div>
    }
    renderDefaultView_CC = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.CC}]
        </div>
    }
    renderDefaultView_CC_email = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.CC_email}]
        </div>
    }
    renderDefaultView_send_email = () => {
        return <div style={{display:"inline-block"}}>
            &nbsp; <button onClick={ () => this.SetModalIsOpen("email", "")}>Send Email</button>
        </div>
    }
    renderDefaultView_Year = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.Year}]
        </div>
    }
    renderDefaultView_Deadline = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.Deadline}]
        </div>
    }
    renderDefaultView_Hours = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.Hours}]
        </div>
    }
    renderDefaultView_Total_student = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.Total_student}]
        </div>
    }
    renderDefaultView_Hours_table(){
        var hours = 0;
        for (const assoc_index in this.state.assoc){
            hours += (this.state.assoc[assoc_index].marking_hours||0)
        }

        var deficit_hours = this.state.Total_student*this.state.Hours - hours;

        return(
            <div className="allcHours">
                <h6 style={{fontWeight:"bold",color:"green"}}>
                    Marking Hours Allocated: {hours}
                </h6>
                <h6 style={{fontWeight:"bold",color:"#b02117"}}>
                    Marking Hours Defecit: {deficit_hours}
                </h6>
                <h6 style={{fontWeight:"bold",color:"#9521d9"}}>
                    Student Hours Required: {this.getTotalHours()}
                </h6>
            </div>
        );
    }
    renderDefaultView_comment_CC = () => {
        return <div onDoubleClick={this.changeEditMode}>
            [{this.state.comment_CC}]
        </div>
    }
    renderDefaultView_comment_MC = () => {
        return <div onDoubleClick={this.changeEditMode}>
            [{this.state.comment_MC}]
        </div>
    }

    getTotalHours() {
        return( this.state.Total_student * this.state.Hours
        );
    }

    loadModuleTitle() {
        //Have calculation based on how much has been assigned in table
        var hours = 0;
        for (const assoc_index in this.state.assoc){
            hours += (this.state.assoc[assoc_index].marking_hours||0)
        }

        var deficit_hours = this.state.Total_student*this.state.Hours - hours;
        return(
            <div style={{display:"inline-block"}}>
                <h1 style={{color:"green", display:"inline-block"}}>{hours}</h1>
                (<h1 style={{color:"#b02117", display:"inline-block"}}>{deficit_hours}</h1>)/
                <h1 style={{color:"#9521d9", display:"inline-block"}}>{this.getTotalHours()}</h1>
            </div>
        );
    }

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
        var message = "\n"+this.state.Course_name + "\n"
        var proposed_students = 0
        var allocated_students = 0
        var blacklisted_students = 0
        var unallocated_students = 0
        for (const assoc_index in this.state.assoc){
            if (this.state.assoc[assoc_index].marking_hours){
                allocated_students+=1
            } else if (this.state.assoc[assoc_index].burkhard_blacklist){
                blacklisted_students += 1
            } else if (this.state.assoc[assoc_index].burkhard_proposed){
                proposed_students += 1
            } else {
                unallocated_students += 1
            }
        }  
        message += allocated_students + " students allocated\n" + proposed_students + " students proposed\n"
                + blacklisted_students + " students blacklisted\n" + unallocated_students + " students unallocated\n"
        return message
    }

    SetModalIsOpen = (identifier, value) => {
        if (identifier === "student"){
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
            const options = this.state.students.map(d => ({
                "value" : d.id,
                "label" : d.firstName + " " + d.lastName + " " + (d.type? "Undergrad" : "PostGrad") + " " + (d.gpa||"NA")
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

            //create assign
            selectOptions: [],
            assoc_student_id: "",
            valid_student_id: true, 
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
        }

        axios.put("/api/courses/association/update/"+this.state.assoc_selected.id, data)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        
        axios.get("/api/courses/association/course/"+this.state.id)
            .then(response => {
                this.setState({
                    assoc: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });

        this.props.functionCallFromCourse(1); //trigger course.js to refresh student details
        
        if (this.state.currentModal) {
            this.handleModalCloseRequest();
            return;
        }
    }

    handle_student(e){
        var valid_student = true
        for (const assoc_index in this.state.assoc){
            if (this.state.assoc[assoc_index].student_id===e.value){
                valid_student = false
                break;
            }
        } 
        if (valid_student === true){
            this.setState({
                valid_student_id:true,
                assoc_student_id:e.value
            })
        } else {
            this.setState({
                valid_student_id:false,
                assoc_student_id:e.value
            })
        }
        
    }

    create_assign = () => {
        if (this.state.valid_student_id === true && this.state.assoc_student_id!==""){ //check if it has valid course and selected a course
            var data = {
                student_id:this.state.assoc_student_id,
                course_id: this.state.id,
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
          
            axios.post("/api/Courses/association/create", data)
                .then(response => {
                  this.setState({
                    assoc_student_id: "",
                    valid_student_id: true, 
                  });
                  console.log(response.data)
                })
                .catch(e => {
                  console.log(e);
                });
            
            axios.get("/api/courses/association/course/"+this.state.id)
                .then(response => {
                    this.setState({
                        assoc: response.data
                    });
                })
                .catch(e => {
                    console.log(e);
                });

            this.props.functionCallFromCourse(1); //trigger course.js to refresh student details
            
            if (this.state.currentModal) {
                this.handleModalCloseRequest();
                return;
            }
        } else {
            console.log("Unable to add student because student existed for this course or did not choose student")
        }
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="box" style={{padding: '5px', width:"750px"}}>
                    <div className="panelTitle" style={{backgroundColor : '#FFB6A4', marginBottom: '10px'}}>
                        <h1 className="cRightTitle">
                            {this.state.isInEditMode ? this.renderEditView_CourseName(): this.renderDefaultView_CourseName() }
                            {this.loadModuleTitle()}
                        </h1>
                    </div>
                    <div className="courseData" style={{backgroundColor :'#E67B8A', marginBottom: '10px'}}>
                        {/* {this.loadCoordinator()} */}
                        <h6>
                            Course Coordinator: {this.state.isInEditMode ? this.renderEditView_CC(): this.renderDefaultView_CC() }
                        </h6>
                        <h6>
                            Email: {this.state.isInEditMode ? this.renderEditView_CC_email(): this.renderDefaultView_CC_email() }
                            {this.state.isInEditMode ? "": this.renderDefaultView_send_email() }
                            
                        </h6>
                        <Modal isOpen={this.state.currentModal==="email"} onRequestClose={this.handleModalCloseRequest} style={customStyles}>
                            <div>
                                <button onClick={this.handleModalCloseRequest}>X</button>
                                <Email_modal dataFromSubject="Message From Marker Coordinator" dataFromParent={this.state.CC_email} dataFromMessage={this.setMessage()}/>
                            </div>
                        </Modal>    
                        <h6>
                            Year: {this.state.isInEditMode ? this.renderEditView_Year(): this.renderDefaultView_Year() }
                        </h6>
                        <h6>
                            Enrolment Deadline: {this.state.isInEditMode ? this.renderEditView_Deadline(): this.renderDefaultView_Deadline() }
                        </h6>
                        <h6>
                            Hours to mark one student: {this.state.isInEditMode ? this.renderEditView_Hours(): this.renderDefaultView_Hours() }
                        </h6>
                        <h6>
                            Enrolled Students: {this.state.isInEditMode ? this.renderEditView_Total_student(): this.renderDefaultView_Total_student() }
                        </h6>
                        {this.renderDefaultView_Hours_table()}
                        <h6>
                            Notes (Course Coordinator): {this.state.isInEditMode ? this.renderEditView_comment_CC(): this.renderDefaultView_comment_CC() }
                        </h6>
                        <h6>
                            Notes (Marker Coordinator): {this.state.isInEditMode ? this.renderEditView_comment_MC(): this.renderDefaultView_comment_MC() }
                        </h6>
                        <h6>
                            {this.renderEditView_buttons()}
                        </h6>
                    </div>
                    <div className="associationData" style={{backgroundColor : '#982D89'}}>
                            {/* {this.loadMarkerTable()} */}
                        </div>
                        <div className="associationData" style={{backgroundColor : '#DA70D6'}}>
                        <h4>
                            Marker Assignments
                        </h4>
                        <table> 
                            <tbody>
                                <tr style={{padding:"100px"}}>
                                    <th>Marker</th>
                                    <th>GPA</th>
                                    <th>Level</th>
                                    <th>Status</th>
                                    <th>AMH/THO</th>
                                </tr>
                                {this.state.assoc.map((filtered_assoc)=>
                                    <tr key={filtered_assoc.id}>
                                        {this.state.students.filter(student => filtered_assoc.student_id === student.id).map((filtered_student)=>
                                            <td key={filtered_student.id}>
                                                <button onClick={ () => this.SetModalIsOpen("student", filtered_student)}>
                                                    {filtered_student.firstName} {filtered_student.lastName}
                                                </button> 
                                            </td>  
                                        )}
                                        {this.state.students.filter(student => filtered_assoc.student_id === student.id).map((filtered_student)=>
                                            <td key={filtered_student.id}>
                                                {filtered_student.gpa||"NA"}
                                            </td>  
                                        )}
                                        {this.state.students.filter(student => filtered_assoc.student_id === student.id).map((filtered_student)=>
                                            <td key={filtered_student.id}>
                                                {(filtered_student.type? "Undergrad" : "PostGrad")}
                                            </td>  
                                        )}
                                        <td>{this.render_association_status(
                                            filtered_assoc.marking_hours,
                                            filtered_assoc.burkhard_proposed, 
                                            filtered_assoc.course_proposed, 
                                            filtered_assoc.student_proposed, 
                                            filtered_assoc.course_blacklist,
                                            filtered_assoc.burkhard_blacklist,
                                            )}
                                        </td>
                                        {this.state.students.filter(student => filtered_assoc.student_id === student.id).map((filtered_student)=>
                                            <td key={filtered_student.id}>
                                                {(filtered_assoc.marking_hours||0)+ "/" +(filtered_student.total_hours||0)}
                                            </td>  
                                        )}
                                        <td>
                                            <button onClick={() => this.SetModalIsOpen("assign", filtered_assoc)}>
                                                assign
                                            </button>     
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Modal isOpen={this.state.currentModal==="student"} onRequestClose={this.handleModalCloseRequest} style={customStyles}>
                            <div>
                                <button onClick={this.handleModalCloseRequest}>X</button>
                                    <Course_student dataFromParent={this.state.modal_value} 
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
                        <div style={{paddingTop:"5px"}}>
                            <button onClick={ () => this.SetModalIsOpen("new", "")}>+ Add Marker</button>
                        </div>
                        <Modal isOpen={this.state.currentModal==="new"} onRequestClose={this.handleModalCloseRequest} style={customStyles}>
                            <div>
                                <button onClick={this.handleModalCloseRequest}>X</button>
                                <div className="courseData" style={{backgroundColor :'#FFB6A4', marginBottom: '10px'}}>
                                    <h6>Student</h6>
                                    <Select 
                                        options={this.state.selectOptions}
                                        onChange={this.handle_student.bind(this)}
                                    />
                                    <h6 style={{color: "red"}}>
                                        {(this.state.assoc_student_id==="") ? "Please choose a Student" : ""}
                                        {this.state.valid_student_id ? "" : "Student existed for this Course!"}
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
                                    <button onClick={this.create_assign}>Add</button>
                                </div>
                            </div>
                        </Modal>
                        <h6>
                            AMH = Allocated Marking Hours for this course
                        </h6> 
                        <h6>
                            THO = Total Hours Offered by this student
                        </h6> 
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
} 