let count = -1;
let score = 0;
//randomly generating an array that represents the rhythm
//candyArr will be the parameter of this function
//this function is ran every 120-300 milliseconds (depending on the difficulty) using
//setInterval(checkArray, interval, candyArr)
function generateArray(diff) {
  let candyArr = [];
  let length = 0;
  let speed = 0;
  if (diff == "easy") {
    speed = 300;
    length = 30;
  } else if (diff == "medium") {
    speed = 200;
    length = 40;
  } else {
    speed = 120;
    length = 50;
  }
  candyArr = [];
  for (let i = 0; i < length; i++) {
    if (i > 2 && candyArr[i - 2] == 0 && candyArr[i - 1] == 0) {
      candyArr[i] = 1;
    } else {
      candyArr[i] = Math.round(Math.random());
    }
  }
  goToGamePage("instructions.html");
  localStorage.setItem("candyArr", candyArr);
  localStorage.setItem("speed", speed);
}
//changing color of buttons when hovered over
function buttonchange(button) {
  if (button == "easy") {
    document.getElementById("easybutton").src = "easy2.png";
  }
  if (button == "medium") {
    document.getElementById("mediumbutton").src = "medium2.png";
  }
  if (button == "hard") {
    document.getElementById("hardbutton").src = "hard2.png";
  }
  if (button == "home") {
    document.getElementById("homebutton").src = "backtohome2.png";
  }
  if (button == "play") {
    document.getElementById("playbutton").src = "playgame2.png";
  }
}
function buttonrevert(button) {
  if (button == "easy") {
    document.getElementById("easybutton").src = "easy.png";
  }
  if (button == "medium") {
    document.getElementById("mediumbutton").src = "medium.png";
  }
  if (button == "hard") {
    document.getElementById("hardbutton").src = "hard.png";
  }
  if (button == "home") {
    document.getElementById("homebutton").src = "backtohome.png";
  }
  if (button == "play") {
    document.getElementById("playbutton").src = "playgame.png";
  }
}
//creating the candy image
function createCandy() {
  var img = document.createElement("img");
  img.src = "candy.png";
  img.setAttribute("id", "candy");
  document.getElementById("myContainer").appendChild(img);
  let candyArr = localStorage.getItem("candyArr");
  let speed = localStorage.getItem("speed");
  if (speed == 300) {
    img.setAttribute("class", "easy");
  } else if (speed == 200) {
    img.setAttribute("class", "medium");
  } else {
    img.setAttribute("class", "hard");
  }
}
//checkArray runs once per interval (based on the selected speed)
function main() {
  let candyArr = localStorage.getItem("candyArr");
  let interval = localStorage.getItem("speed");
  setInterval(checkArray, interval, candyArr);
  setInterval(removeCandy, 0);
  document.getElementById("displayScore").innerHTML = "Score: " + score;
}
//creating candy images according to the randomly generated array; making a modal pop up at the end of the game
//candyArr will be used as the parameter
function checkArray(arr) {
  count = count + 1;
  if (arr[count] == 1) {
    createCandy();
  }
  if (count == arr.length + 8) {
    //Code for modal is modified from: https://www.w3schools.com/howto/howto_css_modals.asp
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    document.getElementById("accuracy").innerHTML = "";
    let candyArr = localStorage.getItem("candyArr");
    let total = 0;
    for (let i = 0; i < candyArr.length; i++) {
      if (candyArr[i] == 1) {
        total++;
      }
    }
    document.getElementById("score").innerHTML =
      "Score: " + score + "/" + total;
    let accuracy = score / total;
    accuracy = accuracy * 100;
    accuracy = Math.round(accuracy);
    document.getElementById("accuracy").innerHTML =
      "Accuracy: " + accuracy + "%";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}
function main() {
  let candyArr = localStorage.getItem("candyArr");
  let interval = localStorage.getItem("speed");
  setInterval(checkArray, interval, candyArr);
  setInterval(removeCandy, 0);
  document.getElementById("displayScore").innerHTML = "Score: " + score;
}
//removing the candy if it goes past the target
function removeCandy() {
  let element = document.getElementById("candy");
  //getting an element's position https://stackoverflow.com/a/52477551
  let candyXPos =
    window.scrollX +
    document.querySelector("#candy").getBoundingClientRect().left;
  let dotXPos =
    window.scrollX +
    document.querySelector("#dot").getBoundingClientRect().left;
  if (dotXPos >= candyXPos + 150) {
    element.remove();
  }
}
//checks whether or not the candy is over the target when a key is pressed
function earnPoints() {
  let element = document.getElementById("candy");
  // getting an element's position https://stackoverflow.com/a/52477551
  let candyXPos =
    window.scrollX +
    document.querySelector("#candy").getBoundingClientRect().left;
  let dotXPos =
    window.scrollX +
    document.querySelector("#dot").getBoundingClientRect().left;
  if (dotXPos + 150 >= candyXPos && dotXPos - 150 <= candyXPos) {
    score++;
  }
  document.getElementById("displayScore").innerHTML = "Score: " + score;
  element.remove();
  document.getElementById("audio").play();
}
function goToGamePage(nextPage) {
  window.location.href = nextPage;
  location.replace(nextPage);
}
