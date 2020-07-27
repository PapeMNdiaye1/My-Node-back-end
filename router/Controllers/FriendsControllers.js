// const Users = require("../../Models/UserModel");
const FriendsContainer = require("../../Models/FriendModel");

exports.getAllFriends = async (req, res) => {
  FriendsContainer.findOne({ userId: req.params.id })
    .select("friends")
    .then(function (result) {
      res.status(201).json({ allFriendsId: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ allFriendsId: "No Friend" });
    });
};
// ############################################################
exports.getAllFriendsAndFollowers = async (req, res) => {
  FriendsContainer.findOne({ userId: req.params.id })
    .select("friends followers")
    .then(function (result) {
      res.status(201).json({ allFriendsId: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ allFriendsId: "No Friend" });
    });
};
// ############################################################
exports.follow = async (req, res) => {
  var friend = await {
    friendId: req.body.Id,
    friendName: req.body.FriendName,
    friendEmail: req.body.FriendEmail,
    friendProfilePicture: req.body.friendProfilePicture,
  };
  FriendsContainer.findOneAndUpdate(
    { userId: req.params.id },
    { $push: { friends: friend } },
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
// ############################################################
exports.unFollow = (req, res) => {
  FriendsContainer.findOneAndUpdate(
    { userId: req.params.id },
    { $pull: { friends: { friendId: req.body.Id } } },
    (error, success) => {
      if (error) {
        console.log(error);
        res.status(400).json({ response: false });
      } else {
        console.log("UnFollow");
        res.status(201).json({ response: true });
      }
    }
  );
};
// ###########################################################
exports.addFollower = async (req, res) => {
  var follower = await {
    friendId: req.body.Id,
    friendName: req.body.FriendName,
    friendEmail: req.body.FriendEmail,
    friendProfilePicture: req.body.friendProfilePicture,
  };
  FriendsContainer.findOneAndUpdate(
    { userId: req.params.id },
    { $push: { followers: follower } },
    (error, success) => {
      if (error) {
        console.log(error);
        res.status(400).json({ response: false });
      } else {
        console.log("add follow");
        res.status(201).json({ response: true });
      }
    }
  );
};
// ###########################################################
exports.removeFollower = (req, res) => {
  FriendsContainer.findOneAndUpdate(
    { userId: req.params.id },
    { $pull: { followers: { friendId: req.body.Id } } },
    (error, success) => {
      if (error) {
        console.log(error);
        res.status(400).json({ response: false });
      } else {
        console.log("remove follow");
        res.status(201).json({ response: true });
      }
    }
  );
};
