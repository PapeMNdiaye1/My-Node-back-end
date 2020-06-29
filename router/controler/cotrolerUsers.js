const Users = require("../../Models/UserModel");

exports.nimp = async (req, res) => {
  console.log(req.body);

  let user = await new Users({
    username: req.body.Name,
    email: req.body.Email,
    password: req.body.Password,
  });
  user
    .save()
    .then(console.log("ok"))
    .catch((error) => res.status(400).json({ error: "N1" }));

  res.json({ mes: "eeeeeeee" });
};
