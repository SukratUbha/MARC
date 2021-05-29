import React, {Component} from 'react';
import axios from "axios";

export default class course_empty extends Component{
    constructor(props){
        super(props);
        
        // this.onChangeDescription = this.onChangeDescription.bind(this);

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
            description:this.props.dataFromParent.description,
            mc_description:this.props.dataFromParent.mc_description,
            pdfLocation:this.props.dataFromParent.pdfLocation,

            //student's association
            assoc: this.props.dataFromAssoc,
            courses: this.props.dataFromCourses,
            value: "",
            isInEditMode: false
        }
    }

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
                description:this.props.dataFromParent.description,
                mc_description:this.props.dataFromParent.mc_description,
                pdfLocation:this.props.dataFromParent.pdfLocation,
                
                //student's association
                assoc: this.props.dataFromAssoc,
                //list of all courses
                courses: this.props.dataFromCourses,
                
                //always set Edit Mode to false when different student has changed
                isInEditMode: false
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
            email:this.refs.email.value, 
            bh_training: (this.refs.bh_training.checked)*1, //No - 0, Yes - 1
            tutor_training: (this.refs.tutor_training.checked)*1, //No - 0, Yes - 1
            total_hours:this.refs.total_hours.value,
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
            email:this.refs.email.value, 
            bh_training: this.refs.bh_training.checked, //No - 0, Yes - 1
            tutor_training: this.refs.tutor_training.checked, //No - 0, Yes - 1
            total_hours:this.refs.total_hours.value,
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
                <input
                    type="text"
                    id="gpa"
                    defaultValue={this.state.gpa}
                    ref="gpa"
                    name="GPA"
                    size="5"
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
                    type="text"
                    id="total_hours"
                    defaultValue={this.state.total_hours}
                    ref="total_hours"
                    name="Hours Offered"
                    size="5"
                />
            </div>
        )
    }
    renderEditView_mc_description = () => { //notes for this student
        return (
            <div style={{display:"inline-block", width:"200px"}}>
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
    renderDefaultView_total_hours = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.total_hours}]
        </div>
    }
    renderDefaultView_mc_description = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block", width:"200px"}}>
            [{this.state.mc_description}]
        </div>
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
                        </h6>
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
                            Course marked: {}
                        </h6>
                        <h6>
                            Bullying and harassment training: {this.state.isInEditMode ? this.renderEditView_bh_training(): this.renderDefaultView_bh_training()}
                        </h6>
                        <h6>
                            Tutor training: {this.state.isInEditMode ? this.renderEditView_tutor_training(): this.renderDefaultView_tutor_training()}
                        </h6>
                        <div>
                            CV: 
                            <h6 style={{textDecoration: "underline", cursor : "pointer", display:"inline-block"}}>
                                View
                            </h6>
                        </div>
                        <h6>
                            Hours Offered: {this.state.isInEditMode ? this.renderEditView_total_hours(): this.renderDefaultView_total_hours()}
                        </h6>
                        <h6>
                            Hours Allocated: {}
                        </h6>
                        <h6>
                            Notes from Student: {}
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
                                {this.state.assoc.map((filtered_assoc)=>
                                    <tr key={filtered_assoc.id}>
                                            {this.state.courses.filter(course => filtered_assoc.course_id === course.id).map((filtered_course)=>
                                                <td key={filtered_course.id}>
                                                    <button >
                                                        {filtered_course.Course_name}
                                                    </button> 
                                                </td> 
                                            )}
                                    </tr>
                                )}
                            </tbody>
                        </table> 
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
    
}