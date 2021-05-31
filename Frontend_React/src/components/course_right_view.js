import React, {Component} from 'react';
import axios from "axios";
import Modal from 'react-modal'
import './course.css';
      
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
            CC: this.props.dataFromParent.CC,
            CC_email: this.props.dataFromParent.CC_email,
            Year: this.props.dataFromParent.Year,
            Deadline: this.props.dataFromParent.Deadline,
            Hours: this.props.dataFromParent.Hours,
            Total_student: this.props.dataFromParent.Total_student,
            comment_CC: this.props.dataFromParent.comment_CC,
            comment_MC: this.props.dataFromParent.comment_MC,

            //course's association
            assoc: [],
            //list of all courses
            courses: this.props.dataFromCourses,
            //list of all students
            students: this.props.dataFromStudents,
            //list of all associations
            all_assoc: this.props.dataFromAllAssoc,
        }
    }

    componentDidMount = () => {
        axios.get("/api/courses/association/course/" + this.state.id).then(response =>{
            this.setState({
                assoc: response.data
            });
        });
    };
    
    getTotalHours() {
        return( this.state.Total_student * this.state.Hours
        );
    }
    
    renderDefaultView_CourseName = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.Course_name} &nbsp;
        </div>
    }
    renderDefaultView_CC = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.CC}
        </div>
    }
    renderDefaultView_CC_email = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.CC_email}
        </div>
    }
    renderDefaultView_Year = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.Year}
        </div>
    }
    renderDefaultView_Deadline = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.Deadline}
        </div>
    }
    renderDefaultView_Hours = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.Hours}
        </div>
    }
    renderDefaultView_Total_student = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.Total_student}
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
            </div>
        );
    }
    renderDefaultView_comment_CC = () => {
        return <div>
            {this.state.comment_CC}
        </div>
    }
    renderDefaultView_comment_MC = () => {
        return <div>
            {this.state.comment_MC}
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

    render() {
        return (
            <React.Fragment>
                <div className="box" style={{padding: '5px', width:"750px"}}>
                    <div className="panelTitle" style={{backgroundColor : '#FFB6A4', marginBottom: '10px'}}>
                        <h1 className="cRightTitle">
                            {this.renderDefaultView_CourseName() }
                            {this.loadModuleTitle()}
                        </h1>
                    </div>
                    <div className="courseData" style={{backgroundColor :'#E67B8A', marginBottom: '10px'}}>
                        {/* {this.loadCoordinator()} */}
                        <h6>
                            Course Coordinator: {this.renderDefaultView_CC() }
                        </h6>
                        <h6>
                            Email: {this.renderDefaultView_CC_email() }
                        </h6>
                        <h6>
                            Year: {this.renderDefaultView_Year() }
                        </h6>
                        <h6>
                            Enrolment Deadline: {this.renderDefaultView_Deadline() }
                        </h6>
                        <h6>
                            Hours to mark one student: { this.renderDefaultView_Hours() }
                        </h6>
                        <h6>
                            Enrolled Students: {this.renderDefaultView_Total_student() }
                        </h6>
                        {this.renderDefaultView_Hours_table()}
                        <h6>
                            Notes (Course Coordinator): {this.renderDefaultView_comment_CC() }
                        </h6>
                        <h6>
                            Notes (Marker Coordinator): {this.renderDefaultView_comment_MC() }
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
                                                {filtered_student.firstName} {filtered_student.lastName}
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
                                    </tr>
                                )}
                            </tbody>
                        </table>                        
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