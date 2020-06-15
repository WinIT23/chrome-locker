console.log("Hey There background working");

var isFirst = false;


function pass(str) {
	isFirst = true;
	var prom = prompt("Enter your password : " + str, "");

	if (prom === "1234") {
		console.log("Sucessful login !!!");
	} else {
		pass("(Wrong Password)");
	}
}

chrome.runtime.onStartup.addListener(function() {
	pass("");
});