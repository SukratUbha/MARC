import React, { useState } from 'react';
import axios from "axios";
import { BoxComponent,
        CoursesHeading,
        SearchBar,
 } from './common';
import AddCourse from './add_course';

function Courses(){

    const [courseName, setCourseName] = useState("");
    const [CC, setCC] = useState("");
    const [CCEmail, setCCEmail] = useState("");
    const [totalStudents, setTotalStudents] = useState("");
    const [comments, setComments] = useState("");

    
    const [courses, displayCourses] = useState([]);

    
    const getAllCourses = () => {
        axios.get("/api/courses").then((response) => {
          displayCourses(response.data);
        });
      };

    const DisplayCourses = () => {

    }

    const SortCourses = () => {

    }

    
    return (
        <BoxComponent style={{width: '90%'}}>
            <h1>Marker-Course Assignments</h1>
            <br/>
            <br/>
            <div className="filterTab">
                <label htmlFor="search">Search</label>
                <input type="text" name="search" className="searchBar" placeholder="Search course, student, coordinatior..."/>
                <div className="filterTabRight"style={{float: 'right'}}>
                    <button className="addCourseBtn">+Course</button>
                </div>
            </div>
            <table className="courseTable">
                <tr>
                    <td className="recordTableHeading">
                        <h4 classname="recordHeadingFont">Course Name</h4>
                    </td>
                    <td className="recordTableHeading">
                        <h4 classname="recordHeadingFont">Course Coordinator</h4>
                    </td>
                    <td className="recordTableHeading">
                        <h4 classname="recordHeadingFont">Course Coordinator Email</h4>
                    </td>
                    <td className="recordTableHeading">
                        <h4 classname="recordHeadingFont">Total/Est students</h4>
                    </td>
                    <td className="recordTableHeading">
                        <h4 classname="recordHeadingFont">comments</h4>
                    </td>
                </tr>
                {courses.map((value, key) => {
                    return(
                        <tr>
                            <div className="courseVar">
                                <h4 classname="courseFont">{value.Course_name}</h4>
                                <button className="modifyBtn">...</button>
                            </div>
                            <div className="courseVar">
                                <h4 classname="courseFont">{value.CC}</h4>
                                <button className="modifyBtn">...</button>
                            </div>
                            <div className="courseVar">
                                <h4 classname="courseFont">{value.CC_email}</h4>
                                <button className="modifyBtn">...</button>
                            </div>
                            <div className="courseVar">
                                <h4 classname="courseFont">{value.Total_student}</h4>
                                <button className="modifyBtn">...</button>
                            </div>
                            <div className="courseVar">
                                <h4 classname="courseFont">{value.comment}</h4>
                                <button className="modifyBtn">...</button>
                            </div>
                        </tr>
                    );
                })}
            </table>
            <div className="toggleOptions">
                <button className="toggleBtn">Enable colour</button>
                <button className="toggleBtn">Sort by allocation status</button>
                <div className="toggleRight" style={{float: 'right'}}>
                    <button className="toggleBtn">Automate...</button>
                </div>
                
    
            </div>
        </BoxComponent>
    );
}

export default Courses;