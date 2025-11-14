//load DOM elements
const inputBox = document.getElementById("inputBox");
const wordball = document.getElementById("wordball");
const patternPara = document.getElementById("patternPara");
const resultPara = document.getElementById("resultPara");

//load dictionary words
var DICTIONARY = [];
var SYLLABLES = [];
readTextFile("words.txt");
console.log(DICTIONARY.length);

for (let i = 0; i < DICTIONARY.length; i++) {
	let temp = DICTIONARY[i].split(",");
	DICTIONARY[i] = temp[0]; // needs to push() if using const
	SYLLABLES[i] = temp[1]; // needs to push() if using const
}
console.log(DICTIONARY.length + " words loaded");
console.log(SYLLABLES.length + " syllable counts loaded");

// word
var cWord = new CurrentWord("");
var wordsUsed = [];
var patternAttack = "";
var patternsAvailable = [];
var usedPatterns = new UsedPatterns();

//players
var p1 = new Player("Michael");
var p2 = new Player("Karyn");
var currPlayer = p1;
const resultParaP1 = 10;
const resultParaP2 = 600;

//ball
var ball = new Ball();
ball.animID = moveBall;
console.log(ball);

//respond to user input
function wordEntered() {
	let word = inputBox.value.trim().toLowerCase();
	if (validWord(word)) {
		// reset input box
		inputBox.value = "";
		inputBox.style.visibility = "hidden";
		resultPara.innerHTML = "";
		checkPatterns(word);
	} else {
		inputBox.value = "";
		resultPara.style.visibility = "visible";
		resultPara.innerHTML = "invalid word";
		// CUSTOMIZE MESSAGE:
			// WORD ALREADY USED
			// CHECK SPELLING
	}
}



function patternSelected(event) {
	//flag pattern as used
	let target = event.target;
	let patternUsedIndex = target.id.charAt(target.id.length - 1);
	let patternUsed = patternsAvailable[patternUsedIndex];
	//console.log(patternUsed);
	patternPara.innerHTML = stringify(patternUsed, cWord.length);
	usedPatterns[patternUsed] = true;
	//console.log(patternUsed + ": " + usedPatterns[patternUsed]);

	//set ball
	ball.word = cWord.word;
	ball.scoreRising = 0;
	ball.speed *= -1;//reverse ball direction
	ball.start++;
	if (ball.start == 1) {
		moveBall();
	}
	wordball.style.visibility = "visible";

	// animate ball score
	clearInterval(ball.scoreInterval);
	ball.scoreInterval = setInterval(function () {
		if (ball.scoreRising < cWord.score) {
			ball.scoreRising += 1;
			wordball.innerHTML = ball.word + "<br/>" + ball.scoreRising + " / " + cWord.score;
		} else {
			wordball.innerHTML = ball.word + "<br/>" + ball.scoreRising;
			clearInterval(ball.scoreInterval);
		}
	}, 100);
	
	// switch player
	if (currPlayer == p1) {
		currPlayer = p2;
		inputBox.style.left = "660px";
		resultPara.style.left = resultParaP2 + "px";
	} else {
		currPlayer = p1;
		inputBox.style.left = "10px";
		resultPara.style.left = resultParaP1 + "px";
	}
	patternPara.style.visibility = "visible";
	//document.getElementById("patternPara").innerHTML = "pattern";
	resultPara.style.visibility = "hidden";
	//TURN THIS BACK ON!
	//document.getElementById("resultPara").innerHTML = "";

	inputBox.style.visibility = "visible";
	inputBox.focus(); 

	currPlayer.turns++;
	console.log("\n\n" + currPlayer.name + "'s turn " + currPlayer.turns);
}



function checkPatterns(word) {
	if (cWord.word == "") {
		ball.word = word;
	} else {
		ball.word = cWord.word;
	}
	cWord = new CurrentWord(word);
	wordsUsed.push(cWord.word);
	report(cWord);
}


function validWord(word) {
	return (!wordsUsed.includes(word) && DICTIONARY.includes(word));
	//
	// make sure either user hasn't used the word yet
	//
	// check if word hits other (unused) rules, otherwise invalid
	//
}



