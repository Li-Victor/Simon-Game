'use strict';

var colors = ['blue', 'red', 'green', 'yellow'];
var gameColors = [];
var userColors = [];
var strictMode = false;
var lose = false; //lose variable is needed for non-strict mode
//lose variable always false in strictMode

var score = 0;
var userTimeout; //gets set by userChooseColor

var message = document.querySelector('.message');
var panelScore = document.querySelector('.panel__score');

var greenTile = document.querySelector('.green_tile');
var redTile = document.querySelector('.red_tile');
var blueTile = document.querySelector('.blue_tile');
var yellowTile = document.querySelector('.yellow_tile');

var greenAudio = document.querySelector('audio[data-key="green"]');
var redAudio = document.querySelector('audio[data-key="red"]');
var blueAudio = document.querySelector('audio[data-key="blue"]');
var yellowAudio = document.querySelector('audio[data-key="yellow"]');

//run gameChooseColor first, then userChooseColor
//flag is false: the game chooses the color and print the color
//flag is true: users turn to pick a color
function start(flag) {

    if(!flag) {
        message.innerText = 'Picking Colors';
        userTimeout = undefined;
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
            clearTimeout(userTimeout);
            userTimeout = undefined;
        } else {
            //when timeout is finished, restart the game not in strict mode
            lose = true;
            userColors = [];
            start(false);
        }
        resetTileColor();

    }, gameColors.length * 3000);

}

function stopUserTimeout() {

    if(userTimeout) {

        clearTimeout(userTimeout);
        userTimeout = undefined;

        if(strictMode) {
            message.innerText = 'You Lose!';
        } else {
            lose = true;
            userColors = [];
            start(false);
        }
        resetTileColor();

    }

}

function continueGame() {

    if(userTimeout) {
        clearTimeout(userTimeout);
        userTimeout = undefined;
        resetTileColor();
        score++;
        panelScore.innerText = score;
        lose = false;
        if(victory()) {
            message.innerText = 'You Win!';
            resetTileColor();
        }
        else start(false);
    }

}

function reset() {

     gameColors = [];
     userColors = [];
     score = 0;
     lose = false;
     panelScore.innerText = score;
     resetTileColor();

}

function gameChooseColor() {

    if(!lose) gameChooseRandomColor();
    //then game iterates over gameColors
    printColor(false);

}

//Every second it will print out every index of the array
function printColor(flag) {

    if(!flag) {

        setTimeout(function () {
            resetTileColor();

            var offset = 0;
            for (var i = 0; i < gameColors.length; i++) {
                (function() {
                    var j = i;

                    setTimeout(function timer(){

                        lightUpTile(gameColors[j]);

                        console.log(gameColors[j]);

                        setTimeout(function () {
                            resetTileColor();

                            //wait another second break out and call start(true)
                            if(++j === gameColors.length) {
                                setTimeout(function () {
                                    printColor(true)
                                }, 500);
                            }

                        }, 500) //seconds of sound


                    }, offset); //second of sound + seconds to pause for displaying next tile
                    offset += 1500;
                }());
            }


        }, 1000);


        return;
    }
    start(true);

}

function lightUpTile(color) {
    switch (color) {
        case 'red':
            redTile.style.backgroundColor = 'red';
            redAudio.currentTime = 0;
            redAudio.play();
            break;
        case 'blue':
            blueTile.style.backgroundColor = 'blue';
            blueAudio.currentTime = 0;
            blueAudio.play();
            break;
        case 'yellow':
            yellowTile.style.backgroundColor = 'yellow';
            yellowAudio.currentTime = 0;
            yellowAudio.play();
            break;
        case 'green':
            greenTile.style.backgroundColor = 'green';
            greenAudio.currentTime = 0;
            greenAudio.play();
            break;
        default:
    }
}

function resetTileColor() {
    redTile.style.backgroundColor = 'darkred';
    greenTile.style.backgroundColor = 'darkgreen';
    yellowTile.style.backgroundColor = 'lightgoldenrodyellow';
    blueTile.style.backgroundColor = 'darkblue';
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
    return score === 5;
}

function stopGame() {
    if(userTimeout) {
        clearTimeout(userTimeout);
        userTimeout = undefined;
    }
}

function toggleStrict() {
    strictMode = !strictMode;
    lose = false;
}
