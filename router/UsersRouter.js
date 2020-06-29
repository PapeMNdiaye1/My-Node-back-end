const express = require("express");
const router = express.Router();
const StuffCtrl = require("./controler/cotrolerUsers");

router.post("/", StuffCtrl.nimp);

// const StuffCtrl2 = require("./controlers/controlersUser");

// ##################################################

module.exports = router;
