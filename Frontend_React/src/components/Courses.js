import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BoxComponent,
        CoursesTable,
        CoursesHeading,
        SearchBar,
 } from './common';
import AddCourse from './add_course';

function Courses(){

    const [states, setStates] = useState("");
    

    
    return (
        <BoxComponent>
            <div className="CourseNav">
            <SearchBar/>
            <AddCourse/>
            </div>
            <CoursesTable>
                
            </CoursesTable>
        </BoxComponent>
    )

}
export default Courses;