import React, { Component } from "react";
import axios from "axios";
import DropboxStudent from './DropboxStudent';

//Either redirect to register page/register panel or change to the student list page

export default class AddMarker extends Component {
    constructor(props) {
        super(props);
        this.onChangeStudent_id = this.onChangeStudent_id.bind(this);
        this.onChangeBurkhard_proposed = this.onChangeBurkhard_proposed.bind(this);
        this.onChangeCourse_proposed = this.onChangeCourse_proposed.bind(this);
        this.onChangeStudent_proposed = this.onChangeStudent_proposed.bind(this);
        this.onChangeCourse_blacklist = this.onChangeCourse_blacklist.bind(this);
        this.onChangeBurkhard_blacklist = this.onChangeBurkhard_blacklist.bind(this);
        this.onChangeMarking_hours = this.onChangeMarking_hours.bind(this);
        this.onChangePreviously_enrolled = this.onChangePreviously_enrolled.bind(this);
        this.onChangePreviously_marked = this.onChangePreviously_marked.bind(this);

        this.state = {
            course_id: "", //Needs to get from parent
            student_id: "",
            student_name: "",
            burkhard_proposed: "",
            course_proposed: "",
            student_proposed: "",
            course_blacklist: "",
            burkhard_blacklist: "",
            marking_hours: "",
            previously_enrolled: "",
            previously_marked: "",

            noStudentSelected: true,
            added: false
        }
    }
    onChangeStudent_id(e) {
        //need to handle if error occours?
        axios.get('/api/courses/association/relation/'+this.state.course_id+'-'+e.target.value).then(response =>{
            this.setState({
                student_id: e.target.value,
                student_name: e.target.label,
                burkhard_proposed: response.data.burkhard_proposed,
                course_proposed: response.data.course_proposed,
                student_proposed: response.data.student_proposed,
                course_blacklist: response.data.course_blacklist,
                burkhard_blacklist: response.data.burkhard_blacklist,
                marking_hours: response.data.marking_hours,
                previously_enrolled: response.data.previously_enrolled,
                previously_marked: response.data.previously_marked,

                noStudentSelected: false
            });
        });
    }

    onChangeBurkhard_proposed(e) {
        this.setState({
            burkhard_proposed: (e.target.checked ? -1 : 0)
        });
    }

    onChangeCourse_proposed(e) {
        this.setState({
            course_proposed: (e.target.checked ? -1 : 0)
        });
    }

    onChangeStudent_proposed(e) {
        this.setState({
            student_proposed: (e.target.checked ? -1 : 0)
        });
    }

    onChangeCourse_blacklist(e) {
        this.setState({
            course_blacklist: (e.target.checked ? -1 : 0)
        });
    }

    onChangeBurkhard_blacklist(e) {
        this.setState({
            burkhard_blacklist: (e.target.checked ? -1 : 0)
        });
    }

    onChangeMarking_hours(e) {
        this.setState({
            marking_hours: e.target.value
        });
    }

    onChangePreviously_enrolled(e) {
        this.setState({
            previously_enrolled: (e.target.checked ? -1 : 0)
        });
    }

    onChangePreviously_marked(e) {
        this.setState({
            burkhard_marked: (e.target.checked ? -1 : 0)
        });
    }

    assignMarker() {
        //will use api .addStudentToCourse when route is made
        var data = {
            Student_id: this.state.student_id, //needs to be capitals due to .addStudentToCourse
            Course_id: this.state.course_id,
            burkhard_proposed: this.state.burkhard_proposed,
            course_proposed: this.state.course_proposed,
            student_proposed: this.state.student_proposed,
            course_blacklist: this.state.course_blacklist,
            burkhard_blacklist: this.state.burkhard_blacklist,
            marking_hours: this.state.marking_hours,
            previously_enrolled: this.state.previously_enrolled,
            previously_marked: this.state.previously_marked,
          };
      
          axios.post("", data)
            .then(response => {
              this.setState({
    
                added: true
              });
            })
            .catch(e => {
              console.log(e);
            });
    }

