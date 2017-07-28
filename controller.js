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
