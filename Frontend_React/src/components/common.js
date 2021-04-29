import styled from 'styled-components';

/*
Using styled-components allows for modularisation and resuse of component's CSS
accross multiple component files where this does not require multiple repeat .css code
Hence it is beneficial to use styled components

Can define CSS by component as opposed to by components on the file, and can be imported to any
file which uses the components by using

import {
    componentName1,
    componentName2,
} from './common'
*/


/*NavBar components CSS*/
export const HeaderBar = styled.div`
    overflow: hidden;
    background: linear-gradient(180deg, #00467f 0%, #003561 100%);
    padding: 10px 10px;
`

export const HeaderItem = styled.div`
    float: left;
    color: white;
    font-family: 'NationalBold', sans-serif;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    border-radius: 4px;
    margin: 0px;

    &:active {
        filter: brightness(0.97);
    }
    &:hover {
        filter: brightness(1.03);
    }
`

export const HeaderRight = styled.div`
    float: right;
`

export const HeaderLogo = styled.img`
    height: 25px;
    padding: 0px;
`
/*Form Components CSS*/
export const BoxComponent = styled.div`
    background: #fff;
    box-sizing: border-box;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.4);
    margin: 15px auto;
    padding: 15px;
    width: 600px;
    border-radius: 5px;
`

export const FormBox = styled.form`

`
export const FormField = styled.div`
    width: 100%
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 16px;
    padding: 10px;
    margin: 5px 10px;
    display: block;
`
export const FormBoxLabel = styled.label`
    width: 300px;
    
`
export const RegisterButton = styled.button`
`

/*Marker modification table*/
export const CoursesTable = styled.table`
`

export const CoursesHeading = styled.tr`
    text-align: center;
    font-weight: bold;
    color: white;
    background: linear-gradient(90deg,rgb(39, 176, 255) 0%,rgb(0, 232, 236) 100%);
    border: 1px solid black;

    &:hover {
        cursor: pointer;
    }
`

export const CourseListCell = styled.tr`
`

export const CourseButton = styled.div`
`

export const SearchBar = styled.input`
    border-radius: 3px;
    border: 1px solid linear-gradient(90deg,rgb(39, 176, 255) 0%,rgb(0, 232, 236) 100%);
`