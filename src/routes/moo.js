module.exports = (app) => {
    app.get(
        "/api/moo",        //endpoint
        (req,res)=>{
            
            //provide an arrow function which takes request & reply objects.
            res.send("<html><body background='/static/stars.gif'><div width='100%' align='middle'><img src='/static/marc_wasted.png'/></div></body></html>")
        }
    )
    
}

