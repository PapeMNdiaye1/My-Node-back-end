const mongoose = require("mongoose");

let dt = new Date();
let postDate = `${(dt.getMonth() + 1)
  .toString()
  .padStart(2, "0")}/${dt
  .getDate()
  .toString()
  .padStart(2, "0")}/${dt
  .getFullYear()
  .toString()
  .padStart(4, "0")} ${dt
  .getHours()
  .toString()
  .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`;

const responseSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  responseDate: {
    type: String,
    required: false,
    default: postDate,
  },
});

const postSchema = new mongoose.Schema({
  postImage: {
    type: String,
    required: false,
    default: "http://localhost:3333/assets/style/images/profile2.jpg",
  },
  postTitle: {
    type: String,
    required: true,
  },
  postDescription: {
    type: String,
    required: true,
  },
  postDate: {
    type: String,
    required: true,
    default: postDate,
  },
  postResponses: {
    type: [responseSchema],
    required: false,
  },
});

module.exports = mongoose.model("Posts", postSchema);
