var words = window.words;
var categories = window.categories;
//var wordslist = Object.keys(words);

var wordslist;
var category1;
var category2;
var hintText;

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcE1 = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragEnter(e) {
  this.classList.add('over');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragDrop(e) {
  if (dragSrcE1 != this) {
    dragSrcE1.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

function dragEnd(e) {
  var listitems = document.querySelectorAll('#word .word');
  [].forEach.call(listItems, function (item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

// create alphabet ul
var boxes = function () {
	myWords = document.getElementById("buttons");
	wordBoxes = document.createElement("ul");

	for (var i = 0; i < wordslist.length; i++) {
		wordBoxes.id = "words";
		list = document.createElement("li");
		list.id = "word";
		list.innerHTML = wordslist[i];
		myWords.appendChild(wordBoxes);
		wordBoxes.appendChild(list);
	}
};

function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
	}
}

// Select Catagory
var setCategorys = function () {
	categoryName1.innerHTML = category1;
  categoryName2.innerHTML = category2;
};

function setWordLists(cat1, cat2) {
  var array1 = Object.keys(words[cat1]);
  var array2 = Object.keys(words[cat2]);
  wordslist = array1.concat(array2);
  shuffle(wordslist);
};

function hintFunc() {
	var randWord = wordslist[Math.floor(Math.random() * wordslist.length)];
  var cat;
  var h;
  var found = false;
  for (var i = 0; i < categories.length; i++) {
    cat = categories[i];
    for (x of Object.keys(words[cat])) {
      if (x == randWord) {
        cat = categories[i];
        h = words[cat][x];
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
  hintText = "Category: " + cat + "\n" + "Hint: " + h;
  swal("", "<div style='font-size :24px;'>" + hintText + "</div>")
};

function play() {

  shuffle(categories);
  category1 = categories[0];
  category2 = categories[1];
  setCategorys();
  setWordLists(category1, category2);

  boxes();
  hint.onclick = hintFunc;
/**
	if (count % wordslist.length == 0) {
		shuffle(wordslist)
		console.log("shuffled");
	}
	count += 1;
	chosenCategory = words[wordslist[count % wordslist.length]][0];
	word = wordslist[count % wordslist.length];
	hintText = words[wordslist[count % wordslist.length]][1];
	setImageSource("assets/" + words[wordslist[count % wordslist.length]][2]);

	word = word.replace(/\s/g, "-");
	buttons();
	hint.onclick = hintFunc;

	geusses = [];
	lives = Math.min(Math.ceil(unique_char(word) * (3 / 2)), 10); // No. of lives will be based on length of the word
	counter = 0;
	space = 0;
	result();
	comments();
	selectCat();
	canvas();
  */
};

window.onload = function () {

	window.count = 0;

	play();

  /**
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
			context.clearRect(0, 0, 400, 400);
			play();
			swal.clickConfirm();
		} //buttonEasy
		document.getElementById("buttonMedium").onclick = function () {
			words = window.mediumwords;
			wordslist = Object.keys(words);
			correct.parentNode.removeChild(correct);
			letters.parentNode.removeChild(letters);
			context.clearRect(0, 0, 400, 400);
			play();
			swal.clickConfirm();
		} //buttonMedium
		document.getElementById("buttonHard").onclick = function () {
			words = window.hardwords;
			wordslist = Object.keys(words);
			correct.parentNode.removeChild(correct);
			letters.parentNode.removeChild(letters);
			context.clearRect(0, 0, 400, 400);
			play();
			swal.clickConfirm();
		}
	}

	// Reset
	document.getElementById("reset").onclick = function () {
		correct.parentNode.removeChild(correct);
		letters.parentNode.removeChild(letters);
		context.clearRect(0, 0, 400, 400);
		play();
	};
  */
};