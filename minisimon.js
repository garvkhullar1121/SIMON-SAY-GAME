let gameSequence = [];
let userSequence = [];
let started = false;
let level = 0;
let color = ["yellow", "red", "green", "purple"];
let h2 = document.querySelector("h2");
let highestScore = 0; // add this variable to store the highest score
let highestScoreElement = document.querySelector("#highest-score"); // add an element to display the highest score

document.addEventListener("keypress", function() {
  if (started == false) {
    console.log("started");
    started = true;
  }
  levelUp();
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  let radIdx = Math.floor(Math.random() * 3);
  let radCol = color[radIdx];
  let radbtn = document.querySelector(`.${radCol}`);
  console.log(radIdx);
  console.log(radbtn);
  console.log(radCol);
  btnFlash(radbtn);
  gameSequence.push(radCol);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function answer(idx) {
  if (userSequence[idx] === gameSequence[idx]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `GAME OVER! , <b>Your score is ${level}  </b>  <br> PRESS ANY KEY TO START AGAIN`;
    document.querySelector("body").style.color = "red";
    setTimeout(function() {
      document.querySelector("body").style.color = "white";
    }, 1000);
 
    if (level > highestScore) {
      highestScore = level;
      highestScoreElement.innerText = `Highest Score: ${highestScore}`;
    }
    reset();
  }
  
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSequence.push(userColor);
  answer(userSequence.length - 1);
  
}

function reset() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}