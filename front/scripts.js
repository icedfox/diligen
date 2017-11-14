const storage = window.localStorage;
const standard = 'The result will appear here';
let result = '';

// dom objects
const resultEl = document.getElementById('result');
const loginEl = document.getElementById('login');
const loginErrEl = document.getElementById('loginError');

// reset page
storage.auth = '';
resultEl.innerHTML = 'Please login to retrieve documents';

function fetchDocument (index) {
	// xhr request
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			if (xhr.status == 200) {
				result = xhr.responseText;
				showResult(result);
			} else {
				
			}
		}
	};
	if (!storage.auth) return;
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
	if (!result || !storage.auth) return;
	
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
			if (xhr.status == 200) {
				let token = xhr.response.token;
				storage.auth = 'Bearer ' + token;
				loginEl.innerHTML = 'Welcome ' + username;
			} else {
				loginErrEl.innerHTML = 'Wrong credentials, please try again!';
			}
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
