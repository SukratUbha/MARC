express = require("express");      //access to static functions.
module.exports = (app)=>{
    app.use("/",app.Express.static("./frontend"));    //browser finds /index.html in here i think.

}