module.exports =(app) => {
    
    const register = require("../controllers/register.controller.js"); //instantiating a new object
    var router = require("express").Router();       // a NEW 'Router' object. Gets globally configured to live under '/api/courses'. see blow.
    var nodemailer = require('nodemailer');

    //Construct a nodeMailer object & send an email.
    //Requires json back-end configuration (transport) and json config for an email to send.
    
    var transport = {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'cockpit.marc@gmail.com',//creds.USER,   //should include this info in the config file
            pass: 'subjecttochange' //creds.PASS
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

    //register an Express endpoint and provide a function to it. Our function calls transporter.sendMail which needs some constructed json as an argument. It also needs a callback-function provided as an argument, so we can obtain access to any errors.
    app.post("/api/sendMyEmail", (req, res, next) => {
        //TODO: Check for authentication on public-facing endpoint.
        var subject = req.body.subject
        console.log(subject);
        var email = req.body.email
        var message = req.body.message
        var content = `subject: ${subject} \n\n message: ${message} \n\n Please reply to this email for further enquiries `
        //var content = `subject: ${subject} \n email: ${email} \n message: ${message} \n\n Please forward any queries to burkhard@cs.auckland.ac.nz `    
        var mail_options = {
            from: 'cockpit.marc@gmail.com',
            bcc: email,  // Change to email address that you want to receive messages on// use 'to: email' to show other recipients
            //bcc: is used above to send to (multiple) recipient- the recipient will not see the other receiving addresses
            subject: subject,
            text: content,
            replyTo: "burkhard@cs.auckland.ac.nz" // CHANGE TO BURKHARD'S ADDRESS burkhard@cs.auckland.ac.nz in production
        }

        //call transporter.sendMail function to send email. provide mail_options json and provide a callback-function to retreive any error status.
        //our injected callback function will all Express' res.json to return success or failure to the client.
        transporter.sendMail(

            //our email specified as json
            mail_options,           

            //anonymous callback function. return status to client
            //TODO: res.status
            (err, data) =>{
                if (err){
                    res.json( {status: 'fail'}      )
                } else {
                    res.json( {status: 'success'}   )
                }
            }

        )
    })
}