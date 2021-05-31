import React, {Component} from 'react';
import axios from "axios";
import './course.css';

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
            assoc: [],
            courses: this.props.dataFromCourses,
            students: this.props.dataFromStudents,
            all_assoc: this.props.dataFromAllAssoc,
            value: "",
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

    openCV = () => {
        if(this.state.pdfLocation!==null){
            console.log("Opening CV")
            window.open(this.state.pdfLocation);
        } else {
            console.log("Do not have CV")
        }
    }
   
    renderDefaultView_firstName = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.firstName}
        </div>
    }
    renderDefaultView_lastName = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.lastName}
        </div>
    }
    renderDefaultView_student_number = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.student_number}
        </div>
    }
    renderDefaultView_upi = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.upi}
        </div>
    }
    renderDefaultView_email = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.email}
        </div>
    }
    renderDefaultView_degree = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.degree}
        </div>
    }
    renderDefaultView_year = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.year}
        </div>
    }
    renderDefaultView_type = () => {
        if (this.state.type === 0){
            return <div style={{display:"inline-block"}}>
                PostGraduate
            </div>
        } else {
            return <div style={{display:"inline-block"}}>
                UnderGraduate
            </div>
        }
    }
    renderDefaultView_gpa = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.gpa}
        </div>
    }
    renderDefaultView_courses_marked = () => {
        return <div style={{display:"inline-block"}}>
            {this.state.courses_marked}
        </div>
    }
    renderDefaultView_bh_training = () => {
        if (this.state.bh_training === 1){
            return <div style={{display:"inline-block"}}>
                Yes
            </div>
        } else {
            return <div style={{display:"inline-block"}}>
                No
            </div>
        }
    }
    renderDefaultView_tutor_training = () => {
        if (this.state.tutor_training === 1){
            return <div style={{display:"inline-block"}}>
                Yes
            </div>
        } else {
            return <div style={{display:"inline-block"}}>
                No
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
        return <div style={{display:"inline-block"}}>
            {this.state.total_hours||0}
        </div>
    }
    renderDefaultView_allocated_hours = () => {
        var hours = 0;
        for (const assoc_index in this.state.assoc){
            hours += (this.state.assoc[assoc_index].marking_hours||0)
        }

        var deficit_hours = this.state.total_hours - hours;

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
        return <div>
            {this.state.description}
        </div>
    }
    renderDefaultView_mc_description = () => {
        return <div style={{width:"200px"}}>
            {this.state.mc_description}
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
    
    render() {
        return (
            <React.Fragment>
                
                <div className="box" style={{padding: '5px', width:"750px"}}>
                    <div className="panelTitle" style={{backgroundColor : '#FFB6A4', marginBottom: '10px'}}>
                        <h1 className="cRightTitle">
                            {this.renderDefaultView_firstName()} &nbsp;
                            {this.renderDefaultView_lastName()}
                        </h1>
                    </div>
                    <div className="courseData" style={{backgroundColor :'#E67B8A', marginBottom: '10px'}}>
                        <h6>
                            Student Number: {this.renderDefaultView_student_number()}
                        </h6>
                        <h6>
                            UPI: {this.renderDefaultView_upi()}
                        </h6>
                        <h6>
                            Email: {this.renderDefaultView_email()}
                        </h6>
                        <h6>
                            Degree: {this.renderDefaultView_degree()}
                        </h6>
                        <h6>
                            Year: {this.renderDefaultView_year()}
                        </h6>
                        <h6>
                            Type: {this.renderDefaultView_type()}
                        </h6>
                        <h6>
                            GPA: {this.renderDefaultView_gpa()}
                        </h6>
                        <h6>
                            Course marked: {this.renderDefaultView_courses_marked()}
                        </h6>
                        <h6>
                            Bullying and harassment training: {this.renderDefaultView_bh_training()}
                        </h6>
                        <h6>
                            Tutor training: {this.renderDefaultView_tutor_training()}
                        </h6>
                        <h6>
                            CV: {this.renderDefaultView_CV()}
                        </h6>
                        <h6>
                            Hours Offered: {this.renderDefaultView_total_hours()}
                        </h6>
                        {this.renderDefaultView_allocated_hours()}
                        <h6>
                            Notes from Student: {this.renderDefaultView_description()}
                        </h6>
                        <h6>
                            Notes for this Student: {this.renderDefaultView_mc_description()}
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
                                                {filtered_course.Course_name}
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
                                    </tr>
                                    
                                )}
                            </tbody>
                        </table> 
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
            </React.Fragment>
            
        )
    }
    
}