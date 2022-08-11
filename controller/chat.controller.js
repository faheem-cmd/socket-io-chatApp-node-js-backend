const User = require("../models/user.models");

function addUser(req, res, next) {
  console.log(req.body);
  let name = req.body.name;
  let user = new User({
    name,
  });
  user.save().then((data) => {
    res.send(data);
  });
}

function getUser(req, res, next) {
  User.find({}).then((data) => {
    res.status(200).json({ status: "success", data: data });
  });
}

module.exports = { addUser, getUser };
