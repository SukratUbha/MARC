import React, {Component} from 'react';
import axios from "axios";
      
//Need to now fetch user of course cordinator Id
//Need to fetch each filtered student
//The add student options, should it provide a list of students who have any proposed flag
//should clicking on the student's name redirect them to their student profile?

export default class Course extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.dataFromParent.id,
            Course_name: this.props.dataFromParent.Course_name,
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
            assoc: this.props.dataFromAssoc,
            //list of all courses
            courses: this.props.dataFromCourses,
            //list of all students
            students: this.props.dataFromStudents,
            //list of all associations
            all_assoc: this.props.dataFromAllAssoc,

            //always set Edit Mode to false when different student has changed
            isInEditMode: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //trigger when index.js gives different courses 
        if (prevState.id !== this.props.dataFromParent.id) {
            this.setState({
                //course details
                id: this.props.dataFromParent.id,
                Course_name:this.props.dataFromParent.Course_name,
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

    getTotalHours() {
        return( this.state.Total_student * this.state.Hours
        );
    }

    loadAllocatedHours(){
        return(
            <div className="allcHours">
                <table className="allocHoursTable">
                    <tr>
                        <td></td>
                        <td></td>
                        <td>(Unsaved)</td>
                    </tr>
                    <tr className="hoursAllocated">
                        <td>Marking Hours allocated:</td>
                        <td>{((this.state.allocationData || {}).Hours_allocated_saved) || this.getTotalHours()}</td>
                        <td>{((this.state.allocationData || {}).Hours_allocated_unsaved) || this.getTotalHours()}</td>
                    </tr>
                    <tr className="hoursDefecit">
                        <td style={{width: '250px'}}>Marking Hours defecit:</td>
                        <td style={{width: '150px'}}>{((this.state.allocationData || {}).Hours_defecit_saved) || '0'}</td>
                        <td style={{width: '150px'}}>{((this.state.allocationData || {}).Hours_defecit_unsaved) || '0'}</td>
                    </tr>
                </table>
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
    
    //Association / marker data rendering
    loadMarkerTable() {
        return(
            <div clasName="markerAssignments">
                <h4>Marker Assignments</h4>
                <table>
                    <tr>
                        <td className="recordTableHeading" style={{width: '100px', border: '1px solid black'}}>
                            <h6 className="recordHeadingFont">Marker</h6>
                        </td>
                        {/*
                        <td className="recordTableHeading">
                                <h6 className="recordHeadingFont">GPA</h6>
                        </td>
                        <td className="recordTableHeading">
                                <h6 className="recordHeadingFont">Level</h6>
                            </td>
                        */}
                        <td className="recordTableHeading" style={{width: '100px', border: '1px solid black'}}>
                            <h6 className="recordHeadingFont">Status</h6>
                        </td>
                        <td className="recordTableHeading" style={{width: '100px', border: '1px solid black'}}>
                            <h6 className="recordHeadingFont">Experience</h6>
                        </td>
                        <td className="recordTableHeading"style={{width: '100px', border: '1px solid black'}}>
                            <h6 className="recordHeadingFont">Hours</h6>
                        </td>
                    </tr>
                    {this.loadMarkerAssociations()}
                </table>
                <div className="tableFunctions">
                    <p className="addMarker" onclick={this.addMarker()} style={{cursor: 'pointer'}}>+ Add Marker</p>
                </div>
            </div>       
        );

    }

    loadMarkerAssociations() {
        /*
                axios.get("/api/students/id:"+filtered_student.student_id).then(response =>{
            this.setState({
                Student: response.data
            });
        });
        */
        return(
            this.state.assoc.filter( record => record.marking_hours !== 0).map((filtered_student) =>                
                <tr className="recordTableEntry">
                    <td className="recordTableCell"> {/*Name of student*/}
                        {filtered_student.student_id}
                    </td>
                    <td className="recordTableCell"> {/*Marking Status*/}
                        {(filtered_student || {}).burkhard_proposed}
                        {(filtered_student || {}).course_proposed}
                        {(filtered_student || {}).student_proposed}
                    </td>
                    <td className="recordTableCell"> {/*Experience*/}
                        {(filtered_student || {}).previously_enrolled}
                        {(filtered_student || {}).previously_marked}
                        {(filtered_student || {}).burkhard_blacklist}
                        {(filtered_student || {}).course_blacklist}
                    </td>
                    <td className="recordTableCell" id={filtered_student.student_id}>{/*Assigned Hours*/}
                        {(filtered_student || {}).marking_hours}/{/*Need the axios request*/}
                    </td>
                    <td className="recordTableCell">
                        <div className="reassignHours" onClick={this.reAssignHours((filtered_student || {}).student_id)} style={{cursor: 'pointer'}}>Reassign</div>
                        <div className="deleteMarker" onClick={this.deleteMarker((filtered_student || {}).student_id)} style={{cursor: 'pointer'}}>X</div>
                    </td>
                </tr>
            )
        );
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
        console.log(this.refs.Deadline.value)
        this.setState({
            isInEditMode: !this.state.isInEditMode,//
            Course_name:this.refs.Course_name.value,
            Year:this.refs.Year.value||1,
            Deadline:this.refs.Deadline.value||null,
            Hours:this.refs.Hours.value||0,
            Total_student:this.refs.Total_student.value||0,
            comment_CC:this.refs.comment_CC.value,
            comment_MC:this.refs.comment_MC.value,
        })
        var data = {
            Course_name:this.refs.Course_name.value,
            Year:this.refs.Year.value||1,
            Deadline:this.refs.Deadline.value+"+0000"||null,
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
    
    loadModuleTitle() {
        //Have calculation based on how much has been assigned in table
        return(
            <div style={{display:"inline-block"}}>
                ({/*Total Hours Defecit*/}{((this.state.allocationData || {}).Hours_defecit_saved) || '0'})
                /{this.getTotalHours()}
            </div>
        );
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
                            {/* {this.loadCourseHours()}
                            {this.loadAllocatedHours()} */}
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
                    </div>
                </React.Fragment>
            );
        }
    } 