// REWRITE CONSONANT/VOWEL PATTERNS TO ITERATE
// THROUGH CVPATTERN BOOLEANS TO ACCOUNT FOR CONSONANT Y


// patterns
const VOWELS = "aeiou";
const CONSONANTS = "bcdfghjklmnpqrstvwxyz";
const CONSONANTS_NO_Y = "bcdfghjklmnpqrstvwxz";
const FREQUENTS = "rtnslcdpmh";
const INFREQUENTS = "gbfywkvxzjq";
//const FREQUENTS = "tnsrhdlc";//prior
//const INFREQUENTS = "mfywgpbvkxqjz";//prior
const ALPHA_START = "abcdefghijklm";
const ALPHA_END = "nopqrstuvwxyz";
const KEYBOARD_LEFT = "qwertasdfgzxcvb";
const KEYBOARD_RIGHT = "yuiophjklnm";
const TALLS = "bdfhklt";
const HANGS = "gjpqy";
const SHORTS = "aceimnorsuvwxz";


// create boolean array for consonant(true) / vowel(false)
function cvPattern(word) {
	const cvBooleans = [];
	for (let i = 0; i < word.length; i++) {
		if (word[i] == 'y') {// is y consonant or vowel?
			if (i < word.length-1) {// evaluate y
				cvBooleans.push(yConsonant(word, i));
			} else {// final y = vowel
				cvBooleans.push(false);
			}
		} else if (VOWELS.includes(word[i])) {//false = vowel
			cvBooleans.push(false);
		} else {//true = consonant
			cvBooleans.push(true);
		}
	}
	return cvBooleans;
}



function yConsonant(word, i) {
	let consoY = false;
	if (VOWELS.includes(word[i+1])) {
		consoY = true;
		if (word.slice(i+1, i+4) == "ing") {// for "-ying-"
			consoY = false;
		}
	}
	return consoY;
	// consonant: year, yellow, yes, young, beyond, lawyer
	// vowel: frying, undying, annoyingly, candy, monkey, myth, bicycle
		// pylon, tyrant, dynamite, system, typical, pyramid, toy, day, mystery
}



// stats
function score(word) {
	let sc = 0;
	for (let i = 0; i < word.length; i++) {
		sc += word.charCodeAt(i) - 96;
	}
	console.log("this word scores " + sc);
	return sc;
}


// lengths
	// length 1
	// lengthEven 2
	// lengthOdd 3


// repeats
function cvTallyer(word, cvBools) {
	const results = [];

	// double consonant/vowel
	for (let i = 0; i < word.length - 1; i++) {
		if (word[i] == word[i + 1]) {
			if(cvBools[i] && cvBools[i+1]) {
				results[0] = true;//double consonant
			} else if (!cvBools[i] && !cvBools[i+1]) {
				results[1] = true;//double vowel
			}
		}
	}
	return results;
}





// doubles
function doubleCV(word, cvBools, which) {//4 //5
	for (let i = 0; i < word.length - 1; i++) {
		if (word[i] == word[i + 1]
			&& cvBools[i] == which
			&& cvBools[i+1] == which) {
				return true;
		}
	}
	return false;
}
function double2CV(word, cvBools, which) {//6 //7
	let tally = 0;
	for (let i = 0; i < word.length - 1; i++) {
		if (word[i] == word[i + 1]
			&& cvBools[i] == which
			&& cvBools[i+1] == which) {
			tally++;
		}
	}
	return (tally > 1);
}



// BROKEN
// REWRITE FOR CONSONANT Y
// sames
/*
function same3CV(word, cvBools, which) {//8 //9
	let tally = {//dictionary
		count: 0
	};
	for (let i = 0; i < LIST.length; i++) {//initialize keys
		tally[LIST[i]] = 0;
	}
	for (let i = 0; i < word.length; i++) {
		if (LIST.includes(word.charAt(i))) {
			tally[word.charAt(i)]++;
		}
	}
	for (let key in tally) {
		let count = tally[key];
		if (count > 2) {
			return true;
		}
	}
	return false;
}
*/

