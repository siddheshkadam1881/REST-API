exports.Register = function(req, res) {
  var user = new User(req.body);
  user.userpass = bcrypt.hashSync(req.body.userpass, 10);
  user.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.userpass = undefined;
      return res.json(user);
    }
  });
};