function report(cWord) {
	let options = "";
	let patterns = Object.keys(cWord);
	let bools = Object.values(cWord);
	patternsAvailable = [];
	
	for (let i = 2; i < bools.length; i++) {//patterns/bools arrays start at 2
		if (bools[i]
			&& !usedPatterns[patterns[i]]
			//
			// CHECK IF PATTERN ALREADY USED
			//
			 ) {
			patternsAvailable.push(patterns[i]);
		}
	}
	console.log("157 " + patternsAvailable);
	
	resultPara.style.visibility = "visible";

	// REMOVE ALL NODES!
	let patternParaList = resultPara.children;
	console.log("171");
	console.log(patternParaList);
	if (patternParaList.length > 0) {// no children on first run
      while(resultPara.firstChild) {
				resultPara.removeChild(resultPara.lastChild);
			}
	}
	
	// ADDING PATTERN NODES
	for (let i = 0; i < patternsAvailable.length; i++) {
		let newPatternElem = document.createElement("h3");
		newPatternElem.setAttribute("class", "patternElem");
		newPatternElem.setAttribute("id", "pattern" + i);
		console.log("179 " + patternsAvailable[i]);
		let textNode = document.createTextNode(stringify(patternsAvailable[i], cWord.length));
		//stringify(patternUsed, cWord.length);
		newPatternElem.appendChild(textNode);
		resultPara.appendChild(newPatternElem);
	}

	// add event listeners
	for (let i = 0; i < patternsAvailable.length; i++) {
		document.getElementById("pattern" + i).addEventListener("click", patternSelected);
	}
	
	// collect all h1
	let patternElems = document.getElementsByClassName("patternElem");
	console.log(patternElems);
	
}





function readTextFile(file) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
				DICTIONARY = allText.split("\n");
			}
		}
	}
	rawFile.send(null);
}



function moveBall() {
	console.log("this is moveBall()");
	if (!ball.atBorder) {
		if (ball.x > ball.bindLeft && ball.x < ball.bindRight) {
			ball.x += ball.speed;
			if (ball.x <= ball.bindLeft || ball.x >= ball.bindRight) {
				ball.speed = 0;
			}		
		}
	} else {
		ball.atBorder = true;
		console.log("ball at border");
		//cancelAnimationFrame(ball.animID);
		//
		//WHATEVER HAPPENS WHEN BALL HITS OPPONENT
		//
	}
	wordball.style.left = ball.x + "px";
	window.requestAnimationFrame(moveBall);
}



function stringify(pat, len) {
	switch(pat) {
	  case "length":
	    return len + " Letters Long";
		case "lengthEven":
			return "Even Number of Letters";
		case "lengthOdd":
			return "Odd Number of Letters";
		case "doubleConsonant":
			return "Double Consonant";
		case "doubleVowel":
			return "Double Vowel";
		case "double2Consonants":
			return "Double Consonants 2x";
		case "double2Vowels":
			return "Double Vowels 2x";
		case "same3Consonants":
			return "Same Consonant 3x";
		case "same3Vowels":
			return "Same Vowel 3x";
		case "noRepeats":
			return "No Letters Repeat";
		case "mostlyCons":
			return "Majority Consonants";
		case "mostlyVows":
			return "Majority Vowels";
		case "balancedConsVows":
			return "50/50 Consonants/Vowels";
		case "streakConsonants":
			return "3 Consonants in a Row";
		case "streakVowels":
			return "3 Vowels in a Row";
		case "allFrequentConsonants":
			return "All Frequent Consonants";
		case "allInfrequentConsonants":
			return "All Infrequent Consonants";
		case "allAlphaStart":
			return "First Half of Alphabet";
		case "allAlphaEnd":
			return "Last Half of Alphabet";
		case "allKeyboardLeft":
			return "Typed with Left Hand";
		case "allKeyboardRight":
			return "Typed with Right Hand";
		case "wrappedConsonants":
			return "Begins & Ends with Consonants";
		case "wrappedVowels":
			return "Begins & Ends with Vowels";
		case "wrappedSameConsonant":
			return "Begins & Ends with Same Consonant";
		case "wrappedSameVowel":
			return "Begins & Ends with Same Vowel";
		case "startsTall":
			return "Begins with Tall";
		case "endsTall":
			return "Ends with Tall";
		case "startsHang":
			return "Starts with Hanging";
		case "endsHang":
			return "Ends with Hanging";
		case "wrappedTall":
			return "Begins & Ends with Tall";
		case "wrappedHang":
			return "Begins & Ends with Hanging";
		case "allShorts":
			return "All Short Letters";
		case "alternating":
			return "Alternating Consonant/Vowel";
		case "alternatingTallShort":
			return "Alternating Tall/Short";
		case "alternatingHangShort":
			return "Alternating Hanging/Short";
		case "palindrome":
			return "Palindrome";
	} 
}



// event listeners
inputBox.addEventListener("change", wordEntered);
// TURN THIS BACK ON?
//document.getElementById("resultPara").addEventListener("click", patternSelected);


//const DICTIONARY = ["abc", "def", "ghi", "level", "tenet", "abacus", "banana", "letter", "greet", "stingray", "giraffe", "tortellini", "cannon", "balloon", "cannonization", "mississippi", "voodoo", "voodooey", "pizzaz", "babble", "oboe", "adieu", "strength", "fracture", "adjudication", "lattice", "bikini", "masseuses", "depth", "tall", "glug", "zoology", "ban", "end", "gun", "sank", "tall", "gang", "dole", "gape", "ease", "alto"];