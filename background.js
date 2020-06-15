var pass_msg = {
	"FIRST": "Set the password : ",
	"CONFIRM": "Confirm Password : "
}

// for the first run after install.
chrome.runtime.onInstalled.addListener(function (details) {
	// if extension is a fresh install than ask for password
	if (details.reason === "install") {
		setup();
	}
});

// during every startup
chrome.runtime.onStartup.addListener(function () {
	showLockScreen();
});

// --------------------------- functions -----------------------------

function showLockScreen() {
	// opens new page so one can't see your home-page..
	var authPage = window.open("about:blank");
	// gets stored password
	var sPasswd = localStorage.getItem("passwd");

	if (sPasswd) {
		checkPassword(sPasswd);
		authPage.close();
	} else {
		setup();
	}
}

function setup() {
	var pass = askPassword();

// add encryption here in next version....

	// password is stored in a local file.
	localStorage.setItem("passwd", pass);

	// close browser after initializing password
	closeBrowser();
}

function askPassword() {
	var pass = setPassword(pass_msg.FIRST);
	// empty strings are not allowed as password.
	while (pass === "") {
		console.log("Empty Password");
		pass = setPassword(pass_msg.FIRST);
	}
	var cpass = setPassword(pass_msg.CONFIRM);

	if (pass !== cpass) {
		pass = askPassword();
	} 
	return pass;
}

function setPassword(msg) {
	var pass = prompt(msg, "");
	return pass.toString();
}

function closeBrowser() {
	chrome.windows.getAll({}, function (window) {
		for (var tab of window) {
			chrome.windows.remove(tab.id);
		}
	});
}

function closeMyTab() {
	chrome.tabs.getAllInWindow(function (mTabs) {
		for (var tab in mTabs) {
			console.log(tab.url);
			if (tab.url == "about:blank") {
				chrome.tabs.remove(tab.id);
				break;
			}
		}
	});
}

function getPassword(str) {
	var pass = prompt("Enter your password : " + str, "");
	return pass;
}

function checkPassword(sPasswd) {
	var retry_msg = "(Wrong Password) Tries remaining : ";
	var tries = 5;


	// while loop to decrease the count
	var tPasswd = getPassword("");

	while (true) {

		if (tries <= 0) {
			tries = 0;
			alert("closing Browser");
			closeBrowser();
			break;
		}

		if (sPasswd) {
			tries -= 1;
			if (tPasswd === sPasswd) {
				console.log("Sucessful login !!!");
				closeMyTab();
				break;
			} else {
				tPasswd = getPassword(retry_msg + tries);
			}
		} else {
			setup();
			break;
		}
	}
}