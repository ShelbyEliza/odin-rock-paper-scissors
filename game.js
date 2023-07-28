let gameInfo = {
	playerScore: 0,
	compScore: 0,
	ties: 0,
	round: 1,
};

const startButton = document.querySelector(".startButton");
const resetButton = document.querySelector(".resetButton");
const inputContainer = document.querySelector(".inputContainer");
const gameOverContainer = document.querySelector(".gameOverContainer");
const gameOverMsg = document.querySelector(".gameOverMsg");
const playerScoreEl = document.querySelector(".playerScore");
const compScoreEl = document.querySelector(".compScore");
const tiesEl = document.querySelector(".ties");
const messageEl = document.querySelector(".message");

// toggles the start/reset of the game:
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

// selection triggers round:
const inputs = document.querySelectorAll(".input");
inputs.forEach((input) =>
	input.addEventListener("click", (e) => {
		playRound(e.target.id);
	})
);

function startGame() {
	startButton.style.visibility = "collapse";
	inputContainer.style.visibility = "visible";
	gameOverContainer.style.visibility = "visible";
}

function resetGame() {
	startButton.style.visibility = "visible";
	gameOverContainer.style.visibility = "collapse";
	inputContainer.style.visibility = "collapse";

	gameInfo = {
		playerScore: 0,
		compScore: 0,
		ties: 0,
		round: 0,
	};
	messageEl.textContent = "";
	gameOverMsg.textContent = "";
}

function playRound(playerInput) {
	let compInput = getCompInput();

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

	setScore(result, playerInput, compInput);
}

function setScore(roundScore, playerInput, compInput) {
	if (roundScore === 10) {
		console.log("Something went wrong... ");
		return;
	} else {
		if (roundScore === 1) {
			messageEl.textContent = `Round: ${gameInfo.round} You win! ${playerInput} beats ${compInput}`;
			gameInfo.playerScore++;
			playerScoreEl.textContent = `${gameInfo.playerScore}`;
		} else if (roundScore === -1) {
			messageEl.textContent = `Round: ${gameInfo.round} You lose! ${compInput} beats ${playerInput}`;
			gameInfo.compScore++;
			compScoreEl.textContent = `${gameInfo.compScore}`;
		} else if (roundScore === 0) {
			messageEl.textContent = `Round: ${gameInfo.round} It's a tie! ${compInput} vs ${playerInput}`;
			gameInfo.ties++;
			tiesEl.textContent = `${gameInfo.ties}`;
		}
		gameInfo.round++;
		checkGameStatus();
	}
}

function checkGameStatus() {
	if (gameInfo.playerScore === 5 || gameInfo.compScore === 5) {
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
