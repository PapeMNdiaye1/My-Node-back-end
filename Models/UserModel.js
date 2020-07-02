const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postIdSchema = new mongoose.Schema({
  onePostId: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepictur: {
    type: String,
    required: false,
    default: "http://localhost:3333/assets/style/images/profile2.jpg",
  },
  posts: {
    type: [postIdSchema],
    required: false,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", userSchema);