function same3CV(word, LIST) {//8 //9
	let tally = {//dictionary
		count: 0
	};
	for (let i = 0; i < LIST.length; i++) {//initialize keys
		tally[LIST[i]] = 0;
	}
	for (let i = 0; i < word.length; i++) {
		if (LIST.includes(word.charAt(i))) {
			tally[word.charAt(i)]++;
		}
	}
	for (let key in tally) {
		let count = tally[key];
		if (count > 2) {
			return true;
		}
	}
	return false;
}

function noRepeats(word) {//10
	let letterSet = "";
	for (let i = 0; i < word.length; i++) {
		if (!letterSet.includes(word.charAt(i))) {
			letterSet += word.charAt(i);
		} else {
			return false;
		}
	}
	return true;
}



// REWRITE FOR CONSONANT Y
// balance
function weighCV(word, scale) {//11 //12 //13
	let cTally = 0;
	for (let i = 0; i < word.length; i++) {
		if (CONSONANTS.includes(word.charAt(i))) {
			cTally++;
		}
	}
	return scale(cTally, word.length);
}



// REWRITE FOR CONSONANT Y
// streak
function streak(word, LIST) {//14 //15
	let result = "";
	let count = 0;
	let streak = 0;

	for (let i = 0; i < word.length; i++) {
		if (LIST.includes(word.charAt(i))) {
			count++;
			if (i == word.length - 1) {//end of word
				if (count > streak) {
					streak = count;
				}
			}
		} else {//streak is over, continue checking
			if (count > streak) {
				streak = count;
			}
			count = 0;
		}
	}
	if (streak > 2) {
		return true;
	}
	return false;
}



// REWRITE FOR CONSONANT Y - TRICKY !!!
// subsets
function checkFrequency(word, LIST) {//16 //17
	console.log(CONSONANTS);
	console.log(LIST);
	console.log("\n");
	for (let i = 0; i < word.length; i++) {
		if (CONSONANTS.includes(word[i])) {
			if (!LIST.includes(word[i])) {
				return false;
			}
		}
	}
	return true;
}
function checkAlphabetKeyboard(word, LIST) {//18 //19 //20 //21
	for (let i = 0; i < word.length - 1; i++) {
		if (!LIST.includes(word[i])) {
			return false;
		}
	}
	return true;
}



// REWRITE FOR CONSONANT Y
// wraps
function wrappedCV(word, LIST) {//22 //23
	return (LIST.includes(word[0])
		&& LIST.includes(word[word.length - 1]));
}
function wrappedSameCV(word, LIST) {//24 //25
	return (LIST.includes(word[0])
		&& LIST.includes(word[word.length - 1])
		&& word[0] == word[word.length - 1]);
}



// heights
function startsEndsTallHang(word, LIST, i) {//26 //27 //28 //29
	return (LIST.includes(word[i]));
}
function wrappedTallHang(word, LIST) {//30 //31
	return (LIST.includes(word[0])
		&& LIST.includes(word[word.length - 1]));
}
function allShorts(word) {//32
	for (let i = 0; i < word.length - 1; i++) {
		if (!SHORTS.includes(word[i])) {
			return false;
		}
	}
	return true;
}



// REWRITE FOR CONSONANT Y
// alternating
function alternating(word, LIST1, LIST2) {//33 //34 //35
	for (let i = 0; i < word.length - 1; i++) {
		if (
			!(LIST1.includes(word[i]) && LIST2.includes(word[i + 1]))
			&& !(LIST2.includes(word[i]) && LIST1.includes(word[i + 1]))
		) {
			return false;
		}
	}
	return true;
}



// palindrome
function palindrome(word) {//36
	for (let i = 0; i < word.length; i++) {
		if (word[i] != word[word.length - 1 - i]) {
			return false;
		}
	}
	return true;
}


// center
function centerLetter(word, prev) {
	console.log("241 curr center: " + word[(word.length-1) / 2]);
	console.log("242 prev center: " + prev[(prev.length-1) / 2]);

	if (word.length % 2 == 1 && prev.length % 2 == 1) {
		if (word[(word.length-1) / 2] == prev[(prev.length-1) / 2]) {
			return true;
		}
	}
	return false;
}



// sames
	// startsSameLtr 37
	// startsNextLtr 38
	// startsPrevLtr 39
	// endsSameLtr 40