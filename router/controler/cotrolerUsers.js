const Users = require("../../Models/UserModel");

exports.signUp = async (req, res) => {
  console.log(req.body);
  let user = await new Users({
    username: req.body.Name,
    email: req.body.Email,
    password: req.body.Password,
  });
  try {
    let newUser = await user.save();
    console.log("USER CREATED");
    res.status(201).send({ UserLogin: true });
  } catch (err) {
    if (err.code == 11000) {
      console.log("Duplicata Email");
      res.status(403).send({ UserLogin: "Email Olredy Existed" });
    }
  }
};

exports.getUserInfos = (req, res) => {
  Users.findOne({ email: req.params.UserEmail }).then(function (result) {
    res.status(201).send({ User: result });
  });
};
