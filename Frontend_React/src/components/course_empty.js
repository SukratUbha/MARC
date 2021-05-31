import React, {Component} from 'react';
import logo from "../assets/round_long.png";

export default class course_empty extends Component{
    render() {
        return (
                <div>
                    <img src={logo} style={{display:"block", "marginLeft": "auto", "paddingTop": "200px",
                            "marginRight": "auto", width:"400px" }} alt="marcLogo"/>
                    <br/>
                    <h3 style={{textAlign:"center"}}>Marker Allocation Reconciliation Configurator</h3>
                    
                </div>
                
            )}
    
}
