const express = require("express");
const app = express();
// ############################
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/MyAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("conected to db");
});
// ###########################
app.use("/assets", express.static("assets"));
// ############################
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ############################
const sudscribersRouter = require("./router/UsersRouter");
app.use("/User", sudscribersRouter);

// ############################

app.listen(5000, () => {
  console.log("Server Started");
});
