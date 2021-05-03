import React, {Component} from 'react';
import axios from "axios";

export default class Course extends Component{
    render() {
            return (
                <React.Fragment>
                <div>
                    {(this.props.dataFromParent || {}).Course_name}
                </div>
                <div>
                    {(this.props.dataFromParent || {}).CC}
                </div>
                <div>
                    {(this.props.dataFromParent || {}).CC_email}
                </div>
                <div>
                    {(this.props.dataFromParent || {}).CC_email}
                </div>
                <div>
                    {(this.props.dataFromParent || {}).CC_email}
                </div>
                <div>
                    {(this.props.dataFromParent || {}).CC_email}
                </div>
                <div>
                    {(this.props.dataFromParent || {}).CC_email}
                </div>
                <div>
                    {(this.props.dataFromParent || {}).CC_email}
                </div>
                <div>
                    {(this.props.dataFromParent || {}).CC_email}
                </div>
                </React.Fragment>
            );
        }
    }