var tries = 5;

var promptType = {
	"SET": 0,
	"GET": 1
}
var promptMsg = {
	"FIRST": "Set the password : ",
	"CONFIRM": "Confirm Password : ",
	"ENTRY": "Enter your password : ",
	"RETRY": "(Wrong Password) Enter your Password (Attempts remaining : "
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

// show dialog box and change tab 
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
	var pass = newPassword();

	// add encryption here in next version....

	// password is stored in a local file.
	localStorage.setItem("passwd", pass);

	// close browser after initializing password
	closeBrowser();
}

function newPassword() {
	var pass = passPrompt(promptMsg.FIRST, promptType.SET);
	// empty strings are not allowed as password.
	while (pass === "") {
		pass = passPrompt(promptMsg.FIRST, promptType.SET);
	}
	// confirm your password.
	var cpass = passPrompt(promptMsg.CONFIRM, promptType.SET);

	if (pass !== cpass) {
		pass = newPassword();
	}
	return pass;
}

// gets the password and returns it.
function passPrompt(msg, _type) {
	if (msg === promptMsg.RETRY) {
		msg = msg + tries + ")";
	}
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
			if (tab.url == "about:blank") {
				chrome.tabs.remove(tab.id);
				break;
			}
		}
	});
}

function checkPassword(sPasswd) {
	var tPasswd = passPrompt(promptMsg.ENTRY, promptType.GET);

	while (true) {

		if (tries <= 0) {
			tries = 0;
			alert("Too Many Wrong Attempts. \nClosing Browser");
			closeBrowser();
			break;
		}

		if (sPasswd) {
			if (tPasswd === sPasswd) {
				closeMyTab();
				break;
			} else {
				tPasswd = passPrompt(promptMsg.RETRY, promptType.GET);
			}
			tries -= 1;
		} else {
			setup();
			break;
		}
	}
}

/* To-Do's 
	1. hide the password.
	2. add lock on demand (by clicking on icon).
	3. add lock shortcut.
	4. add option to change password
	4. encrypt password
*/