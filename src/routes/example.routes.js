module.exports = (app) => {
  //Example: provide json
  app.get("/gimmejson", (req, res) => {
    res.json({ message: "Welcome to MARC application.\n where the birds come out to fly. SQUARK!" });
  });

  //Example: provide plaintext
  app.get( "/sometext",(req,res) => { res.send("some html") });  //provide an arrow function which takes request & reply objects.


  //Example: Dish up a static HTML file at an endpoint (with exception checking)
  app.get("/boss", (req,res)=>{
    res.sendFile(
      "../frontend/submission.html",                                //res.sendFile needs a file to dish up on this url
      ()=>{console.log("an error occured when sending file")}   //res.sendFile needs to be provided with an anonymous function to execute if theres an error
      );
    }
  );

  app.get(
    "/api/moo",        //endpoint
    (req,res)=>{
        
        //provide an arrow function which takes request & reply objects.
        res.send("<html><body background='/static/stars.gif'><div width='100%' align='middle'><img src='/static/marc_wasted.png'/></div></body></html>")
    }
)
}