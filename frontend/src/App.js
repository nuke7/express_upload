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
      <div className="wrapper">
        <input type="file" name="sampleFile" id="sampleFile" />
        <br />
        <label htmlFor="userName">fileName:</label>
        <input type="text" name="userName" id="userName" />
        <br />
        <h4>User Location Data</h4>
        <label htmlFor="name">Full Name:</label>
        <input className="userData" type="text" name="name" id="name" />
        <label htmlFor="email">Email:</label>
        <input className="userData" type="email" name="email" id="email" />
        <label htmlFor="zip">ZipCode:</label>
        <input className="userData" type="number" name="zip" id="zip" />
        <label htmlFor="city">City:</label>
        <input className="userData" type="text" name="city" id="city" />
        <label htmlFor="address">Address:</label>
        <input className="userData" type="text" name="address" id="address" />
        <br />
        <button type="button" value="Upload!" id="upload" onClick={() => uploadFunc()}>
          Upload
        </button>
        <div id="pictureWrapper">
          <img style={{ width: "90%", marginTop: "1rem" }} id="image" src="" alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
