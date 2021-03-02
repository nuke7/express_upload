import "./App.css";
import { useEffect, useState } from "react";

let fd = new FormData();

function App() {
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    if (upload) {
      fetch("http://localhost:8050/upload", {
        method: "POST",
        mode: "cors",
        /*   headers: {
          "Content-Type": "multipart/form-data",
        }, */
        body: fd,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => (document.getElementById("image").src = `${data.link}`))
        .then(setUpload(false))
        .then((fd = new FormData()));
    }
  }, [upload]);

  const uploadFunc = () => {
    fd.append("filename", document.getElementById("userName").value);
    fd.append("sampleFile", document.getElementById("sampleFile").files[0]);
    setUpload(true);
  };

  return (
    <div className="App">
      <input type="file" name="sampleFile" id="sampleFile" />

      <br />
      <label htmlFor="userName">fileName:</label>
      <input type="text" name="userName" id="userName" />
      <br />
      <input type="button" value="Upload!" id="upload" onClick={() => uploadFunc()} />

      <div id="pictureWrapper">
        <img style={{ width: "90%", marginTop: "1rem" }} id="image" src="" alt="" />
      </div>
    </div>
  );
}

export default App;
