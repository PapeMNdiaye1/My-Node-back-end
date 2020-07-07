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
  Users.findOne({ email: req.body.Email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not fund !" });
      }
      bcrypt
        .compare(req.body.Password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ error: "Mot de passe incorrect !" });
          }
          res.status(200).send({
            UserLogin: true,
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// ######################################################################################
exports.getUserInfos = (req, res) => {
  Users.findOne({ email: req.params.UserEmail })
    .select("_id username email profilepictur allLikedPosts")
    .then(function (result) {
      res.status(201).send({ User: result });
    });
};
// ######################################################################################
exports.getUserProfile = (req, res) => {
  Users.findOne({ _id: req.params.id })
    .select("username email profilepictur allLikedPosts")
    .then(function (result) {
      res.status(201).send({ User: result });
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
