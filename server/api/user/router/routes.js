var router = require('express').Router();
var userController=require('../controller/userController.js');




router.post('/Register',userController.Register);
module.exports = router;
