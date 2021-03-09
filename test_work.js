(function(){
let arr = [
	{
		id: 1,
		eng: 'The children play football in the playground',
		rus: 'Дети играют в футбол на детской площадке',
		audio: 'audio1.mp3'
	},
	{
		id: 2,
		eng: 'Antony has decorated the house today',
		rus: 'Энтони украсил дом сегодня',
		audio: 'audio2.mp3'
	},
	{
		id: 3,
		eng: 'Does Marschall like olives?',
		rus: 'Маршал любит оливки?',
		audio: 'audio3.mp3'
	},
];
let rusDiv = document.getElementById('rusDiv');
let dragDiv = document.getElementById('dragDiv');
let dropDiv = document.getElementById('dropDiv');
let result = document.getElementById('result');


let [engPhrase, audiofile] = renderQuestion(numQuestion = 1);

function renderQuestion(numQuestion) {

	// очистка данных от предыдущего вопроса
	clear(dragDiv);
	clear(dropDiv);
	clear(result);

	//получение исходных данных из массива
	let engPhrase = getProperty('eng', numQuestion);
	let rusPhrase = getProperty('rus', numQuestion);
	let audiofile = new Audio(getProperty('audio', numQuestion));

	rusDiv.innerHTML = rusPhrase;

	// добавляем возможность сброса для принимающего контейнера и для обратного перетаскивания
	addDropForContainer(dropDiv);
	addDropForContainer(dragDiv);

	// разбиваем фразу на английском на слова, затем перемешиваем 
	let shuffleArrWord = shuffle(splitToWords(engPhrase));

	//создаем элементы для перетаскивания
	createDraggableElem(shuffleArrWord, dragDiv);

	return [engPhrase, audiofile];
}


// делаем проверку по кнопке
let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', function () {
	nextButton.style.display = 'block';
	checkButton.style.display = 'none';
	result.classList.remove('right');
	result.classList.remove('wrong');

	if (getInnerHTMLFromChildrenToString(dropDiv) === engPhrase) {
		result.innerHTML = 'Right!';
		result.classList.add('right');
		audiofile.play();
	} else {
		result.innerHTML = 'Something wrong!';
		result.classList.add('wrong');
	}
})

// отображение следующего вопроса
let nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', function () {
	nextButton.style.display = 'none';
	checkButton.style.display = 'block';
	numQuestion++;
	if (numQuestion <= arr.length) {
		[engPhrase, audiofile] = renderQuestion(numQuestion);
	} else {
		result.classList.remove('right');
		result.classList.remove('wrong');
		result.innerHTML = 'Test is over!';
		checkButton.style.display = 'none';
	}
})



// вспомогательные функции

function splitToWords(arr) {
	return arr.split(' ');
}

function clear(elem) {
	elem.innerHTML = '';
}

function getProperty(prop, id) {
	let property;
	arr.map(elem => {
		if (elem.id === id) {
			property = elem[prop];
		}
	})
	return property;
}

function shuffle(arr) {
	let result = [];
	while (arr.length > 0) {
		let random = getRandomInt(0, arr.length - 1);
		let elem = arr.splice(random, 1)[0];
		result.push(elem);
	}
	return result;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createDraggableElem(arr, parent) {
	for (let i = 0; i < arr.length; i++) {
		let elem = document.createElement('span');
		elem.className = 'draggableElem';
		elem.innerHTML = arr[i];
		parent.appendChild(elem);
		elem.draggable = true;
		elem.addEventListener('dragstart', function () { elem.classList.add('removable'); })
		elem.addEventListener('dragend', function () { elem.classList.remove('removable'); })
	}

}

function addDropForContainer(container) {
	container.addEventListener('dragover', function (event) { event.preventDefault(); })
	container.addEventListener('drop', function () {
		let elem = document.querySelector('.removable');
		container.appendChild(elem);
	})
}

function getInnerHTMLFromChildrenToString(parent) {
	let arr = [];
	for (i = 0; i < parent.children.length; i++) {
		arr.push(parent.children[i].innerHTML);
	}
	return arr.join(' ');
}
} ())
