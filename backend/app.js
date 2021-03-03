const express = require("express");
const fileUpload = require("express-fileupload");
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const app = express();
const cors = require("cors");

const PORT = 8050;
app.use("/form", express.static(__dirname + "/../frontend2/index.html"));
app.use("/pub", express.static(__dirname + "/../frontend2/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

let userData;

// default options
app.use(fileUpload());
app.use(cors());

fs.readFile("./uploads/data.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  userData = JSON.parse(data);
});

app.get("/ping", function (req, res) {
  res.send("pong");
});

app.post("/upload", function (req, res) {
  console.log(req.body.filename);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  let sampleFile = req.files.sampleFile;
  let filename = req.body.filename + ".jpg";
  userData.push(JSON.parse(req.body.userData));

  uploadPath = __dirname + "/uploads/" + filename;

  fs.writeFile("./uploads/data.json", JSON.stringify(userData), function (err) {
    if (err) throw err;
  });

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    /* res.send("File uploaded to " + uploadPath); */
    res.json({ link: `http://localhost:8050/uploads/${filename}` });
  });
});

app.get("/download", function (req, res) {
  console.log(req.query);
  /* res.sendFile(__dirname + "/uploads/" + req.query.query + ".jpg"); */
  res.json({ link: `http://localhost:8050/uploads/${req.query.query}.jpg` });
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});
