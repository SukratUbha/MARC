import React, { Component } from "react";
import axios from "axios";

export default class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.onChangeCourse_name = this.onChangeCourse_name.bind(this);
    this.onChangeCC = this.onChangeCC.bind(this);
    this.onChangeCC_email = this.onChangeCC_email.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeHours = this.onChangeHours.bind(this);
    this.onChangeTotal_student = this.onChangeTotal_student.bind(this);
    this.onChangeTotal_hours = this.onChangeTotal_hours.bind(this);
    this.onChangeComment_CC = this.onChangeComment_CC.bind(this);
    this.onChangeComment_MC = this.onChangeComment_MC.bind(this);
    this.updateCourse = this.updateCourse.bind(this);

    //update with props from parent?
    this.state = {
      id: null,
      Course_name: "",
      CC: "", 
      CC_email: "",
      Year: "", 
      Deadline: null,
      Hours: null,
      Total_student: null, 
      Total_hours: null,
      comment_CC:null,
      comment_MC:null,

      updated: false
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

  onChangeDeadline(e) {
    this.setState({
      Deadline: e.target.value
    });
  }

  onChangeHours(e) {
    this.setState(e)({
      Hours: e.target.value
    });
  }

  onChangeTotal_student(e) {
    this.setState(e)({
      Total_student: e.target.value
    });
  }

  onChangeTotal_hours(e) {
    this.setState(e)({
      Total_hours: e.target.value
    });
  }

  onChangeComment_CC(e) {
    this.setState({
      comment_CC: e.target.value
    });
  }

  onChangeComment_MC(e) {
    this.setState({
      comment_MC: e.target.value
    });
  }

  updateCourse() {
    var data = {
      id: this.state.id,
      Course_name: this.state.Course_name,
      CC: this.state.CC, 
      CC_email: this.state.CC_email,
      Year: this.state.Year, 
      Deadline: this.state.Deadline,
      Hours: this.state.Hours,
      Total_student: this.state.Total_student, 
      Total_hours: this.state.Total_hours,
      comment_CC: this.state.comment_CC,
      comment_MC: this.state.comment_MC,
    };

    axios.post("/api/Courses/update/:"+this.state.id, data)
      .then(response => {/*
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
          comment_CC:response.data.comment_CC,
          comment_MC:response.data.comment_MC,

          updated: true
        });*/
        this.setState({
          updated: true
        });     
      })
      .catch(e => {
        console.log(e);
      });
  }

  close() {
    //Close the popup
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.updated ? (
          <div>
            <h4>Course updated successfully!</h4>
            <button className="btn btn-success" onClick={this.close}>
              Close
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

            <div className="form-group">
              <label htmlFor="Deadline">Deadline</label>
              <input
                type="text"
                className="form-control"
                id="Deadline"
                required
                value={this.state.Deadline}
                onChange={this.onChangeDeadline}
                name="Deadline"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Hours">Hours Per Student</label>
              <input
                type="text"
                className="form-control"
                id="Hours"
                required
                value={this.state.Hours}
                onChange={this.onChangeHours}
                name="Hours"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Total_student">Confirmed/Estimated Students</label>
              <input
                type="text"
                className="form-control"
                id="Total_student"
                required
                value={this.state.Total_student}
                onChange={this.onChangeTotal_student}
                name="Total_student"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Total_hours">Required Hours</label>
              <input
                type="text"
                className="form-control"
                id="Total_hours"
                required
                value={this.state.Total_hours}
                onChange={this.onChangeTotal_hours}
                name="Total_hours"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Comment_CC">CC Comments</label>
              <input
                type="text"
                className="form-control"
                id="Comment_CC"
                required
                value={this.state.comment_CC}
                onChange={this.onChangeComment_CC}
                name="Comment_CC"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Comment_MC">CC Comments</label>
              <input
                type="text"
                className="form-control"
                id="Comment_MC"
                required
                value={this.state.comment_MC}
                onChange={this.onChangeComment_CC}
                name="Comment_MC"
              />
            </div>
          
            <button onClick={this.updateCourse} className="btn btn-success">
              Submit
            </button>
            <button onClick={this.close} className="btn btn-close">
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }
}