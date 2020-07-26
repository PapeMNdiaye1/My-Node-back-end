// const Users = require("../../Models/UserModel");
const FrindesContainer = require("../../Models/FrindeModel");

exports.getAllFrindes = async (req, res) => {
  console.log(req.params.id);
  FrindesContainer.findOne({ userId: req.params.id })
    .select("frindes")
    .then(function (result) {
      res.status(201).json({ allFrindesId: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ allFrindesId: "No Frinde" });
    });
};
// ############################################################
exports.follow = async (req, res) => {
  var frinde = await {
    frindeId: req.body.Id,
    frindeName: req.body.FrindeName,
    frindeEmail: req.body.FrindeEmail,
    frindeProfilepictur: req.body.FrindeProfilepictur,
  };
  FrindesContainer.findOneAndUpdate(
    { userId: req.params.id },
    { $push: { frindes: frinde } },
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
  FrindesContainer.findOneAndUpdate(
    { userId: req.params.id },
    { $pull: { frindes: { frindeId: req.body.Id } } },
    (error, success) => {
      if (error) {
        console.log(error);
        res.status(400).json({ response: false });
      } else {
        console.log("Unfollow");
        res.status(201).json({ response: true });
      }
    }
  );
};
// ###########################################################
exports.addFollower = async (req, res) => {
  var follower = await {
    frindeId: req.body.Id,
    frindeName: req.body.FrindeName,
    frindeEmail: req.body.FrindeEmail,
    frindeProfilepictur: req.body.FrindeProfilepictur,
  };
  FrindesContainer.findOneAndUpdate(
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
  FrindesContainer.findOneAndUpdate(
    { userId: req.params.id },
    { $pull: { followers: { frindeId: req.body.Id } } },
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
