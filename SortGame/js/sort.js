var words = window.words; //word dataset
var categories = window.categories; //category dataset
//var wordslist = Object.keys(words);

var wordslist; //for bag of words
var category1;
var category2;
var hintText;
var draggedItem = null;
var score = 0;

// create bag of words ul
var boxes = function () {
	myWords = document.getElementById("buttons");
	wordBoxes = document.createElement("ul");
	wordBoxes.className = "words";
	wordBoxes.id = "bag";
	myWords.appendChild(wordBoxes);

	for (let i = 0; i < wordslist.length; i++) {
		word = document.createElement("li");
		word.className = "word";
		word.draggable = true;
		word.innerHTML = wordslist[i];
		wordBoxes.appendChild(word);
	}
};

// add drag and drop features on the words
var setDrag = function() {
  const list_items = document.querySelectorAll(".word");
  const lists = document.querySelectorAll(".words");
  
  for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];
	item.addEventListener('dragstart', function () {
	  draggedItem = item;
	  setTimeout(function () {
		item.getElementsByClassName.display = 'none';
	  }, 0);
	});

	item.addEventListener('dragend', function () {
	  setTimeout(function () {
		draggedItem.style.display = 'block';
		draggedItem = null;
	  }, 0);
	});

	for (let j = 0; j < lists.length; j ++) {
	  const list = lists[j];
	  list.addEventListener('dragover', function (e) {
		e.preventDefault();
	  });
	  list.addEventListener('dragenter', function (e) {
		e.preventDefault();
		this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
	  });
	  list.addEventListener('dragleave', function (e) {
		if (draggedItem.parentElement != this) {
		  this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		}
	  })
	  list.addEventListener('drop', function (e) {
		draggedItem.parentElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		this.append(draggedItem);
		this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
	  });
	}
  }
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
	}
}

// Select Catagory
var setCategories = function () {
  categoryName1.innerHTML = category1;
  categoryName2.innerHTML = category2;
};

// get bag of words
function setWordLists(cat1, cat2) {
  var array1 = Object.keys(words[cat1]);
  var array2 = Object.keys(words[cat2]);
  shuffle(array1);
  shuffle(array2);
  array1 = array1.slice(array1.length*0.4);
  array2 = array2.slice(array2.length*0.4)
  wordslist = array1.concat(array2);
  shuffle(wordslist);
};

function hintFunc() {
  var randWord = wordslist[Math.floor(Math.random() * wordslist.length)];
  var cat;
  var h;
  var found = false;
  for (let i = 0; i < categories.length; i++) {
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
  swal("", "<div style='font-size :24px;'>" + hintText + "</div>");
};

function answerFunc() {
  var cat1_list = document.getElementById("category1").getElementsByTagName("li");
  var cat2_list = document.getElementById("category2").getElementsByTagName("li");
  var cat1_words = Object.keys(words[category1]);
  var cat2_words = Object.keys(words[category2]);

  if (document.getElementById("bag").children.length == 0) {
    var correct = true;
	for (let i = 0; i < cat1_list.length; i++) {
	  if (!cat1_words.includes(cat1_list[i].innerHTML)) {
		correct = false;
		document.getElementById("bag").append(cat1_list[i]);
		i--;
	  }
	}
	for (let i = 0; i < cat2_list.length; i++) {
	  if (!cat2_words.includes(cat2_list[i].innerHTML)) {
		correct = false;
		document.getElementById("bag").append(cat2_list[i]);
		i--;
	  }
	}
	if (correct) {
	  var success = "Correct!"
	  swal("", "<div style='font-size :24px;'>" + success + "</div>","success");
	  document.getElementById("reset").style.visibility = "visible";
	  document.getElementById("answer").disabled = true;
	  document.getElementById("hint").disabled = true;
	  var list_items = document.querySelectorAll(".word");
	  for (x of list_items) {
		x.draggable = false;
	  }
	  score= score+1;
	  var lblScore = document.getElementById('lblScore');
	  lblScore.innerHTML = "Score: "+ score;
	}
	else {
      var wrong = "Wrong!"
	  swal("", "<div style='font-size :24px;'>" + wrong + "</div>","error");
	  if (score>0){
	    score = score -1;
	  }
	  else{
		score =0;
	  }
	  var lblScore = document.getElementById('lblScore');
	  lblScore.innerHTML = "Score: "+ score;
	}
  }
  else {
	var warning = "Not all words are sorted!"
	swal("", "<div style='font-size :24px;'>" + warning + "</div>","warning");
	
	var lblScore = document.getElementById('lblScore');
	lblScore.innerHTML = "Score: "+ score;
  }
}

function resetFunc() {
  var cat1 = document.getElementById("category1");
  var cat2 = document.getElementById("category2");
  while (cat1.firstChild) {
	cat1.removeChild(cat1.firstChild);
  }
  while (cat2.firstChild) {
	cat2.removeChild(cat2.firstChild);
  }
  document.getElementById("bag").remove();
  document.getElementById("reset").style.visibility = "hidden";
  document.getElementById("answer").disabled = false;
  document.getElementById("hint").disabled = false;
  play();
  
  var lblScore = document.getElementById('lblScore');
  lblScore.innerHTML = "Score: "+ score;
}

function play() {

  shuffle(categories);
  category1 = categories[0];
  category2 = categories[1];
  setCategories();
  setWordLists(category1, category2);

  boxes();
  setDrag();
  hint.onclick = hintFunc;
  answer.onclick = answerFunc;
  reset.onclick = resetFunc;
};

window.onload = function () {

	window.count = 0;

	play();

};