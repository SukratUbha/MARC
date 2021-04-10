// Module.exports is actually called when you run require("filename.js") from somewhere.
// Module.exports should equal an anonymous function (see below).
// I have supplied 'app' as an argument to modules.export:
// app is the object that represents Express & it has all the endpoint functions we
// like (such as get, post etc).
//
// As this is the js file at the root of /api, i have made it require other javascript files
// as an example of how to include more .js files for you to type out your API stuff.
// eg: it requires /api/moo.js. Visit it in your browser today.

module.exports = (app) => {
    //console.log("in api/index.js. global.appdir is: "+global.appDir)        
    
    require(global.appDir + "/api/moo.js")(app);            //example, pull in /api/moo.js
    
    // Lets define an endpoint for /api....
    // Calling app.get(url,fn) to define an endpoint at url.
    // You gotta supply a string for the endpoint URL, and an anonymous function 
    // which takes req, res (request,response).
    app.get(
        "/api",        //endpoint
        (req,res)=>{
            //provide an arrow function which takes request & reply objects.
            res.json({
                endpoints:[
                  "/login",
                  "/courses",
                "/students"
                ]}  
              )
           
        }
    )
    
}



 
