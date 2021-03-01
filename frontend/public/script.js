function _loaded() {
  console.log("The client is running...");

  let fd = new FormData();

  document.querySelector("#uploadForm").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("We blocked the file upload");
    fd.append("username", document.getElementById("userName").value);
    fd.append(
      "sampleFile",
      document.getElementById("sampleFile").files[0],
      "sampleFile.jpg"
    );
    /*  fd.append(
      "profilePic",
      document.getElementById("profilePic").files[0],
      "profilePic.jpg"
    );
    fd.append("myPet", document.getElementById("myPet").files[0], "myPet.jpg"); */

    for (let [name, value] of fd) {
      console.log(`${name} : ${value}`);
      console.log(value);
    }

    fetch("http://localhost:8050/upload", {
      method: "POST",
      mode: "cors",
      /* headers: {
        "content-type": "multipart/formdata",
      }, */
      body: fd,
    });
  });
}
window.addEventListener("load", _loaded);
