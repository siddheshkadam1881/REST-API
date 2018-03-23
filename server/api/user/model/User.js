var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
 var User = new mongoose.Schema({
  username: {
   type: String,
   unique: true,
   required: true,
   trim: true
 },
 email: {
   type: String,
   unique: true,
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
  { type: Date,
    required: true,
  },
 profilePic: {
   data: Buffer
}

});

// User.methods.comparePassword=function(userpass){
// return bcrypt.compareSync(userpass,this.userpass);
// };

var User = mongoose.model('User', User);
module.exports = User;
