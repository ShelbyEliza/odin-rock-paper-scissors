const playButton = document.querySelector(".playButton");
playButton.addEventListener("click", playGame);

function playGame() {
	let score = [];
	let messages = [];
	let playerInput;
	let compInput;
	let roundScore;

	for (let i = 0; score.length < 5; i++) {
		playerInput = prompt(`Round ${i + 1}: Choose your weapon: `).toLowerCase();
		while (!checkPlayerInput(playerInput)) {
			playerInput = prompt(
				`Round ${i + 1}: Invalid choice! Choose: rock, paper, or scissors! `
			);
		}

		compInput = getComputerSelection();
		let roundMessage;
		roundScore = playRound(playerInput, compInput);

		if (roundScore === 10) {
			console.log("Something went wrong... ");
			return;
		} else {
			if (roundScore === 1) {
				roundMessage = `You win! ${playerInput} beats ${compInput}`;
				console.log(roundMessage);
				score.push(roundScore);
			} else if (roundScore === -1) {
				roundMessage = `You lose! ${compInput} beats ${playerInput}`;
				console.log(roundMessage);
				score.push(roundScore);
			} else if (roundScore === 0) {
				roundMessage = `It's a tie! ${compInput} against ${playerInput}`;
				console.log(roundMessage);
			}
			messages.push(roundMessage);
		}
	}
	console.log(score, messages);
}

function getComputerSelection() {
	let choiceCode = Math.floor(Math.random() * 3) + 1;
	switch (choiceCode) {
		case 1:
			return "paper";
		case 2:
			return "rock";
		case 3:
			return "scissors";
		default:
			return "Error! No legal selection made.";
	}
}

function checkPlayerInput(input) {
	switch (input) {
		case "rock":
		case "paper":
		case "scissors":
			return true;
		default:
			return false;
	}
}

function playRound(playerInput, compInput) {
	let result;
	if (playerInput === compInput) {
		result = 0;
	} else {
		switch (playerInput) {
			case "rock":
				compInput === "paper" ? (result = -1) : (result = 1);
				break;
			case "paper":
				compInput === "scissors" ? (result = -1) : (result = 1);
				break;
			case "scissors":
				compInput === "rock" ? (result = -1) : (result = 1);
				break;
			default:
				result = 10;
		}
	}
	return result;
}

function formatInput(input) {
	return input.toLowerCase();
}
