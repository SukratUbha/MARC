import React, {Component} from 'react';
import axios from "axios";
// import Modal from 'react-modal';
// import MyModal from './course-modal'; 
import './course.css'; 

// const MODAL_A = 'modal_a';
// const MODAL_B = 'modal_b';

const DEFAULT_TITLE = 'Default title';

export default class Course extends Component{
    styles = require('../App.css');
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            assoc:[],
            students:[],
            onClick_course: null,
            title1: DEFAULT_TITLE,
            currentModal: null,
            one_assoc: null,
            count: 0
        }
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

        axios.get("/api/courses/association/").then(response =>{
            this.setState({
                assoc: response.data
            });
        });

        axios.get("/api/students/").then(response =>{
            this.setState({
                students: response.data
            });
        });
    };

    componentDidUpdate(prevProps, prevState) {
        //trigger from course_right.js or course_student ie. num is incremented by course_student.js
        if (prevState.count !== this.props.dataFromStudent) {
            axios.get("/api/students/").then(response =>{
                this.setState({
                    students: response.data,
                    count: this.props.dataFromStudent
                });
                
            });

            axios.get("/api/courses/association/").then(response =>{
                this.setState({
                    assoc: response.data
                });
            });

            axios.get("/api/courses/").then(response =>{
                this.setState({
                    courses: response.data
                });
            });
            console.log("course.js has updated")
        }
    }
    
    load = () => { //load default value for classes
        axios.get("/api/courses/load")
        axios.get("/api/courses/").then(response =>{
            this.setState({
                courses: response.data
            });
        });
    };

    loadstudent = () => {
        const student1 = {
            firstName:"Albert", 
            lastName:"Einstein", 
            email:"Albert@gmail.com", 
            upi:"albe123",
            password: null, 
            firstPref: 1,
            secondPref: null,
            thirdPref: null,
            total_hours: 10.7,
            description: null, 
            pdfLocation:null 
        };
        const student2 = {
            firstName:"Stephen", 
            lastName:"Hawking", 
            email:"Stephen@gmail.com", 
            upi:"step123",
            password: null, 
            firstPref: 5,
            secondPref: 6,
            thirdPref: 2,
            total_hours: 8,
            description: null, 
            pdfLocation:null 
        };
        const student3 = {
            firstName:"Thomas", 
            lastName:"Edison", 
            email:"Thomas@gmail.com", 
            upi:"thom123",
            password: null, 
            firstPref: 3,
            secondPref: 4,
            thirdPref: null,
            total_hours: 20,
            description: null, 
            pdfLocation:null 
        };
        const student4 = {
            firstName:"Isaac", 
            lastName:"Newton", 
            email:"Isaac@gmail.com", 
            upi:"issa123",
            password: null, 
            firstPref: 6,
            secondPref: 4,
            thirdPref: 2,
            total_hours: 15,
            description: null, 
            pdfLocation:null 
        };
        const student5 = {
            firstName:"Alan", 
            lastName:"Turing", 
            email:"Alan@gmail.com", 
            upi:"alan123", 
            password: null, 
            firstPref: 1,
            secondPref: 3,
            thirdPref: null,
            total_hours: 18.7,
            description: null, 
            pdfLocation:null 
        };
        axios.post("/api/students/api/registertestStudent", student1);
        axios.post("/api/students/api/registertestStudent", student2);
        axios.post("/api/students/api/registertestStudent", student3);
        axios.post("/api/students/api/registertestStudent", student4);
        axios.post("/api/students/api/registertestStudent", student5)

        axios.get("/api/courses/association/").then(response =>{
            this.setState({
                assoc: response.data
            });
        });

        axios.get("/api/students/").then(response =>{
            this.setState({
                students: response.data
            });
        });
    };

    handleClick = (identifier, value) => () => {
        if (identifier === "course"){
            axios.get("/api/courses/association/course/" + value.id).then(response =>{
                this.setState({
                    one_assoc: response.data
                });
                this.props.functionCallFromParent("course", value, this.state.one_assoc, this.state.courses, this.state.students, this.state.assoc);
            });
        } else {
            axios.get("/api/courses/association/student/" + value.id).then(response =>{
                this.setState({
                    one_assoc: response.data
                });
                this.props.functionCallFromParent("student", value, this.state.one_assoc, this.state.courses, this.state.students, this.state.assoc);
            });
        }
    }

    createCourse = () => { //load default value for classes
        var data = {
            Course_name: "",
            CC: "",
            CC_email: "",
            Year: 1,
            Deadline: null,
            Hours: 0,
            Total_student: 0,
            comment_CC: "",
            comment_MC: "",
          };
      
        axios.post("/api/Courses/create", data)
        .then(response => {
            console.log(response.data)
            console.log("Course has created sucessfully!")
            this.props.functionCallFromParent("course", response.data, [], this.state.courses, this.state.students, this.state.assoc);
        })
        .catch(e => {
            console.log(e);
        });

        axios.get("/api/courses/").then(response =>{
            this.setState({
                courses: response.data
            });
        });

       
        
    };

    render(){
        // const { currentModal } = this.state;

        return (
            <div className="pane-content" style={{width:"750px"}}>
                {this.state.courses.map((course)=>
                     
                    <div key={course.id} style={{"paddingBottom": "15px"}}>
                        <div style={{display:"inline-block"}}>
                            
                            <button onClick={this.handleClick("course", course)}>
                                {course.Course_name||"NA"}</button> 
                            
                            
                            {this.state.assoc.filter(assoc => assoc.course_id === course.id).map((filtered_assoc)=>
                                <div key={filtered_assoc.id} style={{display:"inline-block"}}>
                                    {this.state.students.filter(student => student.id === filtered_assoc.student_id)
                                                        .map((filtered_student)=>
                                        <button key={filtered_student.id} onClick={this.handleClick("student",filtered_student)}>
                                            {filtered_student.firstName||"NA"}: {filtered_assoc.marking_hours||0}/{filtered_student.total_hours||0}
                                        </button>
                                        
                                    )}
                                </div> 
                            )}
                        </div>
                        
                        <div style={{display:"inline-block"}}>
                            
                        </div>
                    </div>
                    
                )}
                <div>
                    <button type="button" onClick={this.createCourse}>Add Class</button>
                </div>
                {/* <br/>
                <div>
                    <button type="button" className="btn btn-primary" onClick={this.load}>load</button>
                    <button type="button" className="btn btn-primary" onClick={this.loadstudent}>load student</button>
                </div> */}
            </div>

            
        )
    }
}

