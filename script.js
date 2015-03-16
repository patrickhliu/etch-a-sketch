// This file uses vanilla Javascript

var start = document.getElementsByClassName("start")[0];        // start will be the start button element
var clear = document.getElementsByClassName("clear")[0];        // clear will be the clear button element
var numberOfBoxes;                                              // the # of boxes the user would like to display

function startGame(boxNum) {
    // In the event a game has already been played, need to remove the container element before making a new grid.
    // So if the "container" element already exists in document.body, remove it.
    if (document.getElementsByClassName("container")[0]) {
        document.querySelector("section").removeChild(document.getElementsByClassName("container")[0]);
    }

    // Create and add a fresh div element with the "container" class
    document.getElementsByTagName("section")[0].appendChild(document.createElement("div")).setAttribute("class", "container");

    //For "num x num" grid, have a for loop generate each square div.  Each square will be given the css class "square-div"
    for (var i = 0; i < (boxNum * boxNum); i++) {
        document.getElementsByClassName("container")[0].appendChild(document.createElement("div")).setAttribute("class", "square-div");
    }

    // Give each individual square inline CSS width/height
    var squareList = document.getElementsByClassName("square-div");
    for (var x = 0; x <= ((boxNum*boxNum) -1); x++) {
        squareList[x].style.height = calcSize(960/boxNum) + "px";
        squareList[x].style.width  = calcSize(960/boxNum) + "px";
    
    // As squares are created/appended, when you reach a square that is a multiple of boxNum, then that box needs to go on a new line.  
    // Do that by setting "clear: both" with inline CSS.
        if (x % boxNum === 0) {             
            squareList[x].style.clear = "both";
        }
    } // END FOR LOOP

    // event handler changes the background color of each square as the mouse pointer hovers over it.
    document.querySelector('.container').addEventListener('mouseover', hoverBlack, false);
}

// the function to change background color of each square
function hoverBlack (e) {
    if (e.target.classList.contains('square-div')) {
        e.target.style.backgroundColor = 'black';
    }
}

// a function to round the width & height size of each square to ensure they fit in the 906px width container
function calcSize (num) {
    var newNum = num * 10;
    newNum = Math.floor(newNum);
    newNum = newNum/10;
    return newNum;
}

// draw default 40x40 grid on window load
window.onload = function () {
    numberOfBoxes = 40;
    startGame(numberOfBoxes);
}

// event handler function will begin the game when user clicks on start button
start.addEventListener("click", function() {    
    // Ask the user for the # of boxes to display & draw them
    numberOfBoxes = parseInt( prompt("How many boxes would you like?  (Enter a single integer)") );

    if ( isNaN(numberOfBoxes)) {
        alert("Not sure? We'll use a 40x40 grid...");
        numberOfBoxes = 40;
        startGame(numberOfBoxes);
    }
    else {
        startGame(numberOfBoxes);
    }
})

// Event listener for clear will reset the background color of all squares in the grid
clear.addEventListener("click", function () {
    var squareList = document.getElementsByClassName("square-div");    
    for (var x = 0; x <= ((numberOfBoxes*numberOfBoxes) -1); x++) {
        squareList[x].style.backgroundColor = "#C4C2C3";
    }
})
