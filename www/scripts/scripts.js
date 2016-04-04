window.addEventListener("load", init, false);

var mainContainer;

function init() {
  mainContainer = document.getElementById("mainContainer");
  mainContainer.addEventListener("dom-change", ready, false);
  
  hello();
}

function ready() {
  mainContainer.$.submitButton.addEventListener("click", validate, false);
}

function validate() {
  console.log(mainContainer.rulesValue);
}

function hello() {
  return ("Hello World!");
}
