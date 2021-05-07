
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
      
  require(__dirname+"/user.routes.js")(app);      
  require(__dirname+"/courses.routes.js")(app); 
  require(__dirname+"/students.routes.js")(app); 
  require(__dirname+"/mailer.routes.js")(app); 
}



 
