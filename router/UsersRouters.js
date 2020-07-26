const express = require("express");
const router = express.Router();
const UserCtrl = require("./Controlers/UsersControlors");

// ############################################
router.post("/signup", UserCtrl.signUp);
// ############################################
router.post("/login", UserCtrl.login);
// ############################################
router.get("/get-user-infons/:UserEmail", UserCtrl.getUserInfos);
// ############################################
router.get("/get-user-profile/:id", UserCtrl.getUserProfile);
// ############################################
router.delete("/delete-one-user/:id", UserCtrl.deleteUser);
// ############################################
router.get("/get-all-liked-posts/:id", UserCtrl.getAllLikedPosts);
// ############################################
router.get("/get-last-users", UserCtrl.getLastUsers);
// ############################################
router.get("/get-some-users/:id", UserCtrl.getSaomeUsers);

module.exports = router;
