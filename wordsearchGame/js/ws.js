var words = window.easywords;
var wordslist = Object.keys(words);
var alphabet = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"
];
var chosenCategory; // Selected catagory
var getHint; // Word getHint
var word; // Selected word
var guess; // Geuss
var geusses = []; // Stored geusses
var lives; // Lives
var counter; // Count correct geusses
var space; // Number of spaces in word '-'
var hintText;

//new code
const fieldSize = 121;
var fieldArray = [];
var insertedWords = [];

class Letter {
	constructor(letter, inWord, word) {
		this.letter = letter;	//char
		this.inWord = inWord;	//bool
		this.word = word;		//string
	}
  }

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

var refreshLetter = function()
{
	for (var i = 0; i < Math.sqrt(fieldSize); i++) {		
		
		for(var j = 0; j < Math.sqrt(fieldSize); j++){
			fieldArray[i][j].inWord = false;
			fieldArray[i][j].word = "";
		}
		
	}
}
// create alphabet ul
var buttons = function () {
	myButtons = document.getElementById("buttons");
	letters = document.createElement("ul");
	letters.id = "alphabet";
	for (var i = 0; i < Math.sqrt(fieldSize); i++) {		
		fieldArray.push([]);
		for(var j = 0; j < Math.sqrt(fieldSize); j++){
			tempChar = alphabet[Math.floor(Math.random() * 26)];
			let tempLetter = new Letter(tempChar, false, "");
			fieldArray[i].push(tempLetter);
			
			//insert into the html
			list = document.createElement("li");
			list.id = "letter" + String(i) + String(j);
			list.innerHTML = tempLetter.letter;
			check();
			myButtons.appendChild(letters);
			letters.appendChild(list);
		}
	}
	//word insertion
	console.log(words);
	for(i = 0; i < words.length; i++){
		console.log(insertedWords);
		switch(Math.floor(Math.random() * 3)){
			case 0:
				insertRight(words[i]);
				break;
			case 1:
				insertDown(words[i]);
				break;
			case 2:
				insertDiagonal(words[i]);
				break;
			default:
				insertRight(words[i]);

		}
	}
};

//for(var x = 0; x < 11; x++){
	//
//}


//insert facing right
function insertRight(word){
	var taken = true;
	var row = 0;
	var col = 0;
	iter = 0;

	//checking to see if it can place the word in random spots
	while(taken == true && iter < 100){
		row = Math.floor(Math.floor(Math.random() * fieldSize)/Math.sqrt(fieldSize));
		col = Math.floor(Math.random() * Math.sqrt(fieldSize));
		if(!(word.length > Math.sqrt(fieldSize)-col)){
			for(var z = 0; z < word.length && z < Math.sqrt(fieldSize)-col; z++){
				taken = false;
				if(fieldArray[row][col+z].inWord){
					taken = true;
					break;
				}
			}
			if(!taken){
				for(z = 0; z < word.length; z++){
					fieldArray[row][col+z].letter = word.substring(z, z+1);
					fieldArray[row][col+z].inWord = true;
					fieldArray[row][col+z].word = word;
					tempvar = document.getElementById("letter" + String(row) + String(col+z));
					tempvar.innerHTML = word.substring(z, z+1);
				}
				insertedWords.push(word);
			}
		}
		iter++;
	}
}

//insert facing down
function insertDown(word){
	var taken = true;
	var row = 0;
	var col = 0;
	iter = 0;
	//checking to see if it can place the word in random spots
	while(taken == true && iter < 100){
		row = Math.floor(Math.floor(Math.random() * fieldSize)/Math.sqrt(fieldSize));
		col = Math.floor(Math.random() * Math.sqrt(fieldSize));
		if(!(word.length > Math.sqrt(fieldSize)-row)){
			for(var z = 0; z < word.length && z < Math.sqrt(fieldSize)-row; z++){
				taken = false;
				if(fieldArray[row+z][col].inWord){
					taken = true;
					break;
				}
			}
			if(!taken){
				for(z = 0; z < word.length; z++){
					fieldArray[row+z][col].letter = word.substring(z, z+1);
					fieldArray[row+z][col].inWord = true;
					fieldArray[row+z][col].word = word;
					tempvar = document.getElementById("letter" + String(row+z) + String(col));
					tempvar.innerHTML = word.substring(z, z+1);
				}
				insertedWords.push(word);
			}
		}
		iter++;
	}
}

//insert facing diagonal (top left to bottom right)
function insertDiagonal(word){
	var taken = true;
	var row = 0;
	var col = 0;
	iter = 0;
	//checking to see if it can place the word in random spots
	while(taken == true && iter < 100){
		row = Math.floor(Math.floor(Math.random() * fieldSize)/Math.sqrt(fieldSize));
		col = Math.floor(Math.random() * Math.sqrt(fieldSize));
		if(!( (word.length > Math.sqrt(fieldSize)-col) || (word.length > Math.sqrt(fieldSize)-row))){
			for(var z = 0; z < word.length && z < Math.sqrt(fieldSize)-col && z < Math.sqrt(fieldSize)-col; z++){
				taken = false;
				if(fieldArray[row+z][col+z].inWord){
					taken = true;
					break;
				}
			}
			if(!taken){
				for(z = 0; z < word.length; z++){
					fieldArray[row+z][col+z].letter = word.substring(z, z+1);
					fieldArray[row+z][col+z].inWord = true;
					fieldArray[row+z][col+z].word = word;
					tempvar = document.getElementById("letter" + String(row+z) + String(col+z));
					tempvar.innerHTML = word.substring(z, z+1);
				}
				insertedWords.push(word);
			}
		}
		iter++;
	}
}

