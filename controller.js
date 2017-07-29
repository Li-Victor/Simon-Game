'use strict';

function controlPlayButton() {
    over = false;
    start(false);
}

function controlResetButton() {
    over = true;
    reset();
    stopGame();
    var message = document.querySelector('.message');
    message.innerText = '';
    turnOffHover();
}

function controlStrictMode(value) {
    if(value === 'strict') strictMode = true;
    else strictMode = false;
}

function controlTile(color) {
    if(userTimeout) {
        lightUpTile(color);
        userPickColor(color);
    }
}

function controlResetTile() {
    if(userTimeout) {
        resetTileColor();
    }
}
