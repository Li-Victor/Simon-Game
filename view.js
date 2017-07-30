'use strict';

var radioButtons = document.querySelectorAll('input');
var playButton = document.querySelector('.play_button');
var resetButton = document.querySelector('.reset_button');
var tiles = document.querySelectorAll('.tile');

var strictRadioButton = document.querySelector('input#strict');
var easyRadioButton = document.querySelector('input#easy');

radioButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        if(playButton.disabled && resetButton.disabled) {
            playButton.disabled = false;
        }

        controlStrictMode(this.value);
    });
});

playButton.addEventListener('click', function () {
    resetButton.disabled = false;
    playButton.disabled = true;

    if(strictRadioButton.checked) {
        easyRadioButton.disabled = true;
    } else {
        strictRadioButton.disabled = true;
    }

    controlPlayButton();
});

resetButton.addEventListener('click', function () {
    playButton.disabled = false;
    this.disabled = true;

    radioButtons.forEach(function (button) {
        button.checked = false;
    });

    strictRadioButton.disabled = false;
    easyRadioButton.disabled = false;

    controlResetButton();

});

tiles.forEach(function (tile) {
    tile.addEventListener('mousedown', function () {
        controlTile(this.dataset.color);
    });

    tile.addEventListener('mouseup', function () {
        controlResetTile();
    });
});