// Select Catagory
var selectCat = function () {
	catagoryName.innerHTML = "Words Remaining : " + insertedWords.length;
};

// Create geusses ul
result = function () {
	wordHolder = document.getElementById("hold");
	correct = document.createElement("ul");

	for (var i = 0; i < word.length; i++) {
		correct.setAttribute("id", "my-word");
		guess = document.createElement("li");
		guess.setAttribute("class", "guess");
		if (word[i] === "-") {
			guess.innerHTML = "-";
			space = 1;
		} else {
			guess.innerHTML = "_";
		}

		geusses.push(guess);
		wordHolder.appendChild(correct);
		correct.appendChild(guess);
	}
};

setShowLives = function (str) {
	var showLives = document.getElementById("mylives");
	showLives.innerHTML = str;
};



// Show lives
comments = function () {
	setShowLives("You have " + lives + " lives");
	if (lives < 1) {
		setShowLives("Game Over");
		for (var i = letters.children.length - 1; i >= 0; i--) {
			letters.children[i].onclick = null;
			letters.children[i].setAttribute("class", "active");
		}
		hint.onclick = null;
	}
	if (counter + space === geusses.length) {
		setShowLives("You Win!");
		swal("", "<div style='font-size :24px;'>" + word.toUpperCase() + " : " + hintText + "</div>", "success");
		for (var i = letters.children.length - 1; i >= 0; i--) {
			letters.children[i].onclick = null;
			letters.children[i].setAttribute("class", "active");
		}
		hint.onclick = null;
	}
};

// OnClick Function
check = function () {
	list.onclick = function () {
		var geuss = this.innerHTML;
		this.setAttribute("class", "active");
		this.onclick = null;
		for (var i = 0; i < word.length; i++) {
			if (word[i] === geuss) {
				geusses[i].innerHTML = geuss;
				counter += 1;
			}
		}
		var j = word.indexOf(geuss);
		if (j === -1) {
			lives -= 1;
			comments();
			animate();
		} else {
			comments();
		}
	};
};

// Hint
function hintFunc() {
	swal("", "<div style='font-size :24px;'>" + hintText + "</div>")
};

// Helper function for unique number of characters in a string
function unique_char(str) {
	var uniql = "";
	for (var x = 0; x < str.length; x++) {
		var char = str.charAt(x);
		if ((/[a-zA-Z]/).test(char) == false) {
			continue;
		}
		if (uniql.indexOf(char) == -1) {
			uniql += str[x];
		}
	}
	return uniql.length;
}

// Helper function for setting image source
function setImageSource(str) {
	var image = document.getElementById("imageguess");
	image.src = str;
}

// Play
function play() {

	word = wordslist[count % wordslist.length];
	hintText = words[wordslist[count % wordslist.length]][1];
	//setImageSource("assets/" + words[wordslist[count % wordslist.length]][2]);

	word = word.replace(/\s/g, "-");
	buttons();
	hint.onclick = hintFunc;

	geusses = [];
	lives = 3;
	counter = 0;
	space = 0;
	result();
	comments();
	selectCat();
};

window.onload = function () {

	window.count = 0;
	play();

	document.getElementById("level").onclick = function () {
		swal({
			title: 'Please Select Difficulty Level',
			html: "<br>" +
				'<button id="buttonEasy" class="button btn-lg" style="margin: 0 5px">EASY</button>' +
				'<button id="buttonMedium" class="button btn-lg" style="margin: 0 5px">MEDIUM</button>' +
				'<button id="buttonHard" class="button btn-lg" style="margin: 0 5px">HARD</button>',
			showCancelButton: false,
			showConfirmButton: false
		}) //swal
		document.getElementById("buttonEasy").onclick = function () {
			words = window.easywords;
			wordslist = Object.keys(words);
			correct.parentNode.removeChild(correct);
			letters.parentNode.removeChild(letters);
	
			play();
			//swal.clickConfirm();
		} //buttonEasy
		document.getElementById("buttonMedium").onclick = function () {
			words = window.mediumwords;
			wordslist = Object.keys(words);
			correct.parentNode.removeChild(correct);
			letters.parentNode.removeChild(letters);
	
			play();
			//swal.clickConfirm();
		} //buttonMedium
		document.getElementById("buttonHard").onclick = function () {
			words = window.hardwords;
			wordslist = Object.keys(words);
			correct.parentNode.removeChild(correct);
			letters.parentNode.removeChild(letters);
		
			play();
			//swal.clickConfirm();
		}
	}

	// Reset
	document.getElementById("reset").onclick = function () {
		insertedWords=[];
		refreshLetter();
		console.log(insertedWords.length);
		correct.parentNode.removeChild(correct);
		letters.parentNode.removeChild(letters);
		
		play();
	};
};