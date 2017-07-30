# Simon-Game

Users are presented with a random series of button presses.

Each time a user inputs a series of button presses correctly, the user sees the same series of button presses but with an additional step.

There is a sound that corresponds to each button both when the series of button presses plays, and when the user personally press a button.

If the user press the wrong button, they are notified of it, and that series of button presses starts again to remind the user of the pattern so they can try again.

Users can see how many steps are in the current series of button presses.

If the user wants to restart, they can hit a button to do so, and the game will return to a single step.

The user can play in strict mode where if they get a button press wrong, it notifies them, and the game restarts at a new random series of button presses.

Users can win the game by getting a series of 20 steps correct. The user is then notified of the victory, then the game starts over.

Made with HTML, CSS, and vanilla Javascript. Project structure in [**Model-View-Controller**](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
