# Rock Paper Scissors Game

This is a simple rock paper scissors game made using micro::bit.

## How to use

When the game started, click Button A for single-player game (player v.s. computer), or multiplayer (player v.s. player). Next, the game mode name will slide into view, followed by the initial score counter (0:0).

After that, when you see a number showing up on the screen, it's time for you to make choice. The number on the screen indicated which player should make choices for the turn. Note that when you're in singleplayer mode, you'll always be Player 1, and the computer will always be Player 2

To make choice, press on any of the three pins below the board. Below are their represented character:

PIN NUM | CHAR
------- | ------
0       | Stone
1       | Scissors
2       | Paper

After both players have made their choices, the system will reveal the choice of both players, and the winner checking mechanism will start doing its job.

When you're in singleplayer mode and you've won the computer, a smiley face will show up on the screen, or else a sad face will be presented in front of you. 

Then, the updated score will scroll from right to the left, no matter you're in singleplayer or multiplayer.

To check the score while playing, click on the logo at the top of the board.

When any of the players get to 5 marks, the game will end, and the system will tell which player has won. In singleplayer mode, the system will simply tell you either 'You win' or 'You lost'.

That's it! Restart the game, and you can play the game again. There is no limitation on how many times you can play the game, as long as you're having fun with it.

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/melvinchia3636/microbit-rock-paper-scissors** and click import
