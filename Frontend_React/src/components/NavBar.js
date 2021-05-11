import React from 'react';
import Logo from '../assets/marc_logo.png';
import {NavLink} from 'react-router-dom';


function Header() {
        return(
            <div className="headerBar">
                <div className="headerItem" href="home" ><NavLink exact to="/"><img src={Logo} alt="program logo"/></NavLink></div>
                <div className="headerRight">
                    <div className="headerButton">
                        <NavLink exact to="/Courses">Courses</NavLink>
                    </div>
                    <div className="headerButton">
                        <NavLink exact to="/login">Login</NavLink>
                    </div>
                    <div className="headerButton">
                        <NavLink exact to="/register">Register</NavLink>
                    </div>
                </div>
            </div>
        )
    }


export default Header;