import React, {Component} from 'react';
import axios from "axios";

//TO ADD:
    //BACKEND; 
    //Total hours in class model
    //
        


export default class Course extends Component{

    //Placeholder
    totalHours() {
        return 0;
    }

    reassignMarkerHours(){
        //in progress
    }

    deleteMarker(){
        //in progress
    }
    
    resetPassword() {
        const cc_email = (this.props.dataFromParent || {}).CC_email;
        //complete reset password action
        //have marker be able to type in a new password?
    }

    overrideReqHours(idString) {
        var element = document.getElementById(idString);        
        //change the element to be an input field. 
        //have a cancel, and a use computed hours button.
        //axios post.
    }
    
    reAssign() {
        //make the elements editable
        //then have a save changes/cancel button
            //make it so that if the values haven't changed don't post 
        //also have it that on clicking enter it saves

    }
    isHoursComputed() {
        //Placeholder for database total hours, not in backend yet
        const totalHours = ((this.props.dataFromParent || {}).Hours  
            * (this.props.dataFromParent || {}).Total_student);
        
        if (totalHours === ((this.props.dataFromParent || {}).Hours * 
            (this.props.dataFromParent || {}).Total_student)) {
                return true;   
            }
        return true; //update to false later
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
        deadlineDate.setHours(parseInt(YMDhms[3]), parseInt(YMDhms[4]), 
                                              parseInt(YMDhms[5]), 0/*msValue*/);
        
        const today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        return ((deadlineDate <= today) ? true : false);
    }

    render() {
            return (
                <React.Fragment>
                <div>
                    <h1 className="cRightTitle">
                        {(this.props.dataFromParent || {}).Course_name}: 
                        {/*Have calculation based on how much has been assigned in table*/}
                        ({/*what is the value based on the parenthesis?*/})
                        /{}
                        

                    </h1>
                </div>
                <div className="coordinatorTab">
                    <h5>
                        Course Coordinator:
                    </h5>
                    <div>
                        {(this.props.dataFromParent || {}).CC}
                    </div>
                    <div>
                        {(this.props.dataFromParent || {}).CC_email}
                    </div>
                    <div>
                        <h6 onClick="resetPassword" style={{cursor : "pointer"}}>
                            (reset password)
                        </h6>
                        <br></br>
                    </div>
                </div>
                <div className="courseInfo">
                    <div>
                        Course Year:{(this.props.dataFromParent || {}).Year}
                    </div>
                    <div>
                        Enrolment Deadline:{(this.props.dataFromParent || {}).Deadline}
                        <br></br>
                        <br></br>
                    </div>
                    <div>
                        Hours to mark one student:{(this.props.dataFromParent || {}).Hours}
                    </div>
                    <div>
                        Enrolled Students:{(this.props.dataFromParent || {}).Total_student}
                        <br></br>
                    </div>
                    <div style={{display: "inline-flex"}}>
                        Student Hours required:
                        <input 
                        style={{height: '25px', borderBlockColor: 'transparent'}}
                        id = "totalHours" 
                        placeholder="needs to make a state for this in backend" 
                        disabled='true'
                        />
                        <button onClick={this.overrideReqHours("totalHours")} style={{float: 'right', height: '25px'}}>
                            Override
                        </button>
                    </div>
                    <div>
                        <br></br>
                        Student Hours allocated: {'association data'}
                    </div>
                    <div>
                        Student Hours defecit: {'association data'}
                        <br></br>
                        <br></br>
                    </div>
                </div>
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
                <div clasName="markerAssignments">
                    <h4>Marker Assignments</h4>
                  <table>
                      <tr>
                          <td className="recordTableHeading">
                              <h6 className="recordHeadingFont">Marker</h6>
                          </td>
                          <td className="recordTableHeading">
                                <h6 className="recordHeadingFont">GPA</h6>
                          </td>
                           <td className="recordTableHeading">
                                 <h6 className="recordHeadingFont">Level</h6>
                             </td>
                             <td className="recordTableHeading">
                                <h6 className="recordHeadingFont">Status</h6>
                            </td>
                            <td className="recordTableHeading">
                                <h6 className="recordHeadingFont">Hours</h6>
                            </td>
                            {/* Implement this when we can retrieve the students
                            <td>
                                <button onClick={this.reAssign} style={{cursor: 'pointer'}}>Reassign</button>
                            </td>
                            */}
                       </tr>
                        
                        {

                        }

                   </table>
                </div>
                </React.Fragment>
            );
        }
    }