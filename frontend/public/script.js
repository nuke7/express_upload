function _loaded() {
  console.log("The client is running...");
  document.querySelector("input[type='submit']").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("We blocked the file upload");
  });
}
window.addEventListener("load", _loaded);
