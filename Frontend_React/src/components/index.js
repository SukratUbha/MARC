import React, {Component} from 'react';

import Main  from './course';
import Course_right  from './course_right';
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
        }
        return (
            <ReflexContainer orientation="vertical">
                    <ReflexElement className="left-pane">
                        <div className="pane-content" style={{overflow:"scroll"}}>
                            <Main functionCallFromParent={this.parentFunction}/>
                        </div>
                    </ReflexElement>

                    <ReflexSplitter style={{"zIndex":'0'}}/>

                    <ReflexElement className="right-pane" size="450">
                        <div className="pane-content" style={{background:'white', overflow:"scroll"}}>
                            {condition}
                        </div>
                </ReflexElement>
            </ReflexContainer>
        );
        }
    }