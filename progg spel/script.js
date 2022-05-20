var secretNumber = 0,
	numberOfGuesses = 0;

function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
};

function newGame() {
	secretNumber = Math.floor(Math.random() * 100) + 1;
	numberOfGuesses = 0;
	writeMessage('historyList', '');
}

function guessInRange(guess) {
	return (guess > 0 && guess < 101);
}

function userGuessed() {
	var userGuessed = document.getElementById('userGuess').value;
	var statusArea = document.getElementById('statusArea');
	var historyList = document.getElementById('historyList');
	if (userGuessed.length == 0 || ! guessInRange(userGuessed)) {
		
		writeMessage('statusArea', '<p>skriv in ett nummer mellan 1-100 och tryck på gissa.</p>');
	} else if (userGuessed.indexOf('.') != -1) {
		writeMessage('statusArea', '<p>skriv in ett nummer mellan 1-100 och tryck på gissa.</p>');
	} else {
		numberOfGuesses++;

		if (userGuessed == secretNumber) {
			
			writeMessage('statusArea', '<p>Du fick mig på ' + numberOfGuesses +' gissningar, Jag tänkte på ' + secretNumber + '. Låt oss försöka igen!...</p>');
			newGame();
		} else if (userGuessed < secretNumber) {
			
			writeMessage('statusArea', '<p>Du måste gissa högre! ' + userGuessed + ', try again...</p>');
			writeMessage('historyList', '<li>' + userGuessed +' (för lågt!)</li>', true);
		} else {
			
			writeMessage('statusArea', '<p>Du måste gissa lägre! ' + userGuessed + ', try again...</p>');
			writeMessage('historyList', '<li>' + userGuessed + ' (för högt!)</li>', true);
		}
	}

	document.getElementById('userGuess').value = '';	
}

window.onload = function() {
	newGame();
	document.getElementById('buttonArea').addEventListener('click', userGuessed);
};