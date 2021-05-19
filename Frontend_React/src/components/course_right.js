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
        }
    }

    //Panel header
    loadModuleTitle() {
        return(
            <div>
                <h1 className="cRightTitle">
                    {(this.props.dataFromParent || {}).Course_name}: 
                    {/*Have calculation based on how much has been assigned in table*/}
                    ({/*Total Hours Defecit*/})
                    /{(this.props.dataFromParent || {}).Total_hours}
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
                            Fetch From User table
                        </div>
                        <div style={{float : 'right'}}>
                            <button onclick={this.sendCCEmail}>send email</button>
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
                    style={{height: '25px', borderBlockColor: 'transparent'}}
                    id = "totalHours" 
                    placeholder={(this.props.dataFromParent || {}).Total_hours}
                    disabled='true'
                    />
                    <button onClick={this.overrideReqHours("totalHours")} style={{float: 'right', height: '25px'}}>
                        Override
                    </button>
                </div>
            </div>
        );
    }

    loadAllocatedHours(){
        return(
            <div className="assocHours">
                <div>
                    Student Hours allocated: {'association data'}
                </div>
                <div>
                    Student Hours defecit: {'association data'}
                </div>
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
        var element = document.getElementById(elementId);
        element.contentEditable( element.contentEditable === false ? true : false )
        //change the button to say confirm
        //include an x to cancel?
    }

    submitReqHours(elementId) {
        //in progress, have this triggered by enter or confirm
    }

    cancelReqHours(elementId) {
        //in progress, have this triggered by esc or x
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
                            <h6 className="recordHeadingFont">History</h6>
                        </td>
                        <td className="recordTableHeading">
                            <h6 className="recordHeadingFont">Hours</h6>
                        </td>
                    </tr>
                    {this.loadMarkerAssociations()}
                </table>
            </div>       
        );

    }

    loadMarkerAssociations() {
        return(
            this.state.assoc.filter( record => record.marking_hours !== 0).map((filtered_student) =>
                <tr className="recordTableEntry">
                    <td className="recordTableCell">
                        {filtered_student.student_id}
                    </td>
                    <td className="recordTableCell">
                        burkhard_proposed?
                        course_proposed?
                        student_proposed?
                    </td>
                    <td className="recordTableCell">
                        previously_enrolled?
                        previously_marked?
                        burkhard_blacklist?
                        course_blacklist?
                    </td>
                    <td className="recordTableCell" id={filtered_student.student_id}>
                        {filtered_student.marking_hours}/students registered hours
                    </td>
                    <td>
                        <button onClick={this.reAssignHours(filtered_student.student_id)} style={{cursor: 'pointer'}}>Reassign</button>
                    </td>
                </tr>
            )
        );
    }

    addMarker(){
        //in progress
    }

    deleteMarker(){
        //in progress
    }

    changeMarkerHours() {
        //in progress
    }

   
    isHoursComputed() {
        //Placeholder for database total hours, not in backend yet
        const computedHours = ((this.props.dataFromParent || {}).Hours  
            * (this.props.dataFromParent || {}).Total_student);
        
        if (computedHours === (this.props.dataFromParent || {}).Total_hours) {
                return (<p className="computed">(computed)</p>);   
            }
        return false; //update to false later
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

        return ((deadlineDate <= date) ? <p>(late)</p> : {});
    }

    //student data 

    render() {
            return (
                <React.Fragment>
                    <div className="panelTitle">
                        { () => {
                            this.loadModuleTitle();
                            }
                        }
                    </div>
                    <div className="courseData">
                        { () => {
                            this.loadCoordinator();
                            this.loadCourseDeadline();
                            this.loadCourseHours();
                            this.loadAllocatedHours();
                            this.loadComments();
                            }
                        }
                    </div>
                    <div className="associationData">
                        { () => {
                            this.loadMarkerTable();
                            }
                        }
                    </div>
                </React.Fragment>
            );
        }
    }