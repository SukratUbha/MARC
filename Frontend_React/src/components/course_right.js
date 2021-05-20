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
            assoc: this.props.dataFromAssoc,
            CCUser: [],
            Student: [],
            allocationData: [],
        }
    }
    //reload
    reloadData(){
        //in progress
    }


    //Panel header
    loadModuleTitle() {
        return(
            <div>
                <h1 className="cRightTitle">
                    {(this.props.dataFromParent || {}).Course_name}: 
                    {/*Have calculation based on how much has been assigned in table*/}
                    ({/*Total Hours Defecit*/}{((this.state.allocationData || {}).Hours_defecit_saved) || '0'})
                    /{this.getTotalHours()}
                </h1>
            </div>
        );
    }

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
                    Course Year:{(this.props.dataFromParent || {}).Year}
                </div>
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
                <div>
                    Hours to mark one student:{(this.props.dataFromParent || {}).Hours}
                </div>
                <div>
                    Enrolled Students:{(this.props.dataFromParent || {}).Total_student}
                </div>
                <div style={{display: "inline-flex"}}>
                    Student Hours required:
                    <input 
                    style={{height: '25px', width: '50px', border: '0px solid', backgroundColor: 'transparent', color: 'black'}}
                    id = "totalHours" 
                    placeholder={this.getTotalHours()} //temporary
                    disabled='true'
                    />
                    <button onClick={this.overrideReqHours("totalHours")} style={{float: 'right', height: '25px'}}>
                        Override
                    </button>
                </div>
            </div>
        );
    }

    getTotalHours() {
        return( (this.props.dataFromParent || {}).Total_student * (this.props.dataFromParent || {}).Hours
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
                        <td>{'sum of table'}</td>
                        <td>{'input fields'}</td>
                    </tr>
                    <tr className="hoursDefecit">
                        <td style={{width: '250px'}}>Marking Hours defecit:</td>
                        <td style={{width: '150px'}}>{'f sum of table'}</td>
                        <td style={{width: '150px'}}>{'f input fields'}</td>
                    </tr>
                </table>
            </div>
        );
    }

    loadComments(){
        <div className="comments">
            <div>
                <label htmlFor="commentCC">Notes (Course Coordinator)</label>
                    <p id="commentCC">
                        {(this.props.dataFromParent || {}).comment_CC}
                    </p>
            </div>
            <div>
                <label htmlFor="commentMC">Notes (Marker Coordinator)</label>
                <p id="commentMC">
                    {(this.props.dataFromParent || {}).comment_MC}
                </p>
            </div>
        </div>
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
    }

    cancelReqHours(elementId) {
        //in progress, have this triggered by esc or x
    }

    editComment(elementID) {
        //in progress,
    }
    
    //Association / marker data rendering
    loadMarkerTable() {
        return(
            <div clasName="markerAssignments">
                <h4>Marker Assignments</h4>
                <table>
                    <tr>
                        <td className="recordTableHeading">
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
                        <td className="recordTableHeading">
                            <h6 className="recordHeadingFont">Status</h6>
                        </td>
                        <td className="recordTableHeading">
                            <h6 className="recordHeadingFont">Experience</h6>
                        </td>
                        <td className="recordTableHeading">
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
                        <p className="reassignHours" onClick={this.reAssignHours((filtered_student || {}).student_id)} style={{cursor: 'pointer'}}>Reassign</p>
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
        //do i need some date calculation?
        //Used by SO https://stackoverflow.com/questions/11309730/compare-sql-date-to-javascript-date
        var sqlDateStr = (this.props.dataFromParent || {}).Deadline; // as for MySQL DATETIME
        sqlDateStr = sqlDateStr.replace(/:| /g,"-");
        var YMDhms = sqlDateStr.split("-");
        var deadlineDate = new Date();
        deadlineDate.setFullYear(parseInt(YMDhms[0]), parseInt(YMDhms[1])-1,
                                                 parseInt(YMDhms[2]));
        /*                                         
        deadlineDate.setHours(parseInt(YMDhms[3]), parseInt(YMDhms[4]), 
                                              parseInt(YMDhms[5]), 0msValue);
        also comment out 0msValue*/
        
        const today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        return ((deadlineDate <= date) ? <>(late)</> : <></>);
    }


    render() {
            return (
                <React.Fragment>
                    <div className="panelTitle" style={{backgroundColor : '#FFB6A4'}}>
                        {this.loadModuleTitle()}
                    </div>
                    <div className="courseData" style={{backgroundColor :'#E67B8A'}}>
                        {this.loadCoordinator()}
                        {this.loadCourseDeadline()}
                        {this.loadCourseHours()}
                        {this.loadAllocatedHours()}
                        {this.loadComments()}
                    </div>
                    <div className="associationData" style={{backgroundColor : '#982D89'}}>
                        {this.loadMarkerTable()}
                    </div>
                </React.Fragment>
            );
        }
    } 