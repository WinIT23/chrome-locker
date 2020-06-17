var btn = document.getElementById("btn");
var msg = document.getElementById("msg");

btn.addEventListener('click', change);

function change() {
	console.log("Clicked");
	var sPasswd = localStorage.getItem("passwd");

	var tPasswd = document.getElementById("old-pass").value;
	if (sPasswd === tPasswd) {
		var nPasswd = document.getElementById("new-pass").value;
		var cPasswd = document.getElementById("r-new-pass").value;
		if (nPasswd === cPasswd) {
			localStorage.setItem("passwd", nPasswd);
			msg.textContent = "Password changed sucessfully!!!";
		}
	} else {
		console.log("s :" + sPasswd + " t : " + tPasswd);
		msg.textContent = "Incorrect Password!!!";
	}
}