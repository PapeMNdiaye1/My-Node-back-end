const Posts = require("../../Models/PostModell");
const { post } = require("../UsersRouters");

// ###############################
exports.creatPost = (req, res) => {
  const post = new Posts({
    postImage: req.body.PostImage,
    postTitle: req.body.PostTitle,
    postDescription: req.body.PostDescription,
  });
  post
    .save()
    .then(() => {
      console.log("post Created");
      res.status(201).json({ NewPostid: post._id });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

// ###############################
