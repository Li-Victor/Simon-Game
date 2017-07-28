'use strict';

var radioButtons = document.querySelectorAll('input');
var playButton = document.querySelector('.play_button');
var resetButton = document.querySelector('.reset_button');

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

    controlResetButton()

});
