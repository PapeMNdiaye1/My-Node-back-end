const express = require("express");
// const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const app = express();

// ############################
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ###################################################
//                 ? MONGODB
const mongoURI = "mongodb://localhost/MyAPI";
mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const conn = mongoose.connection;
conn.on("error", (error) => {
  console.log(error);
});
// Init gfs
let gfs;
conn.once("open", () => {
  console.log("db Conected");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// ############################
const sudscribersRouter = require("./router/UsersRouters");
app.use("/User", sudscribersRouter);
const PostsRouter = require("./router/PostsRouters");
app.use("/Post", PostsRouter);
const FollowRouter = require("./router/FriendsRouters");
app.use("/Follow", FollowRouter);

// ?#####################################################################################
// @route POST /upload
// @desc  Uploads file to DB (files are stored in the data base)
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});
// ###########################################
// @route GET /image/:filename
// @desc Display Image
app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // Check if image
    if (
      file.contentType === "image/jpeg" ||
      file.contentType === "image/png" ||
      file.contentType === "image/gif"
    ) {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});
// ##########################################
// @route DELETE /files/:id
// @desc  Delete file
app.delete("/files/:id", (req, res) => {
  console.log(req.params.id);
  gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    } else {
      console.log("picture Deleted");
      return res.status(201).json({ message: true });
    }
  });
});

// ?######################################################################################
const Port = process.env.Port || 5000;
app.listen(Port, () => {
  console.log(`Server started on port ${Port}`);
});