// //Modal function 
    // toggleModal = key => event => {
    //     event.preventDefault();
    //     if (this.state.currentModal) {
    //       this.handleModalCloseRequest();
    //       return;
    //     }
    
    //     this.setState({
    //       ...this.state,
    //       currentModal: key,
    //       title1: DEFAULT_TITLE
    //     });
    //   }
    
    // handleModalCloseRequest = () => {
    // // opportunity to validate something and keep the modal open even if it
    // // requested to be closed
    // this.setState({
    //     ...this.state,
    //     currentModal: null
    // });
    // }

    // handleInputChange = e => {
    // let text = e.target.value;
    // if (text == '') {
    //     text = DEFAULT_TITLE;
    // }
    // this.setState({ ...this.state, title1: text });
    // }

    // handleOnAfterOpenModal = () => {
    // // when ready, we can access the available refs.
    // this.heading && (this.heading.style.color = '#F00');
    // }

{/* <button type="button" className="btn btn-primary" onClick={this.toggleModal(MODAL_A)}>Open Modal A</button>
                    <button type="button" className="btn btn-primary" onClick={this.toggleModal(MODAL_B)}>Open Modal B</button>
                    <MyModal
                        title={this.state.title1}
                        isOpen={currentModal == MODAL_A}
                        onAfterOpen={this.handleOnAfterOpenModal}
                        onRequestClose={this.handleModalCloseRequest}
                        askToClose={this.toggleModal(MODAL_A)}
                        onChangeInput={this.handleInputChange} />
                    <Modal
                        ref="mymodal2"
                        id="test2"
                        aria={{
                            labelledby: "heading",
                            describedby: "fulldescription"
                        }}
                        closeTimeoutMS={150}
                        contentLabel="modalB"
                        isOpen={currentModal == MODAL_B}
                        shouldCloseOnOverlayClick={false}
                        onAfterOpen={this.handleOnAfterOpenModal}
                        onRequestClose={this.toggleModal(MODAL_B)}>
                        <h1 id="heading" ref={h1 => this.heading = h1}>This is the modal 2!</h1>
                        <div id="fulldescription" tabIndex="0" role="document">
                            <p>This is a description of what it does: nothing :)</p>
                            <button onClick={this.toggleModal(MODAL_B)}>close</button>
                        </div>
                    </Modal> */}

