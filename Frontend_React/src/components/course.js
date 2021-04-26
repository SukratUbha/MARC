import React, {Component} from 'react';
import axios from "axios";

export default class Course extends Component{
    constructor(){
        super();
        this.state = {
            course: "Not yet gotten"
        }
    }

    // This function will make a simple http request to our backend. Hence, we need Axios.
    // Axios - A really good framework that make API request within React
    // Axios will make HTTP request to our endpoint in React server localhost: 3000,
    // If it doesn't see the endpoint in our React server, it will look up if it exists in
    // the backend server localhost: 8080
    // Axios will query it and return the result in Axios
    componentDidMount = () => {
        axios.get("/api/Courses/2").then(response =>{
            console.log(response.data); // it returns [] at the inspect browser
            this.setState({
                course: response.data.Course_name
            });
        });
    };

    render(){
        return (
            <div>
                <button>Get course</button>
                <h1>The course in computer science is: {this.state.course}</h1>
            </div>
        )
    }
}