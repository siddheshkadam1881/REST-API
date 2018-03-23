var express = require("express");
var User =  require("../model/User");
// var credential = require('./config.json');
// const fileUpload = require('express-fileupload');
// const app = express();
// app.use(fileUpload());
// exports.Register = function(req, res) {
//   var user = new User(req.body);
//   user.userpass = bcrypt.hashSync(req.body.userpass, 10);
//   user.save(function(err, user) {
//     if (err) {
//       return res.status(400).send({
//         message: err
//       });
//     } else {
//       user.userpass = undefined;
//       return res.json(user);
//     }
//   });
// };


exports.Register = function(req, res) {
    //create user
    try {
        req.checkBody("name", "Enter Name.").notEmpty();
        req.checkBody("email", "Enter a valid email address.").isEmail();
        req.checkBody("userpass", "Enter a valid password").matches(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/);
        req.checkBody("usermobile", "Enter a valid mob").matches(/^([7-9]{1}[0-9]{9})$/);
        req.checkBody("dob",  "Enter date of birthday in DD/MM/YYYY format").matches(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!req.files)
        return res.status(400).send('No files were uploaded.');
        var errors = req.validationErrors();
        if (errors) {
          throw errors;
            // res.send(errors[0]);
            // return;
        }
        else {
            var user = new User({
                local: {
                    username: req.body.name,
                    email: req.body.email,
                    userpass: req.body.userpass,
                    usermobile: req.body.usermobile,
                    dob: req.body.dob,
                    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                    // profilePic = req.files.profilePic;
                   profilePic : req.files.profilePic
                   // profilePic.mv('/somewhere/on/your/server/filename.jpg', function(err) {
                   // if (err)
                   // return res.status(500).send(err);
                   // res.send('File uploaded!');
                  // });
                }
            });
            // save the created user
            user.save(function(err) {
                try {
                    if (err) throw err;
                    console.log('User saved successfully');
                    res.send({
                        status: true,
                        description: "User saved successfully"
                    });
                } catch (e) {
                    res.send({
                        status: false,
                        description: "Email Aready Exist"
                    });
                }
            });
        }
    } catch (e) {
        console.log(e);
        res.send({
            status: false,
            description: "Please fill the correct information"
        });
    }
};
