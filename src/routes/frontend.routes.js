module.exports = (app)=>{
    app.use("/",app.Express.static('../frontend/index.html'));    //browser finds /index.html in here i think.

}