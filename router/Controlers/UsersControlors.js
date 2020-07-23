const bcrypt = require("bcrypt");
const Users = require("../../Models/UserModel");

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
          console.log("User Created");
          res.status(201).send({ UserLogin: true });
        })
        .catch((error) => {
          if (error.errors.email.path == "email") {
            console.log("Duplicata Email");
            res.status(403).send({ UserLogin: "Email Olredy Existed" });
          } else {
            console.log(error);
            res.status(400).send({ error });
          }
        });
    })
    .catch((error) => res.status(500).send({ error }));
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
// ##############################################################################
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
// ##############################################################################
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
// ##############################################################################
exports.getAllUsers = (req, res) => {
  Users.find()
    .select("_id username profilepictur")
    .then(function (result) {
      res.status(201).send({ User: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ User: false });
    });
};
