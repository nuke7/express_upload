const express = require("express");
const fileUpload = require("express-fileupload");
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = 8050;
app.use("/form", express.static(__dirname + "/../frontend/index.html"));
app.use("/pub", express.static(__dirname + "/../frontend/public"));

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
  console.log(req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + "/uploads/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded to " + uploadPath);
  });
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});
