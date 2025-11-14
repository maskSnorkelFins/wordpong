// convert patterns -> strings for output
function stringify(pat, cWord) {
	switch(pat) {
		case "length":
	    	return "1 Length: " + cWord.length;
		case "lengthEven":
			return "2 Even Number of Letters";
		case "lengthOdd":
			return "3 Odd Number of Letters";
		case "doubleConsonant":
			return "4 Double Consonant";
		case "doubleVowel":
			return "5 Double Vowel";
		case "double2Consonants":
			return "6 Double Consonant 2x";
		case "double2Vowels":
			return "7 Double Vowel 2x";
		case "same3Consonants":
			return "8 Same Consonant 3x";
		case "same3Vowels":
			return "9 Same Vowel 3x";
		case "noRepeats":
			return "10 No Letters Repeat";
		case "mostlyCons":
			return "11 Majority Consonants";
		case "mostlyVows":
			return "12 Majority Vowels";
		case "balancedConsVows":
			return "13 Balanced Consonants/Vowels";
		case "streakConsonants":
			return "14 Consonant Streak";
		case "streakVowels":
			return "15 Vowel Streak";
		case "allFrequentConsonants":
			return "16 All Frequent Consonants";
		case "allInfrequentConsonants":
			return "17 All Infrequent Consonants";
		case "allAlphaStart":
			return "18 First Half of Alphabet";
		case "allAlphaEnd":
			return "19 Last Half of Alphabet";
		case "allKeyboardLeft":
			return "20 Typed with Left Hand";
		case "allKeyboardRight":
			return "21 Typed with Right Hand";
		case "alternatingCV":
			return "22 Alternating Consonant/Vowel";
		case "alernatingKeyboard":
			return "23 Typed with Alternating Hands";
		case "alternatingTallShort":
			return "24 Alternating Tall/Short";
		case "alternatingHangShort":
			return "25 Alternating Hanging/Short";
		case "wrappedConsonants":
			return "26 Wrapped in Consonants";
		case "wrappedVowels":
			return "27 Wrapped in Vowels";
		case "wrappedSameConsonant":
			return "28 Wrapped in Same Consonant";
		case "wrappedSameVowel":
			return "29 Wrapped in Same Vowel";
		case "startsTall":
			return "30 Begins with Tall";
		case "endsTall":
			return "31 Ends with Tall";
		case "startsHang":
			return "32 Begins with Hanging";
		case "endsHang":
			return "33 Ends with Hanging";
		case "wrappedTall":
			return "34 Begins & Ends with Tall";
		case "wrappedHang":
			return "35 Begins & Ends with Hanging";
		case "allShorts":
			return "36 All Short Letters";
		case "palindrome":
			return "37 Palindrome";
		case "center":
			return "38 Same Center Letter: " + cWord.word[(cWord.length-1) / 2];
	} 
}



//respond to user input
function wordEntered() {
	let enteredWord = inputBox.value.trim().toLowerCase();
	if (validWord(enteredWord)) {
		inputBox.style.color = "#000000";// reset font color
		let currentWord = new CurrentWord(enteredWord, previousWord);
		previousWord = enteredWord;
		report(currentWord);
		inputBox.value = "";
	} else {
		console.log(`\n${enteredWord} invalid\n`);
		clearPatternReport();
		inputBox.style.color = "#cc0000";
	}
}



// verify that word is valid
function validWord(word) {
	return (word.length > 2 && DICTIONARY.includes(word));
	//return (!wordsUsed.includes(word) && DICTIONARY.includes(word));
	//
	// make sure either user hasn't used the word yet
	//
	// check if word hits other (unused) rules, otherwise invalid
	//
}



// output
function report(cWord) {
	let options = "";
	let patterns = Object.keys(cWord);
	let bools = Object.values(cWord);
	patternsAvailable = [];
	
	for (let i = 2; i < bools.length; i++) {//patterns/bools arrays start at 2
		if (bools[i]
			//&& !usedPatterns[patterns[i]]
			//
			// CHECK IF PATTERN ALREADY USED
			//
			) {
			patternsAvailable.push(patterns[i]);
		}
	}
	
	resultPara.style.visibility = "visible";

	// remove all nodes
	clearPatternReport();

	// ADD PATTERN NODES
	// start at index=1 to avoid undefined on cvPattern boolean array
	for (let i = 1; i < patternsAvailable.length; i++) {
		let newPatternElem = document.createElement("h3");
		newPatternElem.setAttribute("class", "patternElem");
		newPatternElem.setAttribute("id", "pattern" + i);
		let textNode = document.createTextNode(stringify(patternsAvailable[i], cWord));
		//stringify(patternUsed, cWord.length);
		newPatternElem.appendChild(textNode);
		resultPara.appendChild(newPatternElem);
	}

	// add event listeners
	// for (let i = 0; i < patternsAvailable.length; i++) {
	// 	document.getElementById("pattern" + i).addEventListener("click", patternSelected);
	// }
	
	// collect all h1
	let patternElems = document.getElementsByClassName("patternElem");	
}




// clear pattern report
function clearPatternReport() {
	let patternParaList = resultPara.children;
	if (patternParaList.length > 0) {// no children on first run
	  while(resultPara.firstChild) {
				resultPara.removeChild(resultPara.lastChild);
			}
	}		
}



// load words.txt
function readTextFile(file) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);//deprecated, see https://xhr.spec.whatwg.org/
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




// TURN THIS BACK ON?
//document.getElementById("resultPara").addEventListener("click", patternSelected);

//const DICTIONARY = ["abc", "def", "ghi", "level", "tenet", "abacus", "banana", "letter", "greet", "stingray", "giraffe", "tortellini", "cannon", "balloon", "cannonization", "mississippi", "voodoo", "voodooey", "pizzaz", "babble", "oboe", "adieu", "strength", "fracture", "adjudication", "lattice", "bikini", "masseuses", "depth", "tall", "glug", "zoology", "ban", "end", "gun", "sank", "tall", "gang", "dole", "gape", "ease", "alto"];