const express = require("express");
const fileUpload = require("express-fileupload");
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = 8050;
app.use("/form", express.static(__dirname + "/../frontend/index.html"));
app.use("/pub", express.static(__dirname + "/../frontend/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// default options
app.use(fileUpload());

app.get("/ping", function (req, res) {
  res.send("pong");
});

app.post("/upload", function (req, res) {
  /*   let busboy = new Busboy({ headers: req.headers });
  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    let saveTo = path.join(__dirname, "uploads/" + filename);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on("finish", function () {
    res.writeHead(200, { Connection: "close" });
    res.end("That's all folks!");
  });

  return req.pipe(busboy);
 */
  console.log(req.body.filename);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  let sampleFile = req.files.sampleFile;
  let filename = req.body.filename + ".jpg";

  uploadPath = __dirname + "/uploads/" + filename;

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
