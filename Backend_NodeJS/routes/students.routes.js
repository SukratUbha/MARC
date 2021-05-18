module.exports =(app) => {

    const register = require("../controllers/register.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    const multer = require("multer");
    const upload = multer();
    const fs = require("fs");
    const { promisify } = require("util");
    const pipeline = promisify(require("stream").pipeline);

    //used to store registration form file and data
    app.post("/api/uploadregistrationform", upload.single("file"), async function(req, res, next){  //upload form needs to be connected
      try{
        console.log("IN THE Router STUDENT FUNCITON"); 
        const {
            file,
            body: { firstName,
                    lastName,
                    email,
                    fPref,
                    sPref,
                    tPref,
                    hours,
                    description                    
                  }
          } = req;
          const fileName = firstName + lastName + file.detectedFileExtension;
          cvLocation = __dirname + '/../Uploads/'+ fileName
          console.log(fileName);
          await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../Uploads/${fileName}`)
          );
          
          let regVal = await register.registerStudent(req,res,cvLocation);
          res.send("Registered");
          
      } catch(err){
        res.send("Not Registered");
      }
      });

    // Create a new Student
    // router.post("/api/registerStudent", register.registerStudent)   //Saw the add to server request on register.js, this can be modified to crud to db. 
    //So, ill leave this here until further clarity under /api/registerStudent  

    // Retrieve all Students
    router.get("/", register.getAllStudents);

    // Retrive single Student
    router.get("/id:id", register.getStudent);

    //mount the router on the app
    app.use('/api/students', router);
}