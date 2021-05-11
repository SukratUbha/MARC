module.exports =(app) => {

    const register = require("../controllers/register.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    const multer = require("multer");
    const upload = multer();
    const fs = require("fs");
    const { promisify } = require("util");
    const pipeline = promisify(require("stream").pipeline);

    //used to store registration form file and data
    router.post("/api/uploadregistrationform", upload.single("file"), async function(req, res, next) {  //upload form needs to be connected
        const {
          file,
          body: { name,
                  //lastName,
                  //email,
                  //password,
                  //and the rest
                 }
        } = req;
      
        const fileName = firstname + file.detectedFileExtension;
        await pipeline(
          file.stream,
          fs.createWriteStream(`${__dirname}/../public/images/${fileName}`)
        );
      
        res.send("File uploaded as " + fileName);
      });

    // Create a new Student
    router.post("/api/registerStudent", register.registerStudent)   //Saw the add to server request on register.js, this can be modified to crud to db. 
    //So, ill leave this here until further clarity under /api/registerStudent  

    app.post("/api/markerstest", (req,res)=>{
      const {
        file,
        body: { name,
                //lastName,
                //email,
                //password,
                //and the rest
               }
      } = req;
      console.log(req.body);
      //console.log(req.body.fname);
    })

    // Retrieve all Students

    // Retrive single Student


    //mount the router on the app
    app.use('/api/students', router);
}