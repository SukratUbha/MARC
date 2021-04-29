import React from 'react';
import axios from 'axios';
import {
    BoxComponent
} from './common';

function Markers(){
    return(
            <BoxComponent style={{width: '90%'}}>
                <h1>Marker Profiles:</h1>
                <div className="filterTab" style={{display: 'flex'}}>
                    <label htmlFor="searchBar"/>
                    <input type="text" placeholder="search name, email, course..."/>
                    <div className="filterTabRight" style={{float: 'right'}}>
                        <button style={{float: 'right'}}>+ Marker</button>
                    </div>
                </div>
                <div className="studentList">
                    <table>
                        <tr>
                            <td className="recordTableHeading">
                                <h4 classname="recordHeadingFont">First Name</h4>
                            </td>
                            <td className="recordTableHeading">
                                <h4 classname="recordHeadingFont">Last Name</h4>
                            </td>
                            <td className="recordTableHeading">
                                <h4 classname="recordHeadingFont">Email</h4>
                            </td>
                            <td className="recordTableHeading">
                                <h4 classname="recordHeadingFont">Course Preferences</h4>
                            </td>
                            <td className="recordTableHeading">
                                <h4 classname="recordHeadingFont">CV</h4>
                            </td>
                        </tr>

                    </table>
                </div>
                <div className="toggleBar">
                    <button className="toggleBtn">Enable colour</button>
                    <button className="toggleBtn">Filter available markers</button>
                </div>
            </BoxComponent>
        )
}



export default Markers