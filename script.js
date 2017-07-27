'use strict';

var colors = ['blue', 'red', 'green', 'yellow'];
var gameColors = [];
var userColors = [];
var strict = false;
var score = 0;
var userTimeout;

//run gameChooseColor first, then userChooseColor
//flag is false: the game chooses the color and print the color
//flag is true: users turn to pick a color
function start(flag) {

    if(!flag) {
        gameChooseColor();
        return;
    }

    console.log('user chooses color');
    userChooseColor();
}

function userChooseColor() {
    //clear user colors
    userColors = [];

    userTurn();
}

function userTurn() {

    userTimeout = setTimeout(function () {

        //when timeout is finished the game is over
        console.log('You lose');
        reset();

    }, gameColors.length * 3000);

}

function stopUserTimeout() {

    if(userTimeout) {
        clearInterval(userTimeout);
        console.log('You lose');
        reset();
    }

}

function continueGame() {

    if(userTimeout) {
        clearInterval(userTimeout);
        score++;
        console.log(score);
        start(false);
    }

}

function reset() {
    gameColors = [];
    userColors = [];
    score = 0;
}

function gameChooseColor() {

    gameChooseRandomColor();
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
