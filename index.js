
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

let playerName = "";
let highScore = 0 ;
let bestPlayer = "" ;

$(document).keypress(function() {
  if (!started) {
    playerName = prompt("Enter your name");
    playerName = playerName.trim();
    console.log(playerName);
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

        $("body").addClass("game-over");
        let audio = new Audio("wrong.mp3");
        $("h1").text("Game Over, Press Any Key to Restart");
        audio.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        if(level > highScore){
          bestPlayer = playerName ;
          highScore = level - 1 ;
          showHighScore();
        }
        startOver();

    }

}

function showHighScore(){
  $("h2").text("High Score - "+highScore+" : "+bestPlayer);
}

function startOver(){
    level = 0 ;
    started = false ;
    gamePattern = [] ;
}

function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
