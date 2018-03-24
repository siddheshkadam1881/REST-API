/****************************
@author siddheshwar kadam
@version 1.0
*****************************/
var router = require('express').Router();
var userController=require('../controller/userController.js');




router.post('/Register',userController.Register);
module.exports = router;
