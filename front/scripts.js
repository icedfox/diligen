let result = '';
let standard = 'The result will appear here';

// dom objects
let resultEl = document.getElementById('result');

// xhr request
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (xhr.readyState == XMLHttpRequest.DONE) {
		result = xhr.responseText;
		showResult(result);
	}
};

function fetchDocument (index) {
	if (index && parseInt(index) >= 0) {
		xhr.open('GET', `http://localhost:3000/documents/${index}`, true);
		xhr.send(null);
	} else {
		showResult(standard);
	}
}

function showResult(text) {
	resultEl.innerHTML = text;
}

function highlightWord() {
	let word = document.getElementById('word').value;
	let rgx = new RegExp(`\\b${word}\\b`, 'g'); // match only whole words

	let highlighted = result.replace(rgx, `<span class="highlight">${word}</span>`);
	showResult(highlighted);
}

fetchDocument();