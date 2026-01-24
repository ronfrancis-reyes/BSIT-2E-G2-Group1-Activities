function submitData() {
  let name = document.getElementById("inputName").value;
  let number = document.getElementById("inputNumber").value;
  let email = document.getElementById("inputEmail").value;
  let address = document.getElementById("inputAddress").value;
  let birth = document.getElementById("inputBirth").value;
  let gender = document.querySelector("#inputGender").value;
  let status = document.querySelector("#inputStatus").value;

  let validation = document.getElementById("validation");
  if (name === "") {
    validation.innerText = "Please enter your full name.";
    validation.style.display = "block";
  } else if (birth === "") {
    console.log("no2");
  } else if (gender === "Select gender") {
    console.log("no3");
  } else if (status === "Select status") {
    console.log("no4");
  } else if (email === "") {
    console.log("no5");
  } else if (number === "") {
    console.log("no6");
  } else if (address === "") {
    console.log("no7");
  }
}
