import React, {Component} from 'react';

import Main  from './course';
import Course_right  from './course_right';
import Course_empty  from './course_empty';
import Course_student  from './course_student';
import 'react-reflex/styles.css'
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'

export default class index extends Component{
    constructor(props){
        super(props);
        this.state={
            identifier: null,
            value:"",
            assoc:[],
            courses: [],
            students: [],
            count: 0
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log("course has updated...", this.state.count)
    // }

    parentFunction=(retrieved_identifier , retrieved_value, retrieved_assoc, retrieved_courses, retrieved_students)=>{
        //trigger from course.js
        this.setState({
            identifier: retrieved_identifier,
            value: retrieved_value,
            assoc: retrieved_assoc,
            courses: retrieved_courses,
            students: retrieved_students,
        });
    }

    updateStudent=(num)=>{
        //trigger from course_student.js
        this.setState({
            count: this.state.count + num 
        });
    }

    render() {
        let condition
        
        if (this.state.identifier==="course"){ 
            condition=<Course_right dataFromParent={this.state.value} dataFromAssoc={this.state.assoc} dataFromCourses={this.state.courses} dataFromStudents={this.state.students}/>
        } else if (this.state.identifier==="student"){
            condition=<Course_student dataFromParent={this.state.value} dataFromAssoc={this.state.assoc} dataFromCourses={this.state.courses} dataFromStudents={this.state.students} functionCallFromStudent={this.updateStudent}/>
        } else {
            condition=<Course_empty/>
        }
        return (
            <div style={{"height": "100%"}}>
                <ReflexElement style={{"height": "100%"}}>
                    <ReflexContainer orientation="vertical">
                        <ReflexElement >
                            <ReflexContainer orientation="horizontal">
                                <ReflexElement style={{"overflow": "scroll"}}>
                                    <Main functionCallFromParent={this.parentFunction} dataFromStudent={this.state.count}/>
                                </ReflexElement>
                            </ReflexContainer>
                        </ReflexElement>
                        <ReflexSplitter style={{zIndex:"0"}} />
                        <ReflexElement style={{background:"white" ,"overflow": "scroll"}}>
                            {condition}
                        </ReflexElement>
                    </ReflexContainer> 
                </ReflexElement> 
            </div>
        );
        }
    }