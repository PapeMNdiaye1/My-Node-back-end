const mongoose = require("mongoose");

// ##########################################################
const frindesSchema = new mongoose.Schema({
  frindeId: {
    type: String,
    required: true,
  },
  frindeName: {
    type: String,
    required: true,
  },
  frindeEmail: {
    type: String,
    required: true,
  },
  frindeProfilepictur: {
    type: String,
    required: true,
  },
});

const frindesContainerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  frindes: {
    type: [frindesSchema],
  },
  followers: {
    type: [frindesSchema],
  },
});

module.exports = mongoose.model("FrindesContainer", frindesContainerSchema);
