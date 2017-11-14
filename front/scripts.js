const storage = window.localStorage;
const standard = 'The result will appear here';
let result = '';

// dom objects
let resultEl = document.getElementById('result');

// reset localstorage on load
storage.auth = JSON.stringify({});

function fetchDocument (index) {
	// xhr request
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			result = xhr.responseText;
			showResult(result);
		}
	};
	if (index && parseInt(index) >= 0) {
		xhr.open('GET', `http://localhost:3000/documents/${index}`, true);
		xhr.setRequestHeader('Authorization', storage.auth);
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

function login() {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;

	// xhr request
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			let token = xhr.response.token;
			console.log('token', token);
			storage.auth = 'Bearer ' + token;
			console.log(storage);
		}
	};

	if (username && password) {
		xhr.open('POST', 'http://localhost:3000/login/', true);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xhr.responseType = 'json';
		xhr.send(JSON.stringify({
			username: username,
			password: password
		}));
	} else {
		console.log('no credentials');
	}
}

fetchDocument();