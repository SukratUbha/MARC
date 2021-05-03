import React, {Component} from 'react';
import axios from "axios";

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
                        <Main functionCallFromParent={this.parentFunction.bind(this)}/>
                        </ReflexElement>

                        <ReflexSplitter style={{"z-index":'0'}}/>

                        <ReflexElement className="right-pane"
                        minSize="200"
                        maxSize="800"
                        style={{background:'white'}}>
                        <div className="pane-content">
                            <Course_right dataFromParent={this.state.value_key}/>
                        </div>
                    </ReflexElement>
                </ReflexContainer>
            );
        }
    }