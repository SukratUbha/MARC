import React from 'react';
import axios from 'axios';
import {
    BoxComponent
} from './common';

function Markers(){
    return(
            <BoxComponent>
                <h1>Marker Profiles:</h1>
                <div className="filterTab">
                    <label htmlFor="searchBar"/>
                    <input type="text" placeholder="search name, email, course..."/>
                    <div className="filterTabRight">
                        <button>+ Marker</button>
                    </div>
                </div>
                <div className="studentList">
                    <table>
                        <tr>
                            <td className="recordTableHeading">
                                <h3 classname="recordHeadingFont">First Name</h3>
                            </td>
                            <td className="recordTableHeading">
                                <h3 classname="recordHeadingFont">Last Name</h3>
                            </td>
                            <td className="recordTableHeading">
                                <h3 classname="recordHeadingFont">Email</h3>
                            </td>
                            <td className="recordTableHeading">
                                <h3 classname="recordHeadingFont">Course Preferences</h3>
                            </td>
                            <td className="recordTableHeading">
                                <h3 classname="recordHeadingFont">CV</h3>
                            </td>
                        </tr>

                    </table>
                </div>
            </BoxComponent>
        )
}



export default Markers