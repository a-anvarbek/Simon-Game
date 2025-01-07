// START

var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

var buttonStart = document.createElement("button");
buttonStart.textContent = "Start";
document.getElementById('buttonStart').appendChild(buttonStart);

buttonStart.addEventListener("click", function(){
    nextSequence();
    started = true;
    buttonStart.remove();
});

// Star the game with keyboard
document.addEventListener("keypress", function () {
    if (!started) {
        document.getElementById("level-title").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
    buttonStart.remove();
});

// Click on the keyboard
document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });
});

// function for new Sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    setTimeout(function () {
        var button = document.getElementById(randomChosenColor);
        button.classList.add("pressed");
        setTimeout(function () {
            button.classList.remove("pressed");
        }, 200);
        playSound(randomChosenColor);
    }, 500);
}

// Check Answer 
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        document.body.style.backgroundColor = "red";
        setTimeout(function () {
            document.body.style.backgroundColor = "#15477c";
        }, 200);

        document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";
        startOver();
    }
}

// function for Sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animation for click a elements
function animatePress(currentColor) {
    var activeButton = document.getElementById(currentColor);
    activeButton.classList.add("pressed");
    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);
}

// Repeat game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    var buttonStart = document.createElement("button");
    buttonStart.textContent = "Restart";
    document.getElementById('buttonStart').appendChild(buttonStart);
    buttonStart.addEventListener("click", function () {
        started = true;
        nextSequence();
        buttonStart.remove();
    });
}

