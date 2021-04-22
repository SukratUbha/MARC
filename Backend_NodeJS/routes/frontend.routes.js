module.exports = (app)=>{
    express=require("express");
    path=require("path");
    const upload = require('express-fileupload');
    frontEndDir = path.join(__dirname, '../frontend');
    app.use('/', express.static(frontEndDir))    //browser finds /index.html in here i think. 


  app.post("/login",(req,res)=>{

    //res.text("hey boss, its spencer testing git push");
  });
  //Example: Dish up a static HTML file at an endpoint (with exception checking)
  app.use(upload());
  app.get("/submit", (req,res)=>{

    var options = {
        root: frontEndDir,
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    
    res.sendFile(  
      "submission.html",                                //res.sendFile needs a file to dish up on this url
      options,
      (err)=>{ if (err) console.log("an error occured when sending file:"+err)}   //res.sendFile needs to be provided with an anonymous function to execute if theres an error
      );
    }
  );
  app.post("/submit", (req,res) => {
     if(req.files) { 
      //  console.log(req.files);
       var file = req.files.studentCV;
       var filename = file.name;
       console.log(file.name);

       file.mv(path.join(__dirname,'../Uploads/') + filename, (err) =>{
         if(err){
           res.send(err);
         } else {
           res.send("File Uploaded")
         }
       });
     }
  })


}