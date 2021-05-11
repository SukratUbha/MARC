import React, {Component} from 'react';
import axios from "axios";

//This file outputs a get request, which will be made when accessing a pdf file in the browser
//this is useful for the admin, if he were to view registered users in the db and concurrently, check their CVs in pdf form.

//used in conjunction with the markers view table page, as one row will be reserved for accessing CVs, 
//can later be put into the same file
axios(`${apiURL}/pdf`, {    //should be configured as the API endpoint that returns the PDF stream. 
    method: 'GET',
    responseType: 'blob' //Force to receive data in a Blob Format
})
.then(response => {
//Create a Blob from the PDF Stream
    const file = new Blob(
      [response.data], 
      {type: 'application/pdf'});
//Build a URL from the file
    const fileURL = URL.createObjectURL(file);
//Open the URL on new Window
    window.open(fileURL);
})
.catch(error => {
    console.log(error);
});