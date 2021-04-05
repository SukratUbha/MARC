const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var pathResolver = require('path');   //gets us our global package application path. 

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();







// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to bezkoder application.\n where the birds come out to fly. SQUARK!" });
});


// another simple route
app.get(
        "/",        //endpoint
        (req,res)=>{
            //provide an arrow function which takes request & reply objects.
          res.send("<html><body background='/static/starface.gif'><div width='100%' align='middle'><font color='black' style='bold'><h1>Welcome to MARC.</h1><br><img src='/static/marc_wave_animation.gif'/><br><h3>Click <a href='/api'>HERE</a> to visit the API endpoint.</h3></font></div></body></html>")
        }

);


// routing for static images/assets
var dir = pathResolver.join(__dirname, 'app/assets');
app.use("/static",express.static(dir));  // url, filesystem dir. remember the / on the FRONT of the url
console.log('static assets path is ' + dir )







// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});