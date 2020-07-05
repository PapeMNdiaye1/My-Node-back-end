const express = require("express");
const router = express.Router();
const PostCtrl = require("./Controlers/PostsControlors");
// ########################################
router.post("/creat-post", PostCtrl.creatPost);
// ########################################
module.exports = router;
