'use strict';

var colors = ['blue', 'red', 'green', 'yellow'];
var gameColors = [];
var userColors = [];
var strictMode = false;
var lose = false; //lose variable is needed for non-strict mode
//lose variable always false in strictMode

var score = 0;
var userTimeout;

var message = document.querySelector('.message');
var panelScore = document.querySelector('.panel__score');

var greenTile = document.querySelector('.green_tile');
var redTile = document.querySelector('.red_tile');
var blueTile = document.querySelector('.blue_tile');
var yellowTile = document.querySelector('.yellow_tile');

//run gameChooseColor first, then userChooseColor
//flag is false: the game chooses the color and print the color
//flag is true: users turn to pick a color
function start(flag) {

    if(!flag) {
        message.innerText = 'Picking Colors';
        gameChooseColor();
        userColors = [];
        return;
    }

    message.innerText = 'Pick Sequence of Tiles: Only ' + (20 - (gameColors.length - 1)) + ' left';
    userChooseColor();

}

function userChooseColor() {

    userTimeout = setTimeout(function () {

        if(strictMode) {
            //when timeout is finished the game is over
            message.innerText = 'You Lose!';
            reset();
        } else {
            //when timeout is finished, restart the game not in strict mode
            lose = true;
            userColors = [];
            start(false);
        }

    }, gameColors.length * 3000);

}

function stopUserTimeout() {

    if(userTimeout) {

        clearInterval(userTimeout);

        if(strictMode) {
            message.innerText = 'You Lose!';
            reset();
        } else {
            lose = true;
            userColors = [];
            start(false);
        }

    }

}

function continueGame() {

    if(userTimeout) {
        clearInterval(userTimeout);
        score++;
        panelScore.innerText = score;
        lose = false;
        start(false);
    }

}

function reset() {

     gameColors = [];
     userColors = [];
     score = 0;
     lose = false;

}

function gameChooseColor() {

    if(!lose) gameChooseRandomColor();
    //then game iterates over gameColors
    printColor(false);

}

//Every second it will print out every index of the array
function printColor(flag) {

    if(!flag) {
        for (var i = 0; i < gameColors.length; i++) {
            (function() {
                var j = i;
                setTimeout(function timer(){
                    lightUpTile(gameColors[j]);
                    console.log(gameColors[j]);

                    //wait another second break out and call start(true)
                    if(++j === gameColors.length) {
                        setTimeout(function () {
                            printColor(true)
                        }, 1000);
                    }

                }, j * 4000);
            }());
        }
        return;
    }
    start(true);

}

function lightUpTile(color) {
    switch (color) {
        case 'red':
            redTile.style.backgroundColor = 'red';
            break;
        case 'blue':
            blueTile.style.backgroundColor = 'blue';
            break;
        case 'yellow':
            yellowTile.style.backgroundColor = 'yellow';
            break;
        case 'green':
            greenile.style.backgroundColor = 'green';
            break;
        default:
    }
}


function gameChooseRandomColor() {

    var random = Math.floor(Math.random() * (colors.length));
    gameColors.push(colors[random]);
    return colors[random];

}

//compares colors one by one
function userPickColor(color) {
    userColors.push(color);

    var index = userColors.length - 1;

    //compare colors first then check for the length, to continueUserTimeout
    if(!compareColors(index, color)) {
        stopUserTimeout();
        return;
    }

    if(userColors.length === gameColors.length) continueGame();

}

function compareColors(userCount, color) {
    return gameColors[userCount] === color;
}

function victory() {
    return score == 20;
}

function stopGame() {
    if(userTimeout) {
        reset();
        clearInterval(userTimeout);
    }
}

function toggleStrict() {
    strictMode = !strictMode;
    lose = false;
}
