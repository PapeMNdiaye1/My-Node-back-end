const express = require("express");
const router = express.Router();
const UserCtrl = require("./controler/cotrolerUsers");

router.post("/signup", UserCtrl.signUp);
router.get("/get-user-infons/:UserEmail", UserCtrl.getUserInfos);

// const StuffCtrl2 = require("./controlers/controlersUser");

// ##################################################

module.exports = router;
