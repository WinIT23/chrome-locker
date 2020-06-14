console.log("Censoring texts!!!");

var paragraphs = document.getElementsByTagName('p');
for (elt of paragraphs) {
	elt.style['background-color'] = "black";
	elt.style['color'] = "black";
}