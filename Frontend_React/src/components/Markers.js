import React, { useState } from "react";
import Axios from 'axios';
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


// import "./App.css";
// import Axios from "axios";

// function Markers() {

//   const send = event => {
//     const data = new FormData();
//     data.append("name", name);
//     data.append("file", file);

//     Axios.post("https://httpbin.org/anything", data)
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
//   };

//     const [name, setName] = useState();
//     const [file, setFile] = useState();
//     console.log(name);
    
//   return (
//     // <BoxComponent style={{width: '90%'}}>
//     <div className="App">
//       <header className="App-header">
//         <form action="#">
//           <div className="flex">
//             <label htmlFor="name">Name</label>
//             <input type="text" id="name"
//               onChange={event => {
//                 const { value } = event.target;
//                 setName(value);
//               }}
//             />
//           </div>
//           <div className="flex">
//             <label htmlFor="file">File</label>
//             <input
//               type="file"
//               id="file"
//               accept=".pdf"
//               onChange={event => {
//                 const file = event.target.files[0];
//                 setFile(file);
//               }}
//             />
//           </div>
//         </form>
//         <button onClick={send}>Send</button>
//       </header>
//     </div>
//     // </BoxComponent>
//   );
// }

// export default Markers;