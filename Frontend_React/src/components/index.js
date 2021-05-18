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
            course:"",
            assoc:null
        }
    }
    parentFunction=(retrieved_course, retrieved_assoc)=>{
        this.setState({
            course: retrieved_course,
            assoc: retrieved_assoc
        });
    }

    render() {
        let condition
        
        if (this.state.assoc!==null){ 
            condition=<Course_right dataFromParent={this.state.course} dataFromAssoc={this.state.assoc}/>
        } else if (this.state.course===""){
            condition=<Course_student/>
        } else {
            condition=<Course_empty/>
        }
        return (
            <div style={{"height": "100%"}}>
                <ReflexElement style={{"height": "100%"}}>
                    <ReflexContainer orientation="vertical">
                        <ReflexElement >
                            <ReflexContainer orientation="horizontal">
                                <ReflexElement >
                                    <Main functionCallFromParent={this.parentFunction}/>
                                </ReflexElement>
                            </ReflexContainer>
                        </ReflexElement>
                        <ReflexSplitter />
                        <ReflexElement style={{background:"white" ,"overflow": "scroll"}}>
                            {condition}
                        </ReflexElement>
                    </ReflexContainer> 
                </ReflexElement> 
            </div>
        );
        }
    }