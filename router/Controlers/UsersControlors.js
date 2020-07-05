const bcrypt = require("bcrypt");
const Users = require("../../Models/UserModel");

// #############################
// CREAT USER
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
      console.log(user);
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
// ############################################
// User Login
exports.login = (req, res) => {
  Users.findOne({ email: req.body.Email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
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
// ###############################
// GET SING UP USER INFOS
exports.getUserInfos = (req, res) => {
  Users.findOne({ email: req.params.UserEmail })
    .select("_id username email profilepictur")
    .exec()
    .then(function (result) {
      res.status(201).send({ User: result });
    });
};
// ################################
// Updat User Posts
exports.AddNewPost = (req, res) => {
  // console.log(req.params.id);
  console.log(req.body);

  var PostId = { onePostId: req.body.PostId };
  Users.findOneAndUpdate(
    { _id: req.body.UserId },
    { $push: { posts: PostId } },
    function (error, success) {
      if (error) {
        console.log(error);
        res.status(400).send({ error });
      } else {
        res.status(201).send({ postsCreated: true });
      }
    }
  );
};
