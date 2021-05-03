import React from 'react';
import {
    HeaderBar,
    HeaderItem,
    HeaderLogo,
    HeaderRight,
} from './common';
import Logo from '../assets/marc_logo.png';
import {NavLink} from 'react-router-dom';


function Header() {
        return(
            <HeaderBar>
                <HeaderItem href="home" ><NavLink exact to="/"><HeaderLogo src={Logo}/></NavLink></HeaderItem>
                <HeaderRight>
                    <HeaderItem className="headerButton">
                        <NavLink exact to="/Courses">Courses</NavLink>
                    </HeaderItem>
                    <HeaderItem className="headerButton">
                        <NavLink exact to="/login">Login</NavLink>
                    </HeaderItem>
                    <HeaderItem className="headerButton">
                        <NavLink exact to="/register">Register</NavLink>
                    </HeaderItem>
                </HeaderRight>
            </HeaderBar>
        )
    }


export default Header;