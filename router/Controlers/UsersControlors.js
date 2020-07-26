const bcrypt = require("bcrypt");
const Users = require("../../Models/UserModel");
const FrindesContainer = require("../../Models/FrindeModel");

// ######################################################################################
exports.signUp = (req, res) => {
  bcrypt
    .hash(req.body.Password, 10)
    .then((hash) => {
      const user = new Users({
        username: req.body.Name,
        email: req.body.Email,
        password: hash,
        profilepictur: req.body.ProfilePictur,
      });
      user
        .save()
        .then(() => {
          console.log(user._id);
          const frindesContainer = new FrindesContainer({
            userId: user._id,
          });
          frindesContainer
            .save()
            .then(() => {
              console.log("User Created");
              res.status(201).json({ UserLogin: true });
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json({ error });
            });
        })
        .catch((error) => {
          if (error.errors.email.path == "email") {
            res.status(403).json({ UserLogin: "Email Olredy Existed" });
          } else {
            console.log(error);
            res.status(400).json({ error });
          }
        });
    })
    .catch((error) => res.status(500).json({ error }));
};
// #######################################################################################
exports.login = (req, res) => {
  // console.log(req.body.Email);
  Users.findOne({ email: req.body.Email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ UserLogin: false });
      }
      bcrypt
        .compare(req.body.Password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .send({ UserLogin: "Mot de passe incorrect !" });
          }
          res.status(200).send({
            UserLogin: true,
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) => res.status(500).json({ UserLogin: false }));
    })
    .catch((error) => res.status(500).json({ UserLogin: false }));
};
// ######################################################################################
exports.getUserInfos = (req, res) => {
  Users.findOne({ email: req.params.UserEmail })
    .select("_id username email profilepictur allLikedPosts")
    .then(function (result) {
      res.status(201).send({ User: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ User: false });
    });
};
// ######################################################################################
exports.getUserProfile = (req, res) => {
  Users.findOne({ _id: req.params.id })
    .select("username email profilepictur allLikedPosts")
    .then((result) => {
      res.status(201).send({ User: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
// ###############################################################################
exports.deleteUser = (req, res) => {
  try {
    Users.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Users Deleted");
        res.status(201).json({ message: true });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ###############################################################################
exports.getAllLikedPosts = (req, res) => {
  Users.findOne({ _id: req.params.id })
    .select("allLikedPosts")
    .then((allLikedPosts) => {
      res.status(201).json({ response: allLikedPosts });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ response: false });
    });
};
// ###############################################################################
exports.getLastUsers = (req, res) => {
  Users.find()
    .sort({ _id: -1 })
    .limit(5)
    .select("_id username profilepictur email")
    .then(function (result) {
      res.status(201).json({ User: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ User: false });
    });
};
// ###############################################################################
exports.getSaomeUsers = (req, res) => {
  console.log(req.params.id);
  Users.find()
    .sort({ _id: -1 })
    .skip(Number(req.params.id))
    .limit(5)
    .select("_id username profilepictur email")
    .then((result) => {
      if (result) {
        console.log("GET SOME User");
        res.status(200).json({ User: result });
      } else {
        res.status(404).json({ User: "db is empty" });
      }
    })
    .catch((err) => {
      res.status(500).json({ User: err.message });
    });
};
