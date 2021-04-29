import React, {useState} from "react";
import axios from "axios";

function SearchBarCourses() {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <input 
            type="text"
            placeholder="search Courses"
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        );
}


export default SearchBarCourses;