//Import libraries and expose them as classes. I think.
const Express = require("express");
const Sequelize = require("sequelize");
const BodyParser = require("body-parser");
const Cors = require("cors");
const config = require('config');
//Create an Express object called app.
const app = Express();
app.Express=Express;



//Are we on the production server? (Affects CORS, SSL Cert & TCP port)
function isInProduction(){  return process.cwd() == "/marc/MARC/Backend_NodeJS";}  //MARC is installed in this directory on the production server.
const PORT = isInProduction() ? 8080 : 8080;    //backend always on port 8080





//CORS
var corsOptionsJson = {
    origin: isInProduction() ? "http://marcdev.duckdns.org" +PORT : "http://localhost" +PORT,
  };
app.use(Cors(corsOptionsJson));





///HTML body types for serializing/deserializing objects
app.use(BodyParser.json());                           // parse requests of content-type - application/json
app.use(BodyParser.urlencoded({ extended: true }));   // parse requests of content-type - application/x-www-form-urlencoded




////////////////////////////
// DATABASE: The database is a GLOBAL variable. Tho Sequelize still require
// a Sequalize object to be passed around here & there (see models/index.js)
//
// DATABASE: Initialize global singleton Sequelize if not already
require("./controllers/database_creator.js");   //creats global.db
require(__dirname+"/models/index.js") // Create models (& thus tables)



// Create a new user 
//const User = require(__dirname+'/models/User.js');//fetch the Model definition
//const jane = User.create({ firstName: "Jane", lastName: "Doe" });
//console.log("Jane's auto-generated ID:", jane.id);


global.db.sync();                     // Persist to database first time. Call this often.


///////////////////////////////////////////////
// ROUTES
// Call several scripts to instantiate routes, construct controllers and link the controllers to the routes.
require(__dirname+'/routes/index.js')(app); 







/////////////////////////////////////////////////////////////
// LISTEN FOR CONNECTIONS
//
// If we're on production MARC server, be port 80. Otherwise be port 8080 (unprivliged)
//
//
// This PORT stuff will all change once TLS/SSL is in the picture.
// May need to toggle TLS/SSL off when in dev mode, but TLS in production mode.
// https://dev.to/omergulen/step-by-step-node-express-ssl-certificate-run-https-server-from-scratch-in-5-steps-5b87

server = app.listen(PORT,'127.0.0.1', () => {
  //don't show the log when it is in "test" environment
  if(config.util.getEnv('NODE_ENV') !== 'test') {
    console.log(`\n-----------------------------\nServer is running:`);
    console.log(` Server Port: ${PORT}`)
    console.log(` Server Mode: ${isInProduction() ? "Production Mode" : "Development mode"}`)
    console.log(`   __dirname: ${__dirname}` );
    if (!isInProduction()  ) {console.log(`\nVisit http://localhost:${PORT}`)};
    console.log("----------------------------\n")
  }
});


module.exports = server; //for testing purpose
//module.exports=global.db;
