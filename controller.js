'use strict';

function controlPlayButton() {
    start(false);
}

function controlResetButton() {
    stopGame();
    var message = document.querySelector('.message');
    message.innerText = '';
}

function controlStrictMode(value) {
    if(value === 'strict') strictMode = true;
    else strictMode = false;
}

function controlTile(color) {
    if(userTimeout) {
        console.log('click');
        lightUpTile(color);
        userPickColor(color);
    }
}

function controlResetTile() {
    if(userTimeout) {
        resetTileColor();
    }
}
