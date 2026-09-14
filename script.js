let score = 0;
let gameRunning = false;
let timeLeft = 30;
let timer;

let bestScore = localStorage.getItem("bestScore");

if (bestScore === null) {
    bestScore = 0;
}

const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const startButton = document.getElementById("startButton");
const timeText = document.getElementById("time");
const bestText = document.getElementById("best");
const gameMessage = document.getElementById("gameMessage");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const difficultyText = document.getElementById("difficulty");
const gameStats = document.querySelector(".game-stats");

bestText.textContent = bestScore;

target.addEventListener("click", function() {
    
    if (gameRunning == false) {
        return;
    }

    score = score + 1;
    scoreText.textContent = score;
    
    moveTarget();
});

startButton.addEventListener("click", function() {
    gameRunning = true;

    startButton.style.display = "none";

    score = 0;
    timeLeft = 30;

    timeText.classList.remove("warning");

    gameStats.style.display = "flex";
    document.querySelector(".difficulty").style.display = "block";

    updateDifficulty();

    scoreText.textContent = score;
    timeText.textContent = timeLeft;

    gameMessage.style.display = "none";

    target.style.display = "block";
    moveTarget();

    clearInterval(timer);

    timer = setInterval(function() {
        timeLeft = timeLeft - 1;
        timeText.textContent = timeLeft;

        updateDifficulty();

        if (timeLeft <= 5 && timeLeft > 0) {
            timeText.classList.add("warning");
        }
        else {
            timeText.classList.remove("warning");
        }

        if (timeLeft <= 0) {
            clearInterval(timer);

            gameRunning = false;
            target.style.display = "none";

            gameStats.style.display = "none";
            document.querySelector(".difficulty").style.display = "none";

            let newBest = false;

            if (score > bestScore) {
                bestScore = score;
                bestText.textContent = bestScore;

                localStorage.setItem("bestScore", "0");
                localStorage.reload();
           
                newBest = true;
            }

            if (newBest === true) {
                messageTitle.textContent = "New Best!";
                messageText.textContent = "New high score: " + score;
            }
            else {
                messageTitle.textContent = "Game Over!";
                messageText.textContent = "Your Score: " + score;
            }

            gameMessage.style.display = "flex";

            startButton.textContent = "Play Again";
            startButton.style.display = "inline-block";
        }
    }, 1000);
});

function moveTarget() {
    const maxX = gameArea.clientWidth - target.offsetWidth;
    const maxY = gameArea.clientHeight - target.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";
}

function updateDifficulty() {
    if (score >= 20) {
        target.style.width = "30px";
        target.style.height = "30px";

    }
    else if (score >=10) {
        target.style.width = "40px";
        target.style.height = "40px";

    }
    else {
        target.style.width = "50px";
        target.style.height = "50px";

    }
}

function updateDifficulty() {
    if (timeLeft <= 10) {
        target.style.width = "30px";
        target.style.height = "30px";
        target.style.background = "#ef4444";
        target.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.8)";

        difficultyText.textContent = "Hard";
        difficultyText.style.color = "#ef4444";
    }
    else if (timeLeft <= 20) {
        target.style.width = "40px";
        target.style.height = "40px";
        target.style.background = "#f97316";
        target.style.boxShadow = "0 0 20px rgba(249, 115, 22, 0.8)";

        difficultyText.textContent = "Medium";
        difficultyText.style.color = "#f97316";
    }
    else {
        target.style.width = "50px";
        target.style.height = "50px";
        target.style.background = "#22c55e";
        target.style.boxShadow = "0 0 20px rgba(34, 197, 94, 0.8)";

        difficultyText.textContent = "Easy";
        difficultyText.style.color = "#22c55e";
    }
}