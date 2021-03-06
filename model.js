'use strict';

var colors = ['blue', 'red', 'green', 'yellow'];
var gameColors = [];
var userColors = [];
var strictMode = false;
var lose = false; //lose variable is needed for non-strict mode
//lose variable always false in strictMode

var over = false; //to stop lighting up the colors when reset button is pressed

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
        turnOffHover();
        gameChooseColor();
        userColors = [];
        return;
    }

    message.innerText = 'Sequence of Tiles: Only ' + (20 - (gameColors.length - 1)) + ' left';
    userChooseColor();

}

function userChooseColor() {

    var tiles = document.querySelectorAll('.tile');
    tiles.forEach(function (tile) {
        tile.classList.add('hover');
    });

    userTimeout = setTimeout(function () {

        if(strictMode) {
            //when timeout is finished the game is over
            message.innerText = 'You Lose!';
            clearTimeout(userTimeout);
            userTimeout = undefined;
            turnOffHover();
        } else {
            //when timeout is finished, restart the game not in strict mode
            lose = true;
            userColors = [];
            start(false);
        }
        resetTileColor();

    }, gameColors.length * 2000);

}

function turnOffHover() {
    var tiles = document.querySelectorAll('.tile');
    tiles.forEach(function (tile) {
        tile.classList.remove('hover');
    });
}

function stopUserTimeout() {

    if(userTimeout) {
        resetTileColor();
        clearTimeout(userTimeout);
        userTimeout = undefined;

        if(strictMode) {
            message.innerText = 'You Lose!';
            turnOffHover();
        } else {
            lose = true;
            userColors = [];
            start(false);
        }

    }

}

function continueGame() {

    if(userTimeout) {
        resetTileColor();
        clearTimeout(userTimeout);
        userTimeout = undefined;
        score++;
        panelScore.innerText = 'Score: ' + score;
        lose = false;
        if(victory()) {
            message.innerText = 'You Win!';
            resetTileColor();
            turnOffHover();
        }
        else start(false);
    }

}

function reset() {

     gameColors = [];
     userColors = [];
     score = 0;
     lose = false;
     panelScore.innerText = 'Score: ' + score;
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

                    setTimeout(function timer() {

                        if(!over) {

                            lightUpTile(gameColors[j]);

                            setTimeout(function () {
                                resetTileColor();

                                //wait another second break out and call start(true)
                                if(++j === gameColors.length) {
                                    setTimeout(function () {
                                        printColor(true)
                                    }, 500);
                                }

                            }, 500) //seconds of sound

                        }

                    }, offset); //second of sound + seconds to pause for displaying next tile
                    offset += 1000;
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
            redTile.style.backgroundColor = '#B71C1C';
            redAudio.currentTime = 0;
            redAudio.play();
            break;
        case 'blue':
            blueTile.style.backgroundColor = '#0D47A1';
            blueAudio.currentTime = 0;
            blueAudio.play();
            break;
        case 'yellow':
            yellowTile.style.backgroundColor = '#FFFF00';
            yellowAudio.currentTime = 0;
            yellowAudio.play();
            break;
        case 'green':
            greenTile.style.backgroundColor = '#1B5E20';
            greenAudio.currentTime = 0;
            greenAudio.play();
            break;
        default:
    }
}

function resetTileColor() {
    redTile.style.backgroundColor = '#EF5350';
    blueTile.style.backgroundColor = '#42A5F5';
    yellowTile.style.backgroundColor = '#FFEE58';
    greenTile.style.backgroundColor = '#66BB6A';
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

    if(userColors.length === gameColors.length) {
        setTimeout(function () {
            continueGame();
        }, 250); //250 ms to register last color of user. 250ms of lighting last tile
    }

}

function compareColors(userCount, color) {
    return gameColors[userCount] === color;
}

function victory() {
    return score === 20;
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
