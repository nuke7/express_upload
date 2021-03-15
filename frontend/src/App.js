import "./App.css";
import { useEffect, useState } from "react";

let fd = new FormData();
function App() {
  const [upload, setUpload] = useState(false);
  let data = {};

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
        .then((resp) => (document.getElementById("image").src = `${resp.link}`))
        .then(setUpload(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        .then((fd = new FormData()));
    }
  }, [upload]);

  const uploadFunc = () => {
    const elementList = document.querySelectorAll(".userData");
    fd.append("filename", document.getElementById("userName").value);
    fd.append("sampleFile", document.getElementById("sampleFile").files[0]);
    for (let elem of elementList) {
      data[elem.name] = elem.value;
    }
    fd.append("userData", JSON.stringify(data));
    if (Object.entries(data).length !== 0) {
      setUpload(true);
      console.log(data);
    } else {
      console.log("data is empty");
    }
  };

  return (
    <div className="App">
      <div className="inner">
        <div className="wrapper">
          <h3>Contact Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p>
          <input type="file" name="sampleFile" id="sampleFile" />
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="userName"
              id="userName"
              required
            />
            <span>fileName:</span>
            <span className="border"></span>
          </div>
          <h3>User Location Data</h3>
          <div className="form-group">
            <input
              className="userData form-control"
              type="text"
              name="name"
              id="name"
              required
            />
            <span>Full Name:</span>
            <span className="border"></span>
          </div>
          <div className="form-group">
            <input
              className="userData form-control"
              type="email"
              name="email"
              id="email"
              required
            />
            <span>Email:</span>
            <span className="border"></span>
          </div>
          <div className="form-group">
            <input
              className="userData form-control"
              type="number"
              name="zip"
              id="zip"
              required
            />
            <span>ZipCode:</span>
            <span className="border"></span>
          </div>
          <div className="form-group">
            <input
              className="userData form-control"
              required
              type="text"
              name="city"
              id="city"
            />
            <span>City:</span>
            <span className="border"></span>
          </div>
          <div className="form-group">
            <input
              className="userData form-control"
              required
              type="text"
              name="address"
              id="address"
            />
            <span>Address:</span>
            <span className="border"></span>
          </div>
          <button type="button" value="Upload!" id="upload" onClick={() => uploadFunc()}>
            Upload
          </button>
          <div id="pictureWrapper">
            <img
              style={{ width: "90%", margin: "1rem auto", display: "block" }}
              id="image"
              src=""
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
