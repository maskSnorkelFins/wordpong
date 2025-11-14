function UsedPatterns() {
	//length
	this.length = false;
	this.lengthEven = false;
	this.lengthOdd = false;

	//doubles
	this.doubleConsonant = false;
	this.doubleVowel = false;
	this.double2Consonants = false;
	this.double2Vowels = false;

	//sames
	this.same3Consonants = false;
	this.same3Vowels = false;
	this.noRepeats = false;

	//balance
	this.mostlyCons = false;
	this.mostlyVows = false;
	this.balancedConsVows = false;
	this.streakConsonants = false;
	this.streakVowels = false;

	//subsets
	this.allFrequentConsonants = false;
	this.allInfrequentConsonants = false;
	this.allAlphaStart = false;
	this.allAlphaEnd = false;
	this.allKeyboardLeft = false;
	this.allKeyboardRight = false;

	//wraps
	this.wrappedConsonants = false;
	this.wrappedVowels = false;
	this.wrappedSameConsonant = false;
	this.wrappedSameVowel = false;

	//heights
	this.startsTall = false;
	this.endsTall = false;
	this.startsHang = false;
	this.endsHang = false;
	this.wrappedTall = false;
	this.wrappedHang = false;
	this.allShorts = false;

	//alternating
	this.alternating = false;
	this.alternatingTallShort = false;
	this.alternatingHangShort = false;

	//bonus
	this.palindrome = false;
}