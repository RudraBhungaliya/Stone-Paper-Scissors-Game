let userScore = 0;
let computerScore = 0;

const userScoreSpan = document.getElementById("userScore");
const computerScoreSpan = document.getElementById("computerScore");
const msgDiv = document.getElementById("msg");
const userChoiceDiv = document.getElementById("userChoice");
const computerChoiceDiv = document.getElementById("computerChoice");
const restartButtonDiv = document.getElementById("restartButton");

const choices = document.querySelectorAll(".choice");

// Computer choice generator
function getComputerChoice() {
    const choices = ["stone", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw";
    }
    if (
        (playerChoice === "stone" && computerChoice === "scissor") ||
        (playerChoice === "paper" && computerChoice === "stone") ||
        (playerChoice === "scissor" && computerChoice === "paper")
    ) {
        return "player";
    }
    return "computer";
}

// Update scores and display choices
function updateGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    // Display choices
    userChoiceDiv.textContent = `You chose: ${playerChoice}`;
    computerChoiceDiv.textContent = `Computer chose: ${computerChoice}`;

    // Determine winner and update scores
    if (result === "player") {
        userScore++;
        msgDiv.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
    } else if (result === "computer") {
        computerScore++;
        msgDiv.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
    } else {
        msgDiv.textContent = "It's a draw!";
    }

    // Update score display
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;

    // Check for a winner
    if (userScore === 3 || computerScore === 3) {
        showRestartGameInterface();
    }
}

// Show restart game interface when someone wins
function showRestartGameInterface() {
    msgDiv.textContent = userScore === 3 ? "You win the game!" : "Computer wins the game!";
    restartButtonDiv.style.display = "block"; // Show the restart button
}

// Restart the game
function restartGame() {
    userScore = 0;
    computerScore = 0;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
    msgDiv.textContent = "Play your Move!";
    userChoiceDiv.textContent = "";
    computerChoiceDiv.textContent = "";
    restartButtonDiv.style.display = "none"; // Hide the restart button
}

// Add event listeners to choices
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.id; // Get the id of the clicked choice (stone/paper/scissor)
        updateGame(playerChoice);
    });
});

// Add restart button event listener
document.getElementById("restartButton").addEventListener("click", restartGame);
