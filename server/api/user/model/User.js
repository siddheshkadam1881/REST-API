/****************************
* @author siddheshwar kadam
* @version 1.0
*****************************/
var mongoose = require('mongoose');
 var User = new mongoose.Schema({
  username: {
   type: String,
   // unique: true,
   required: true,
   trim: true
 },
 email: {
   type: String,
   // unique: true,
   required: true,
   trim: true
 },
 userpass: {
   type: String,
   required: true,
 },
 usermobile: {
   type: Number,
   required: true,
 },
 dob:
  {
    type: Date,
    required: true,
  },
 profilePicurl: {
   type:String
}

});

// User.methods.comparePassword=function(userpass){
// return bcrypt.compareSync(userpass,this.userpass);
// };

var User = mongoose.model('User', User);
module.exports = User;
