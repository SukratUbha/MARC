import React, {Component} from 'react';
import axios from "axios";
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas"; 

export default class Course extends Component{
    styles = require('../App.css');
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            onClick_course: null,
            isMenuOpened: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    // This function will make a simple http request to our backend. Hence, we need Axios.
    // Axios - A really good framework that make API request within React
    // Axios will make HTTP request to our endpoint in React server localhost: 3000,
    // If it doesn't see the endpoint in our React server, it will look up if it exists in
    // the backend server localhost: 8080
    // Axios will query it and return the result in Axios
    componentDidMount = () => {
        axios.get("/api/courses/").then(response =>{
            this.setState({
                courses: response.data
            });
        });
    };

    handleClick = value => () => {
        console.log(this.state.onClick_course!==value, this.state.isMenuOpened, value)
        if (this.state.onClick_course!==value&&this.state.isMenuOpened==true){
            this.setState({ 
                onClick_course: value
            });
        } else {
            this.setState({ 
                isMenuOpened: !this.state.isMenuOpened,
                onClick_course: value
            });
        }
    };

    render(){
        return (
            <div>
                <OffCanvas
                    width={300}
                    height={"100%"}
                    transitionDuration={100}
                    effect={"overlay"}
                    isMenuOpened={this.state.isMenuOpened}
                    position={"right"}
                >
                    
                    <OffCanvasBody /*className={styles.bodyClass} style={{ fontSize: "30px" }}*/>
                    <p>
                    {this.state.courses.map(course=>
                        <div>
                            <button class="openbtn" onClick={this.handleClick(course)}>
                                {course.Course_name}</button>
                        </div>
                    )}
                    </p>
                    </OffCanvasBody>
                    
                    <OffCanvasMenu className="menu" style={{background:"white", height:"100%", "padding-top":'75px', "overflow":"scroll"}}>
                    <button class="openbtn" onClick={this.handleClick(this.state.onClick_course)}>
                        X 
                    </button>
                    <Child2 dataFromParent = {this.state.onClick_course} />
                    </OffCanvasMenu>
                </OffCanvas>
                

            </div>
        )
    }
}

class Child2 extends React.Component {
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