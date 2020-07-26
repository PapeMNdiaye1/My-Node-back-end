const express = require("express");
const router = express.Router();
const FrindeCtrl = require("./Controlers/FrindesControlors");

// ############################################
router.get("/get-all-frindes/:id", FrindeCtrl.getAllFrindes);
// ############################################
router.post("/follow/:id", FrindeCtrl.follow);
// ############################################
router.post("/unFollow/:id", FrindeCtrl.unFollow);
// ############################################
router.post("/add-follower/:id", FrindeCtrl.addFollower);
// ############################################
router.post("/remove-follower/:id", FrindeCtrl.removeFollower);

module.exports = router;
