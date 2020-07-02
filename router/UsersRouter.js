const express = require("express");
const router = express.Router();
const UserCtrl = require("./controler/cotrolerUsers");

// ############################################
// User Signup
router.post("/signup", UserCtrl.signUp);

// ############################################
// User Login
router.post("/login", UserCtrl.login);

// ############################################
// Get User In infos
router.get("/get-user-infons/:UserEmail", UserCtrl.getUserInfos);

// ##################################################

module.exports = router;
