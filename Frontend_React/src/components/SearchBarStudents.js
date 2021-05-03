import React, {useState} from "react";
import axios from "axios";

function SearchBarStudents() {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <input 
            type="text"
            placeholder="search Students"
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        );
}
export default SearchBarStudents;