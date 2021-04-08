
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var pathResolver = require('path');   //gets us our global package application path. 
const { LOADIPHLPAPI } = require("dns");
global.appDir = pathResolver.join(__dirname, 'app/');    //This global application path. 
const PORT = isInProduction() ? 80 : 8080;
const assetsDir =pathResolver.join(appDir+"/assets")



//Are we on the production server? (Affects CORS, SSL Cert & TCP port)
function isInProduction(){
  return process.cwd() == "/marc/MARC/dist";  //MARC is installed in this directory on the production server.
}



//CORS
var corsOptions = {
  origin: isInProduction() ? "http://marc.thewholecake.co.nz" : "http://localhost:8080"
};
app.use(cors(corsOptions));


app.use(bodyParser.json());                         // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded



//Database
const db = require(pathResolver.join(appDir,"models")); //load this directory (it's index.js)
//const { Server } = require("http");
db.sequelize.sync();

// Routing for static images/assets
app.use("/static",express.static(assetsDir));  // url, filesystem dir. remember the / on the FRONT of the url




// API 

const api = require("./app/api")(app); 
// Loads in /api/index.js & constructs API endpoints
// require() is equivalent of 'include', so external .js files can 
// supply functions to the application.
// require() statement has corresponding 'module.exports' statement in
// the .js file where we return functions that we want our app to have.
// we provide require() (and modules.export) with 'app' so the functions in the .js file
// can call app.get and all the other stuff API endpoints need.

// Also see global variable used to provide filesystem path to API functions.
// TODO: investigate passing database to api functions.

                 

app.get("/submit", (req, res) => {
  res.json({ message: "Sukrat working on submission form..." });
});


//Dish up a static HTML file at an endpoint
app.get("/boss", (req,res)=>{
  res.sendFile(
    appDir+"/markerSubmission/submission.html",               //res.sendFile needs a file to dish up on this url
    ()=>{console.log("an error occured when sending file")}   //res.sendFile needs to be provided with an anonymous function to execute if theres an error
    );
  }
);

// Another simple route
app.get(
        "/",        //endpoint
        (req,res)=>{
            //provide an arrow function which takes request & reply objects.
          res.send("<html><body background='/static/starface.gif'><div width='100%' align='middle'><font color='black' style='bold'><h1>Welcome to MARC.</h1><br><img src='/static/marc_wave_animation.gif'/><br><h3>Click <a href='/api'>HERE</a> to visit the API endpoint.</h3><h3> and click <a href= '/submit'>here</a> to submit marker form.</h3><img src='/static/tim-and-eric-mind-blown.gif' /></font></div></body></html>")
        }

);



/////////////////////////////////////////////////////////////
// Set port, listen for requests
// If we're on production MARC server, be port 80. Otherwise be port 8080 (unprivliged)
//
//
// This PORT stuff will all change once TLS/SSL is in the picture.
// May need to toggle TLS/SSL off when in dev mode, but TLS in production mode.
// https://dev.to/omergulen/step-by-step-node-express-ssl-certificate-run-https-server-from-scratch-in-5-steps-5b87

server = app.listen(PORT, () => {
  console.log(`Server is running:`);
  console.log(` Server Port: ${PORT}`)
  console.log(` Server Mode: ${isInProduction() ? "Production Mode" : "Development mode"}`)
  console.log(`      appDir: ${appDir}` );
  console.log(`Assets dir  : ${assetsDir}`)
  if (!isInProduction()  ) {console.log(`Visit http://localhost:${PORT}`)};
  console.log("\n")
  db.appDir
});
module.exports = server;