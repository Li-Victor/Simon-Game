'use strict';

var radioButtons = document.querySelectorAll('input');
var playButton = document.querySelector('.play_button');
var resetButton = document.querySelector('.reset_button');
var tiles = document.querySelectorAll('.tile');

radioButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        playButton.disabled = false;
        controlStrictMode(this.value);
    });
});

playButton.addEventListener('click', function () {
    resetButton.disabled = false;
    playButton.disabled = true;

    controlPlayButton();
});

resetButton.addEventListener('click', function () {
    playButton.disabled = false;
    this.disabled = true;

    radioButtons.forEach(function (button) {
        button.checked = false;
    });

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
