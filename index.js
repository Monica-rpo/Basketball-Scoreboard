// DOM elements
let homeScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");
let timervalue = document.getElementById("time-remain");
const timerDisplay = document.getElementById("timer-section");

// Initial game state variables
let timeremaining = 60;
let timerinterval;
let gStarted = "false";
let homeScoreValue = 0;
let guestScoreValue = 0;

// Load initial game state from localStorage
// If the scores are not set, it initializes them to zero.
homeScoreValue = parseInt(localStorage.getItem("Home")) || 0;
homeScore.textContent = homeScoreValue;
guestScoreValue = parseInt(localStorage.getItem("Guest")) || 0;
guestScore.textContent = guestScoreValue;
gStarted = localStorage.getItem("GameStarted") || "false";
// If the game has started, it retrieves the remaining time and starts the timer.
// If the game has not started, it clears the localStorage to reset the game state.
if (gStarted === "true") {
  timeremaining = parseInt(localStorage.getItem("Time"));
  timervalue.textContent = timeremaining;
  startTimer();
  highlightLeader();
  timerDisplay.style.backgroundColor = "#556591ff";
  timerDisplay.style.color = "white";
} else {
  localStorage.clear();
}

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

// Function to add scores for home and guest teams
// checks if the game has started before updating the score.
// If the game hasn't started, it alerts the user to start the game first.
// After updating the score, it calls highlightLeader to update the display accordingly.
function increaseScore(player, value) {
  if (gStarted == "false") {
    alert("start Game First");
  } else {
    if (player == "home") {
      homeScore.textContent = parseInt(homeScore.textContent) + value;
      homeScoreValue += value;
    } else if (player == "guest") {
      guestScore.textContent = parseInt(guestScore.textContent) + value;
      guestScoreValue += value;
    }
    highlightLeader();
    localStorage.setItem("Home", JSON.stringify(homeScoreValue));
    localStorage.setItem("Guest", JSON.stringify(guestScoreValue));
  }
}

// Function to handle the timer
// It decrements the timer every second and updates the display.
// If the timer reaches zero, it stops the game, alerts the user, and clears the interval.
// The timer starts at 60 seconds and counts down to zero.
function tHandler() {
  timeremaining--;
  timervalue.textContent = timeremaining;
  localStorage.setItem("Time", JSON.stringify(timeremaining));
  if (timeremaining == 0) {
    gStarted = "false";
    localStorage.setItem("GameStarted", "false");
    alert("TimeOut");
    clearInterval(timerinterval);
    localStorage.clear();
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
  gStarted = "true";
  localStorage.setItem("GameStarted", "true");
  timeremaining = 60;
  timervalue.textContent = timeremaining;
  startTimer();
}
