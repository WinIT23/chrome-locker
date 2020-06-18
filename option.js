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