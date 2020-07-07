const Posts = require("../../Models/PostModell");
const Users = require("../../Models/UserModel");
// ##############################################################################
exports.creatPost = (req, res) => {
  // console.log(req.body);
  const post = new Posts({
    postAuthorId: req.body.UserId,
    postAuthorPictur: req.body.UserProfilePictur,
    postAuthorName: req.body.UserName,
    postImage: req.body.PostImage,
    postImageId: req.body.PostImageId,
    postTitle: req.body.PostTitle,
    postDescription: req.body.PostDescription,
    postDate: req.body.PostDate,
  });
  post
    .save()
    .then(() => {
      console.log("Post Created");
      res.status(201).json({ NewPostid: post._id });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
// ##############################################################################
exports.getLastPost = (req, res) => {
  Posts.find()
    .sort({ postDate: -1 })
    .limit(5)
    .select(
      "_id postTitle nofLikes postDescription postImage postImageId postAuthorId postAuthorPictur postAuthorPictur postAuthorName postDate"
    )
    .then((allposts) => {
      if (allposts) {
        console.log("GET LAST POST");
        res.status(200).json({ allposts: allposts });
      } else {
        res.status(404).json({ allposts: "db is empty" });
      }
    })
    .catch((err) => {
      res.status(500).send({ messages: err.message });
    });
};
// ##############################################################################
exports.getSomePost = (req, res) => {
  Posts.find()
    .sort({ postDate: -1 })
    .skip(Number(req.params.id))
    .limit(2)
    .select(
      "_id postTitle nofLikes postDescription postImage postImageId postAuthorId postAuthorPictur postAuthorPictur postAuthorName postDate"
    )
    // .exec()
    .then((allposts) => {
      if (allposts) {
        console.log("GET SOME POST");
        res.status(200).json({ allposts: allposts });
      } else {
        res.status(404).json({ allposts: "db is empty" });
      }
    })
    .catch((err) => {
      res.status(500).send({ messages: err.message });
    });
};
// ##############################################################################
exports.getAllMyPost = (req, res) => {
  Posts.find({ postAuthorId: req.params.id })
    .select(
      "_id postTitle nofLikes postDescription postImage postImageId postAuthorId postAuthorPictur postAuthorPictur postAuthorName postDate postResponses"
    )
    .then((allposts) => {
      if (allposts) {
        console.log("ONLY MY POST");
        res.status(200).json({ allposts: allposts.reverse() });
      } else {
        res.status(404).json({ allposts: "db is empty" });
      }
    })
    .catch((err) => {
      res.status(500).send({ messages: err.message });
    });
};
// ##############################################################################
exports.deletePost = async (req, res) => {
  try {
    var thePostToDelete = await req.params.id;
    Posts.deleteOne({ _id: thePostToDelete }, (err) => {
      if (err) {
        console.log(error);
      } else {
        console.log("post-deleted");
        res.status(201).json({ message: true });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
// ##############################################################################
exports.getOnePost = async (req, res) => {
  Posts.findOne({ _id: req.params.id })
    .then(function (result) {
      res.status(201).send({ Post: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ Post: "Post not fund" });
    });
};
// ##############################################################################
exports.addNewResponse = (req, res) => {
  var response = {
    authorId: req.body.AuthorId,
    responseAuthorName: req.body.ResponseAuthorName,
    responseAuthorPictur: req.body.ResponseAuthorPictur,
    response: req.body.Response,
    responseDate: req.body.ResponseDate,
  };
  Posts.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { postResponses: response } },
    (error, success) => {
      if (error) {
        console.log(error);
        res.status(400).json({ response: false });
      } else {
        console.log(success);
        res.status(201).json({ response: true });
      }
    }
  );
};
// ##############################################################################
exports.getAllResponsesOfOnePost = (req, res) => {
  console.log(req.params.id);
  Posts.findOne({ _id: req.params.id })
    .select("postResponses")
    // .exec()
    .then((allresponse) => {
      if (allresponse) {
        res.status(200).json({ allresponse: allresponse });
      } else {
        res.status(404).json({ allresponse: "db is empty" });
      }
    })
    .catch((err) => {
      res.status(500).send({ messages: err.message });
    });
};
// ##############################################################################
exports.likeAndDislike = async (req, res) => {
  let likedpost = {
    _id: req.params.id,
  };
  if (req.body.operation === "like") {
    Posts.findOneAndUpdate(
      { _id: req.params.id },
      { nofLikes: req.body.N }
    ).then(
      Users.findOneAndUpdate(
        { _id: req.body.UserId },
        { $push: { allLikedPosts: likedpost } },
        (error, success) => {
          if (error) {
            console.log(error);
            res.status(400).json({ response: false });
          } else {
            console.log("Like");
            res.status(201).json({ response: true });
          }
        }
      )
    );
  } else {
    Posts.findOneAndUpdate(
      { _id: req.params.id },
      { nofLikes: req.body.N }
    ).then(
      Users.findOneAndUpdate(
        { _id: req.body.UserId },
        { $pull: { allLikedPosts: likedpost } },
        (error, success) => {
          if (error) {
            console.log(error);
            res.status(400).json({ response: false });
          } else {
            console.log("Dislike");
            res.status(201).json({ response: true });
          }
        }
      )
    );
  }
};
