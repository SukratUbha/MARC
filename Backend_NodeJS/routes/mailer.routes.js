module.exports =(app) => {

    const register = require("../controllers/register.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    var nodemailer = require('nodemailer');
    // var cors = require('cors');
    // const creds = require('./config');

    var transport = {
        host: 'smtp.example.com', // Don’t forget to replace with the SMTP host of your provider
        port: 587,
        auth: {
        user: creds.USER,
        pass: creds.PASS
    }
    }

    var transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
    });

    router.post("/api/sendMyEmail", (req, res, next) => {
    var subject = req.body.subject
    var email = req.body.email
    var message = req.body.message
    var content = `subject: ${subject} \n email: ${email} \n message: ${message} `

    var mail = {
        from: email,
        to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  // Change to email address that you want to receive messages on
        subject: subject,
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
        res.json({
            status: 'fail'
        })
        } else {
        res.json({
        status: 'success'
        })
        }
    })
    })

    // app.post("/api/sendMyEmail", (req,res)=>{
    //     console.log("IAMHERE22");
    // })
}