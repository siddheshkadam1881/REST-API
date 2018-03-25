/****************************
@author siddheshwar kadam
@version 1.0
*****************************/
var express = require("express");
var User =  require("../model/User");
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
const s3 = new AWS.S3();
var BUCKET_NAME = 'fundoo-notes-images';
var fs = require('fs');
var multer  = require('multer');
import * as Parallel from 'async-parallel';
// import parallel from './internal/parallel';

var storage =multer.diskStorage({
destination :function(req,file,callback)
 {
   callback( null,'./upload');
 },
 filename:function(req,file,callback)
 {
   callback(null,file.originalname);
 },
 });
 var upload = multer({storage : storage}).single('profilePic');


exports.Register = function(req, res) {

    upload(req,res,function(err){

      var userObj = req.body || {};
      var file = req.file;
       console.log(file);
      const params = {
      Bucket: BUCKET_NAME,
      Key: file.originalname,
      Body: file.path,
      ACL: 'public-read',
      ContentEncoding: 'base64', // required
      ContentType: `image`
      }
       // console.log(params);
      s3.upload(params, (err, data) => {
      if (err) { return console.log(err) }
      // Continue if no error
      // Save data.Location in your database
      console.log(data);
      console.log('Image successfully uploaded.');
      });


    //create user
        try {
        req.checkBody("username", "Enter Name.").notEmpty();
        req.checkBody("email", "Enter a valid email address.").isEmail();
        req.checkBody("userpass", "Enter a valid password").matches(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/);
        req.checkBody("usermobile", "Enter a valid user mobile").matches(/^([7-9]{1}[0-9]{9})$/);
        req.checkBody("dob",  "Enter date of birthday in DD/MM/YYYY format").matches(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (!req.file)
        return res.status(400).send('No files were uploaded.');
        var errors = req.validationErrors();
        if (errors) {
        throw errors;

        }
        else
        {

            var user = new User({
            username: req.body.username,
            email: req.body.email,
            userpass: req.body.userpass,
            usermobile: req.body.usermobile,
            dob: req.body.dob
          });
          // save the created user
          user.save(function(err) {
          try {
            if (err) throw err;
                          //console.log('User saved successfully');
                          res.send({
                              status: true,
                              description: "User saved successfully"
                          });
                      } catch (e) {
                        console.log(e);
                          res.send({
                              status: false,
                              description: "Email Aready Exist"
                          });
                      }
                  });
        }
    }
     catch (e) {
        console.log(e);
        res.send({
            status: false,
            description: "Please fill the correct information"
        });
    }
    });
};
