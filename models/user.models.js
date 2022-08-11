const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = model("User", userSchema);
