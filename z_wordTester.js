// load DOM elements
var inputBox = document.getElementById("inputBox");
var patternPara = document.getElementById("patternPara");
var resultPara = document.getElementById("resultPara");


// track prev word
var previousWord = "";


// event listener
inputBox.addEventListener("change", wordEntered);


// load words
var DICTIONARY = [];
readTextFile("words.txt");
console.log(DICTIONARY.length);

for (let i = 0; i < DICTIONARY.length; i++) {
	let temp = DICTIONARY[i].split(",");
	DICTIONARY[i] = temp[0];
}
console.log(DICTIONARY.length + " words loaded");