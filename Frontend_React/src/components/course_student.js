import React, {Component} from 'react';
import axios from "axios";

export default class course_empty extends Component{
    constructor(props){
        super(props);
        
        // this.onChangeDescription = this.onChangeDescription.bind(this);

        this.state = {
            // currentStudent:{
            //     id: this.props.dataFromParent.id,
            //     firstName:this.props.dataFromParent.firstName,
            //     lastName:this.props.dataFromParent.lastName,
            //     student_number:this.props.dataFromParent.student_number,
            //     upi:this.props.dataFromParent.upi,
            //     firstPref:this.props.dataFromParent.firstPref,
            //     secondPref:this.props.dataFromParent.secondPref,
            //     thirdPref:this.props.dataFromParent.thirdPref,
            //     email:this.props.dataFromParent.email, 
            //     total_hours:this.props.dataFromParent.total_hours,
            //     description:this.props.dataFromParent.description,
            //     pdfLocation:this.props.dataFromParent.pdfLocation,
            // },
            id: this.props.dataFromParent.id,
            description:this.props.dataFromParent.description,
            assoc: this.props.dataFromAssoc,
            value: "",
            isInEditMode: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //trigger when index.js gives different student 
        if (prevState.id !== this.props.dataFromParent.id) {
            this.setState({
                id: this.props.dataFromParent.id,
                description: this.props.dataFromParent.description,
                assoc: this.props.dataFromAssoc
            })
        }
    }

    // update textbox
    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    updateComponentValue = () => {
        // var data = {
        //     id: this.state.currentStudent.id,
        //     firstName:this.state.currentStudent.firstName,
        //     lastName:this.state.currentStudent.lastName,
        //     student_number:this.state.currentStudent.student_number,
        //     upi:this.state.currentStudent.upi,
        //     firstPref:this.state.currentStudent.firstPref,
        //     secondPref:this.state.currentStudent.secondPref,
        //     thirdPref:this.state.currentStudent.thirdPref,
        //     email:this.state.currentStudent.email, 
        //     total_hours:this.state.currentStudent.total_hours,
        //     description:this.state.currentStudent.description,
        //     pdfLocation:this.state.currentStudent.pdfLocation,
        // };
        this.setState({
            isInEditMode: !this.state.isInEditMode,
            description: this.refs.theTextInput.value
        })
        var data = {
            description: this.refs.theTextInput.value
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

    renderEditView = () => {
        return (
            <div style={{display:"inline-block"}}>
                <button onClick={this.changeEditMode}>cancel</button>
                <button onClick={this.updateComponentValue}>update</button>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    defaultValue={this.state.description}
                    ref="theTextInput"
                    name="Discription"
                />
            </div>
        )}

    renderDefaultView = () => {
        return <div onDoubleClick={this.changeEditMode} style={{display:"inline-block"}}>
            [{this.state.description}]
        </div>
    }

    render() {
        return (
            <React.Fragment>
                
                <div className="box" style={{padding: '5px', width:"750px"}}>
                    <div className="panelTitle" style={{backgroundColor : '#FFB6A4', marginBottom: '10px'}}>
                        <h1 className="cRightTitle">
                            {(this.props.dataFromParent || {}).firstName + " " +
                            (this.props.dataFromParent || {}).lastName}
                        </h1>
                    </div>
                    <div className="courseData" style={{backgroundColor :'#E67B8A', marginBottom: '10px'}}>
                        <h6>
                            GPA: {}
                        </h6>
                        <h6>
                            Rank: {}
                        </h6>
                        <div>
                            CV: 
                            <h6 style={{textDecoration: "underline", cursor : "pointer", display:"inline-block"}}>
                                View
                            </h6>
                        </div>
                        
                        <h6>
                            Hours Offered: {(this.props.dataFromParent || {}).total_hours}
                        </h6>
                        <h6>
                            Hours Allocated: {}
                        </h6>
                        <h6>
                            Notes: {this.state.isInEditMode ? this.renderEditView(): this.renderDefaultView()}
                        </h6>
                    </div>
                    <div className="associationData" style={{backgroundColor : '#DA70D6'}}>
                        <h6>
                            Preferred / Preliminary Classes:
                        </h6>
                        {this.state.assoc.map((filtered_assoc)=>
                            <button key={filtered_assoc.id}>
                                {filtered_assoc.course_id}
                            </button>  
                        )}
                    </div>
                </div>
            </React.Fragment>
            // <React.Fragment>
            //     <div>
                    
            //     </div>
            //     <div className="coordinatorTab">
            //         <h5>
            //             UPI: {(this.props.dataFromParent || {}).upi}
            //         </h5>
            //         <h5>
            //             Email: {(this.props.dataFromParent || {}).email}
            //         </h5>
            //         <div>
            //             <h6>
            //                 Total hours: {(this.props.dataFromParent || {}).total_hours} hours
            //             </h6>
            //             <br/>
            //         </div>
            //     </div>
            //     <div>
            //         <h6>
            //             createdAt: {(this.props.dataFromParent || {}).createdAt}
            //         </h6>
            //         <h6>
            //             updatedAt: {(this.props.dataFromParent || {}).updatedAt}
            //         </h6>
            //     </div>
            // </React.Fragment>
            )}
    
}