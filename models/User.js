const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  githubId: String,
  thumbnail: String
});

module.exports = mongoose.model("User", UserSchema);
