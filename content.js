console.log("Changing Links!!!");

var links = document.getElementsByTagName("a");
for (a of links) {
	a.href = "#";
}