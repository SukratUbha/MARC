module.exports = (app) => {
    require(global.appDir + "/api/moo.js")(app);
    console.log("in api/index.js. global.appdir is: "+global.appDir)
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



 
