// First Draft with one round:

const gameMessage = document.querySelector(".message");
let playerSelection = prompt("Choose your weapon: ");

if (playerSelection) {
	const computerSection = getComputerSelection();
	gameMessage.textContent = playRound(playerSelection, computerSection);
}

function getComputerSelection() {
	let choiceCode = Math.floor(Math.random() * 3) + 1;
	switch (choiceCode) {
		case 1:
			return "Paper";
		case 2:
			return "Rock";
		case 3:
			return "Scissors";
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

function playRound(playerSelection, computerSelection) {
	let loseDialog = "You lose: ";
	let winDialog = "You win: ";

	let formattedPS = playerSelection.toLowerCase();
	let formattedCS = computerSelection.toLowerCase();

	if (checkPlayerInput(formattedPS) === false) {
		console.log(
			`Input invalid: '${playerSelection}'. Please enter either: Rock, Paper, or Scissors. This form is not case-sensitive.)`
		);
	} else {
		if (formattedPS === formattedCS) {
			return "It's a tie!" + playerSelection + " vs " + formattedCS;
		} else {
			switch (formattedPS) {
				case "rock":
					return formattedCS === "paper"
						? `${loseDialog} ${computerSelection} beats ${playerSelection}.`
						: `${winDialog} ${formattedPS} beats ${formattedCS}.`;
				case "paper":
					return formattedCS === "scissors"
						? `${loseDialog} ${computerSelection} beats ${playerSelection}.`
						: `${winDialog} ${formattedPS} beats ${formattedCS}.`;
				case "scissors":
					return formattedCS === "rock"
						? `${loseDialog} ${computerSelection} beats ${playerSelection}.`
						: `${winDialog} ${formattedPS} beats ${formattedCS}.`;
				default:
					return "Something went wrong. Reload and try again.";
			}
		}
	}
}