    addMarker(){
        this.setState({
            course_id: "", //Needs to get from parent
            student_id: "",
            student_name: "",
            burkhard_proposed: "",
            course_proposed: "",
            student_proposed: "",
            course_blacklist: "",
            burkhard_blacklist: "",
            marking_hours: "",
            previously_enrolled: "",
            previously_marked: "",

            noStudentSelected: true,
            added: false
        });
    }

    render(){
        return(
            <div className="addMarkerBox">
                {this.state.added ? (
                    <div>
                        <h4>Marker assignment successful</h4>
                            <button className="btn btn-success" onClick={this.addMarker}>
                                Add Another Marker
                            </button>
                    </div>
                    ) : (
                        <div className="addMarker">

                            <div className="searchBar">
                                <label htmlFor="selectStudent">Select student</label>
                                <DropboxStudent id="selectStudent" onChange={this.onChangeStudent_id}/>
                                {/*Need to set the student Id state so we can get the
                                assocation table values
                                can I use the target.value?*/}
                            </div>
                            {this.state.noStudentSelected ? (
                                <></>
                            ) : (
                                <div>
                                    <div className="assoc-form">
                                        <label htmlFor="student_name">Student Name</label>
                                        <p
                                            className="form-control"
                                            id="student_name"            
                                            name="Course name"
                                        >
                                            {this.state.student_name}
                                    </p>
                                    </div>

                                    <div className="assoc-form">
                                    <label htmlFor="marking_hours">Marker Hours</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="marking_hours"
                                            required
                                            value={this.state.marking_hours}
                                            onChange={this.onChangeMarking_hours}
                                            name="marking_hours"
                                        />
                                    </div>

                                    <div className="assoc-form">
                                    <label htmlFor="burkhard_proposed">Burkhard proposed</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            id="burkhard_proposed"
                                            required
                                            checked={this.state.burkhard_proposed ? true : false}
                                            onChange={this.onChangeBurkhard_proposed}
                                            name="burkhard_proposed"
                                        />
                                    </div>

                                    <div className="assoc-form">
                                    <label htmlFor="course_proposed">Course Coordinator proposed</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            id="course_proposed"
                                            required
                                            checked={this.state.course_proposed ? true : false}
                                            onChange={this.onChangeCourse_proposed}
                                            name="course_proposed"
                                        />
                                    </div>

                                    <div className="assoc-form">
                                    <label htmlFor="student_proposed">Student proposed</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            id="student_proposed"
                                            required
                                            checked={this.state.student_proposed ? true : false}
                                            onChange={this.onChangeStudent_proposed}
                                            name="student_proposed"
                                        />
                                    </div>

                                    <div className="assoc-form">
                                    <label htmlFor="course_blacklist">Course Coordinator blacklist</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            id="course_blacklist"
                                            required
                                            checked={this.state.course_blacklist ? true : false}
                                            onChange={this.onChangeCourse_blacklist}
                                            name="course_blacklist"
                                        />
                                    </div>

                                    <div className="assoc-form">
                                    <label htmlFor="marker_blacklist">Marker Coordinator blacklist</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            id="marker_blacklist"
                                            required
                                            checked={this.state.burkhard_blacklist ? true : false}
                                            onChange={this.onChangeBurkhard_blacklist}
                                            name="marker_blacklist"
                                        />
                                    </div>
                                    
                                    <div className="assoc-form">
                                    <label htmlFor="previously_marked">Previously marked</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            id="previously_marked"
                                            required
                                            checked={this.state.previously_marked ? true : false}
                                            onChange={this.onChangePreviously_marked}
                                            name="previously_marked"
                                        />
                                    </div>

                                    <div className="assoc-form">
                                    <label htmlFor="previously_enrolled">Previously enrolled</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            id="previously_enrolled"
                                            required
                                            checked={this.state.previously_enrolled ? true : false}
                                            onChange={this.onChangePreviously_enrolled}
                                            name="previously_enrolled"
                                        />
                                    </div>

                                    <button onClick={this.assignMarker} className="btn btn-success">
                                        Submit
                                    </button>

                                </div>

                            )}
                        </div>
                    )
                }
            </div>
        );
    }
}