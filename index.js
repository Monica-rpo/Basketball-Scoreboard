// DOM elements
let homeScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");
let timervalue = document.getElementById("time-remain");
const timerDisplay = document.getElementById("timer-section");

// Initial game state variables
let timeremaining = 60;
let timerinterval;
let gStarted = false;

// Function to highlight the leader
// It changes the background color of the leading team's display to yellow
// and the other team's display to black. If scores are equal, both displays are black.
// This function is called after every score update to ensure the display reflects the current leader.
// It also ensures that the game has started before allowing score updates.
// If the game hasn't started, it alerts the user to start the game first.
function highlightLeader() {
  if (parseInt(homeScore.textContent) > parseInt(guestScore.textContent)) {
    document.getElementById("home-display").style.backgroundColor = "yellow";
    document.getElementById("guest-display").style.backgroundColor = "black";
  } else if (
    parseInt(homeScore.textContent) < parseInt(guestScore.textContent)
  ) {
    document.getElementById("guest-display").style.backgroundColor = "yellow";
    document.getElementById("home-display").style.backgroundColor = "black";
  } else {
    document.getElementById("guest-display").style.backgroundColor = "black";
    document.getElementById("home-display").style.backgroundColor = "black";
  }
}

// Functions to add scores for home and guest teams
// Each function checks if the game has started before updating the score.
// If the game hasn't started, it alerts the user to start the game first.
// After updating the score, it calls highlightLeader to update the display accordingly.
// The functions addOne, addTwo, and addThree correspond to adding 1, 2, or 3 points respectively.
// They are triggered by button clicks in the HTML, allowing users to increment scores interactively.
function addOne(player) {
  if (gStarted == false) {
    alert("start Game First");
  } else {
    if (player == "home") {
      homeScore.textContent = parseInt(homeScore.textContent) + 1;
    } else if (player == "guest") {
      guestScore.textContent = parseInt(guestScore.textContent) + 1;
    }
    highlightLeader();
  }
}

function addTwo(player) {
  if (gStarted == false) {
    alert("start Game First");
  } else {
    if (player == "home") {
      homeScore.textContent = parseInt(homeScore.textContent) + 2;
    } else if (player == "guest") {
      guestScore.textContent = parseInt(guestScore.textContent) + 2;
    }
    highlightLeader();
  }
}

function addThree(player) {
  if (gStarted == false) {
    alert("start Game First");
  } else {
    if (player == "home") {
      homeScore.textContent = parseInt(homeScore.textContent) + 3;
    } else if (player == "guest") {
      guestScore.textContent = parseInt(guestScore.textContent) + 3;
    }
    highlightLeader();
  }
}

// Function to handle the timer
// It decrements the timer every second and updates the display.
// If the timer reaches zero, it stops the game, alerts the user, and clears the interval.
// The timer starts at 60 seconds and counts down to zero.
function tHandler() {
  timeremaining--;
  timervalue.textContent = timeremaining;
  if (timeremaining == 0) {
    gStarted = false;
    alert("TimeOut");
    clearInterval(timerinterval);
  }
}

// Function to start the timer
// It initializes the timer interval to call tHandler every second.
// This function is called when the game starts or when the score is reset.
function startTimer() {
  timerinterval = setInterval(tHandler, 1000);
}

// Function to start the game
// It sets the game state to started, resets the scores to zero, and starts the timer.
// This function is called when the user clicks the "Start Game" button in the HTML.
function resetscore() {
  timerDisplay.style.backgroundColor = "#556591ff";
  timerDisplay.style.color = "white";
  homeScore.textContent = 0;
  guestScore.textContent = 0;
  gStarted = true;
  timeremaining = 60;
  timervalue.textContent = timeremaining;
  startTimer();
}
