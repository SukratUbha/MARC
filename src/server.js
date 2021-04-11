//Import libraries and expose them as classes. I think.
const Express = require("express");
const Sequelize = require("sequelize");
const BodyParser = require("body-parser");
const Cors = require("cors");

//Create an Express object called app.
const app = Express();
app.Express=Express;

//Are we on the production server? (Affects CORS, SSL Cert & TCP port)
function isInProduction(){  return process.cwd() == "/marc/MARC/src";}  //MARC is installed in this directory on the production server.
const PORT = isInProduction() ? 80 : 8080;

//CORS
var corsOptionsJson = {  origin: isInProduction() ? "http://marc.thewholecake.co.nz" : "http://localhost:8080"};
app.use(Cors(corsOptionsJson));

///HTML body types for serializing/deserializing objects
app.use(BodyParser.json());                           // parse requests of content-type - application/json
app.use(BodyParser.urlencoded({ extended: true }));   // parse requests of content-type - application/x-www-form-urlencoded

//DATABASE: Initialize Sequelize
app.db = new Sequelize({       
  dialect: "sqlite",
  storage: __dirname+"/marcdatabase.sqlite"
});
console.log("Back-end database file: " +app.db.storage);


//DATABASE: Create models (& thus tables)
//const db = {};
//require(__dirname+"/routes/course.routes.js")(app);
//app.db.sync();

// ROUTES
require(__dirname+'/routes/index.js')(app);

//require(__dirname+"/routes/course.routes.js")(app);

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
  console.log(`      appDir: ${__dirname}` );
  if (!isInProduction()  ) {console.log(`Visit http://localhost:${PORT}`)};
  console.log("\n")
});


//module.exports = server; //for testing purpose