import React, { Component } from "react";
import axios from "axios";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.onChangeCourse_name = this.onChangeCourse_name.bind(this);
    this.onChangeCC = this.onChangeCC.bind(this);
    this.onChangeCC_email = this.onChangeCC_email.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.newCourse = this.newCourse.bind(this);

    this.state = {
      id: null,
      Course_name: "",
      CC: "", 
      CC_email: "",
      Year: "", 
      Deadline: null,
      Hours: null,
      Total_student: null, 
      comment_CC:null,
      comment_MC:null,

      submitted: false
    };
  }

  onChangeCourse_name(e) {
    this.setState({
        Course_name: e.target.value
    });
  }

  onChangeCC(e) {
    this.setState({
      CC: e.target.value
    });
  }

  onChangeCC_email(e) {
    this.setState({
        CC_email: e.target.value
    });
  }

  onChangeYear(e) {
    this.setState({
        Year: e.target.value
    });
  }

  saveCourse() {
    var data = {
      Course_name: this.state.Course_name,
      CC: this.state.CC, 
      CC_email: this.state.CC_email,
      Year: this.state.Year
    };

    axios.post("/api/Courses/create", data)
      .then(response => {
        this.setState({
          id: response.data.id,
          Course_name: response.data.Course_name,
          CC: response.data.CC,
          CC_email: response.data.CC_email,
          Total_student: response.data.Total_student,
          comment: response.data.comment,

          Year: response.data.Year, 
          Deadline: response.data.Deadline,
          Hours: response.data.Hours,
          Total_student: response.data.Total_student, 
          comment_CC:response.data.comment_CC,
          comment_MC:response.data.comment_MC,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCourse() {
    this.setState({
        id: null,
        Course_name: "",
        CC: "", 
        CC_email: "",
        Year: "", 
        Deadline: null,
        Hours: null,
        Total_student: null, 
        comment_CC:null,
        comment_MC:null,

        submitted: false
      });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCourse}>
              Create another course
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Course_name">Course name</label>
              <input
                type="text"
                className="form-control"
                id="Course_name"
                required
                value={this.state.Course_name}
                onChange={this.onChangeCourse_name}
                name="Course name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="CC">Course Coordinator</label>
              <input
                type="text"
                className="form-control"
                id="CC"
                required
                value={this.state.CC}
                onChange={this.onChangeCC}
                name="Course Coordinator"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Course_email">Course Coordinator's Email</label>
              <input
                type="text"
                className="form-control"
                id="CC_email"
                required
                value={this.state.CC_email}
                onChange={this.onChangeCC_email}
                name="Course Coordinator's Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Year">Year</label>
              <input
                type="text"
                className="form-control"
                id="Year"
                required
                value={this.state.Year}
                onChange={this.onChangeYear}
                name="Year"
              />
            </div>

            <button onClick={this.saveCourse} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}