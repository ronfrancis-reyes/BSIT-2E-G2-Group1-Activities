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
		validation.innerText = "Please enter your full name";
		validation.style.display = "block";
	} else if (birth === "") {
		validation.innerText = "Please enter your birth date";
		validation.style.display = "block";
	} else if (gender === "Select gender") {
		validation.innerText = "Please enter your gender";
		validation.style.display = "block";
	} else if (status === "Select status") {
		validation.innerText = "Please enter your status";
		validation.style.display = "block";
	} else if (email === "") {
		validation.innerText = "Please enter your email";
		validation.style.display = "block";
	} else if (number === "") {
		validation.innerText = "Please enter your number";
		validation.style.display = "block";
	} else if (address === "") {
		validation.innerText = "Please enter your address";
		validation.style.display = "block";
	} else {
		validation.style.display = "none";
		document.getElementById("name").innerText = name;
		document.getElementById("birth").innerText = birth;
		document.getElementById("gender").innerText = gender;
		document.getElementById("status").innerText = status;
		document.getElementById("email").innerText = email;
		document.getElementById("mobile").innerText = number;
		document.getElementById("address").innerText = address;

		document.getElementById("submitted-info").style.display = "block";
	}
}
