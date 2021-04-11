//express = require("express");     //required for static Express functions

// Module.exports is actually called when you run require("filename.js") from somewhere.
// Module.exports should equal an anonymous function (see below).
// I have supplied 'app' as an argument to modules.export:
// app is the object that represents Express & it has all the endpoint functions we
// like (such as get, post etc).
//
// As this is the js file at the root of /routes, i have made it require other javascript files
// as an example of how to include more .js files ( for you to type out your API stuff).
// eg: it requires moo.js. Visit it in your browser today.




module.exports = (app) => {
  console.log(__dirname +"/index.js imports being ran");

  //Pull in other JS files to mount their routes to
  require(__dirname+"/moo.js")(app);            //example, pull in /api/moo.js
  require(__dirname+"/frontend.js")(app);       //example, pull in /

 
  //Example: provide json
  app.get("/gimmejson", (req, res) => {
    res.json({ message: "Welcome to MARC application.\n where the birds come out to fly. SQUARK!" });
  });

  //Example: provide plaintext
  app.get( "/sometext",(req,res) => { res.send("some html") });  //provide an arrow function which takes request & reply objects.


  //Example: Dish up a static HTML file at an endpoint (with exception checking)
  app.get("/boss", (req,res)=>{
    res.sendFile(
      appDir+"/submission.html",                                //res.sendFile needs a file to dish up on this url
      ()=>{console.log("an error occured when sending file")}   //res.sendFile needs to be provided with an anonymous function to execute if theres an error
      );
    }
  );

  
    
}



 
