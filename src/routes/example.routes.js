module.exports = (app) => {
  //Example: provide json
  app.get("/api/gimmejson", (req, res) => {
    res.json({ message: "Welcome to MARC application.\n where the birds come out to fly. SQUARK!" });
  });

  //Example: provide plaintext
  app.get( "/sometext",(req,res) => { res.send("some html") });  //provide an arrow function which takes request & reply objects.


  app.get(
    "/api/moo",        //endpoint
    (req,res)=>{
        
        //provide an arrow function which takes request & reply objects.
        res.send("<html><body background='/assets/stars.gif'><div width='100%' align='middle'><img src='/assets/marc_wasted.png'/></div></body></html>")
    }
)
}