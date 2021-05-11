import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirst_name = this.onChangeFirst_name.bind(this);
    this.onChangeLast_name = this.onChangeLast_name.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirst_pref = this.onChangeFirst_pref.bind(this);
    this.onChangeSecond_pref = this.onChangeSecond_pref.bind(this);
    this.onChangeThird_pref = this.onChangeThird_pref.bind(this);

    this.state = {
      First_name: "",
      Last_name: "", 
      Email: "",
      First_pref: null,
      Second_pref: null,
      Third_pref: null,
      Student_CV: "",
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

  saveCourse() {
    var data = {
      Course_name: this.state.Course_name,
      CC: this.state.CC, 
      CC_email: this.state.CC_email
    };

    axios.post("/api/Register/", data)
      .then(response => {
        this.setState({
          id: response.data.id,
          Course_name: response.data.Course_name,
          CC: response.data.CC,
          CC_email: response.data.CC_email,
          Total_student: response.data.Total_student,
          comment: response.data.comment,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMarker() {
    this.setState({
        id: "",
        Course_name: "",
        CC: "",
        CC_email: "",
        Total_student: null,
        comment: null,

        submitted: false
      });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You Registered successfully!</h4>
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
              <label htmlFor="Course_name">Course Coordinator's Email</label>
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

            <button onClick={this.saveCourse} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}