import React, {Component} from 'react';

import Main  from './course';
import Course_right  from './course_right';
import 'react-reflex/styles.css'
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'

export default class index extends Component{
    constructor(props){
        super(props);
        this.state={
            value_key:""
        }
    }
    parentFunction=(data_from_child)=>{
        this.setState({value_key:data_from_child});
    }

    render() {
            return (
                <ReflexContainer orientation="vertical">
                        <ReflexElement className="left-pane">
                        <   Main functionCallFromParent={this.parentFunction}/>
                        </ReflexElement>

                        <ReflexSplitter style={{"zIndex":'0'}}/>

                        <ReflexElement className="right-pane"
                        size="450">
                        <div className="pane-content" style={{background:'white', overflow:"scroll"}}>
                            <Course_right dataFromParent={this.state.value_key}/>
                        </div>
                    </ReflexElement>
                </ReflexContainer>
            );
        }
    }