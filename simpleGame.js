let gameInfo = {
	playerScore: 0,
	compScore: 0,
	playerInputs: [],
	compInputs: [],
	round: 0,
	gameOn: false,
	messages: [],
};

// toggles the start/end of the game:
const startButton = document.querySelector(".startButton");
startButton.addEventListener("click", startGame);
const resetButton = document.querySelector(".resetButton");
resetButton.addEventListener("click", resetGame);

const inputContainer = document.querySelector(".inputContainer");

const gameOverContainer = document.querySelector(".gameOverContainer");
const gameOverMsg = document.querySelector(".gameOverMsg");

// selection triggers round:
const inputs = document.querySelectorAll(".input");
inputs.forEach((input) =>
	input.addEventListener("click", (e) => {
		playRound(e.target.id);
	})
);

const playerScoreEl = document.querySelector(".playerScore");
const compScoreEl = document.querySelector(".compScore");
const messageEl = document.querySelector("message");

function startGame() {
	startButton.style.visibility = "collapse";
	inputContainer.style.visibility = "visible";
	gameOverContainer.style.visibility = "visible";
}

function resetGame() {
	startButton.style.visibility = "visible";
	gameOverContainer.style.visibility = "collapse";

	gameInfo = {
		playerScore: 0,
		compScore: 0,
		playerInputs: [],
		compInputs: [],
		round: 0,
		gameOn: false,
		messages: [],
	};
	updateScore("both");
	gameOverMsg.textContent = "";
}

function playRound(playerInput) {
	let compInput = getCompInput();
	gameInfo.compInputs.push(compInput);
	gameInfo.playerInputs.push(playerInput);

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

	calculateScore(result, playerInput, compInput);
}

function calculateScore(roundScore, playerInput, compInput) {
	if (roundScore === 10) {
		console.log("Something went wrong... ");
		return;
	} else {
		if (roundScore === 1) {
			roundMessage = `You win! ${playerInput} beats ${compInput}`;
			gameInfo.playerScore++;
			updateScore("player");
		} else if (roundScore === -1) {
			roundMessage = `You lose! ${compInput} beats ${playerInput}`;
			gameInfo.compScore++;
			updateScore("comp");
		} else if (roundScore === 0) {
			roundMessage = `It's a tie! ${compInput} against ${playerInput}`;
		}
		gameInfo.round++;
		gameInfo.messages.push(roundMessage);
		checkGameStatus();
	}
}

function updateScore(who) {
	switch (who) {
		case "player":
			playerScoreEl.textContent = `${gameInfo.playerScore}`;
			break;
		case "comp":
			compScoreEl.textContent = `${gameInfo.compScore}`;
			break;
		default:
			compScoreEl.textContent = "0";
			playerScoreEl.textContent = "0";
	}
}

function checkGameStatus() {
	if (gameInfo.playerScore === 5 || gameInfo.compScore === 5) {
		gameInfo.gameOn = false;
		inputContainer.style.visibility = "collapse";

		if (gameInfo.playerScore === 5) {
			gameOverMsg.textContent = `Congratulations! You win! Try again?`;
		} else {
			gameOverMsg.textContent = `Sorry! The computer wins! Try again?`;
		}
	}
}

function getCompInput() {
	let choiceCode = Math.floor(Math.random() * 3) + 1;
	switch (choiceCode) {
		case 1:
			return "paper";
		case 2:
			return "rock";
		case 3:
			return "scissors";
		default:
			return "Error! No legal input made.";
	}
}
