/*
 ************************************************************************************************************
 * 											MIT License														*
 ************************************************************************************************************
 * 									Copyright(c) 2020 Vinit Chauhan											*
 ************************************************************************************************************
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 		*
 * associated documentation files(the "Software"), to deal in the Software without restriction, including 	*
 * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell	*
 * copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the *
 * following conditions:																					*
 *																											*
 * The above copyright notice and this permission notice shall be included in all copies or substantial 	*
 * portions of the Software.																				*
 *																											*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 	*
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO *
 * EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,		*
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 		*
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.													*
 ************************************************************************************************************
 */

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

startup();


function startup() {

	// for the first run after install.
	chrome.runtime.onInstalled.addListener(function(details) {
		// if extension is a fresh install than ask for password
		if (details.reason === "install") {
			setup();
		}
	});

	// during every startup
	chrome.runtime.onStartup.addListener(function() {
		showLockScreen();
	});

	// shortcut added default - "Ctrl+Shift+L"
	chrome.commands.onCommand.addListener(function() {
		showLockScreen();
	});

	// locks the screen when clicked on icon
	chrome.browserAction.onClicked.addListener(function() {
		showLockScreen();
	});
}

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
	chrome.windows.getAll({}, function(window) {
		for (var tab of window) {
			chrome.windows.remove(tab.id);
		}
	});
}

function closeMyTab() {
	chrome.tabs.getAllInWindow(function(mTabs) {
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
	2. encrypt password
*/