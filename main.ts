function checkWin (p1: number, p2: number) {
    players = [p1, p2]
    for (let r = 0; r <= 1; r++) {
        for (let i = 0; i <= 2; i++) {
            win = true
            for (let j = 0; j <= 1; j++) {
                if (!(parseFloat(win_cases[i][j]) == players[j])) {
                    win = false
                }
            }
            if (win) {
                return r
            }
        }
        players.reverse()
    }
    return -1
}
function endGame (player_count: number) {
    for (let i = 0; i <= 1; i++) {
        if (score[i] == 5) {
            final_winner = i
            break;
        }
    }
    if (player_count == 1) {
        if (final_winner == 0) {
            music.setTempo(60)
            music.startMelody(melodies[0], MelodyOptions.OnceInBackground)
            end_game_text = "You win!"
        } else {
            music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.OnceInBackground)
            end_game_text = "You lose!"
        }
    } else {
        music.setTempo(60)
        music.startMelody(melodies[0], MelodyOptions.OnceInBackground)
        end_game_text = "P" + final_winner + " win!"
    }
    while (true) {
        basic.showString(end_game_text)
    }
}
function startGame () {
    music.startMelody(melodies[1], MelodyOptions.Once)
    while (true) {
        for (let t of text_list[0]) {
            basic.showString("" + (t))
            basic.clearScreen()
            if (started) {
                return 0
            }
        }
    }
}
function runSinglePlayer () {
    while (!(score[0] == 5 || score[1] == 5)) {
        if (!(player_choices[0] == -1)) {
            player_choices[1] = randint(0, 2)
            renderPlayerChoices()
            winner = checkWin(player_choices[0], player_choices[1])
            if (winner == -1) {
                basic.showIcon(IconNames.Asleep)
                music.startMelody(["G6:1", "G6:1"], MelodyOptions.Once)
            } else {
                score[winner] = score[winner] + 1
                if (!(winner)) {
                    basic.showIcon(IconNames.Happy)
                    music.startMelody(melodies[2], MelodyOptions.Once)
                } else {
                    basic.showIcon(IconNames.Sad)
                    music.startMelody(["G6:2", "E6", "D6", "G5:4"], MelodyOptions.Once)
                }
            }
            player_choices = [-1, -1]
            basic.clearScreen()
            basic.showString("" + score[0] + ":" + score[1])
        }
        if (!(icon_is_rendered)) {
            player_num_icon[0].showImage(0)
            icon_is_rendered = true
        }
        checkEvent()
    }
}
input.onButtonPressed(Button.A, function () {
    if (!(started)) {
        InitGame(1)
    }
})
function runMultiPlayer () {
    while (!(score[0] == 5 || score[1] == 5)) {
        if (!(player_choices[0] == -1) && !(player_choices[1] == -1)) {
            renderPlayerChoices()
            winner = checkWin(player_choices[0], player_choices[1])
            if (winner == -1) {
                basic.showIcon(IconNames.Asleep)
                music.startMelody(["G6:1", "G6:1"], MelodyOptions.Once)
            } else {
                score[winner] = score[winner] + 1
            }
            player_choices = [-1, -1]
            curr_player = 0
            basic.clearScreen()
            music.startMelody(melodies[2], MelodyOptions.OnceInBackground)
            basic.showString("" + score[0] + ":" + score[1])
        }
        if (!(player_choices[0] == -1) && !(curr_player == 1)) {
            curr_player = 1
            basic.clearScreen()
            icon_is_rendered = false
        }
        if (!(icon_is_rendered)) {
            player_num_icon[curr_player].showImage(0)
            icon_is_rendered = true
        }
        checkEvent()
    }
}
// function for rendering results on screen
function draw (index: number) {
    curr_icon = char_icon[index]
    curr_icon.showImage(0)
    showText(char_name[index])
}
function renderPlayerChoices () {
    basic.clearScreen()
    icon_is_rendered = false
    for (let i = 0; i <= 1; i++) {
        basic.pause(1000)
        for (let icon of [player_play_icon[i], char_icon[player_choices[i]]]) {
            music.setTempo(200)
            music.startMelody(["A6:1"], MelodyOptions.ForeverInBackground)
            icon.scrollImage(1, 200)
            music.stopMelody(MelodyStopOptions.Background)
            music.setTempo(100)
            basic.pause(500)
            basic.clearScreen()
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (!(started)) {
        InitGame(2)
    }
})
function checkEvent () {
    if (input.pinIsPressed(TouchPin.P0)) {
        player_choices[curr_player] = 0
        music.playTone(2349.32, 40)
    } else if (input.pinIsPressed(TouchPin.P1)) {
        player_choices[curr_player] = 1
        music.playTone(2349.32, 40)
    } else if (input.pinIsPressed(TouchPin.P2)) {
        player_choices[curr_player] = 2
        music.playTone(2349.32, 40)
    } else if (input.logoIsPressed()) {
        music.playTone(2349.32, 40)
        basic.clearScreen()
        basic.showString("" + score[0] + ":" + score[1])
        icon_is_rendered = false
    }
}
// show text and play some nmice
function showText (text: string) {
    for (let u of text) {
        music.playTone(523, music.beat(BeatFraction.Eighth))
        basic.showString("" + (u))
        basic.clearScreen()
        basic.pause(50)
    }
}
function InitGame (player_count: number) {
    started = true
    icon_is_rendered = false
    score = [0, 0]
    player_choices = [-1, -1]
    curr_player = 0
    music.setTempo(100)
    music.startMelody(["G6:1", "D7:3"], MelodyOptions.Once)
    play_init_icon[player_count - 1].scrollImage(1, 200)
    basic.pause(1000)
    basic.clearScreen()
    basic.showString("" + score[0] + ":" + score[1])
    if (player_count == 1) {
        runSinglePlayer()
    } else {
        runMultiPlayer()
    }
    endGame(player_count)
}
let curr_icon: Image = null
let curr_player = 0
let icon_is_rendered = false
let winner = 0
let player_choices: number[] = []
let end_game_text = ""
let final_winner = 0
let score: number[] = []
let win = false
let players: number[] = []
let melodies: string[][] = []
let player_play_icon: Image[] = []
let play_init_icon: Image[] = []
let player_num_icon: Image[] = []
let char_icon: Image[] = []
let win_cases: string[] = []
let char_name: string[] = []
let text_list: string[] = []
let started = false
started = false
text_list = ["Press Button A for single player. Press Button B for multiplayer", "Player 1", "Computer"]
char_name = ["stone", "scissors", "paper"]
win_cases = ["01", "12", "20"]
char_icon = [images.iconImage(IconNames.SmallSquare), images.iconImage(IconNames.Scissors), images.iconImage(IconNames.Square)]
player_num_icon = [images.createImage(`
    . . # . .
    . # # . .
    . . # . .
    . . # . .
    . # # # .
    `), images.createImage(`
    . # # # .
    . . . # .
    . # # # .
    . # . . .
    . # # # .
    `)]
play_init_icon = [images.createBigImage(`
    . . # . . . # # # .
    . # # . . . # . # .
    . . # . . . # # # .
    . . # . . . # . . .
    . # # # . . # . . .
    `), images.createBigImage(`
    . # # # . . # # # .
    . . . # . . # . # .
    . # # # . . # # # .
    . # . . . . # . . .
    . # # # . . # . . .
    `)]
player_play_icon = [images.createBigImage(`
    . # # # . . . # . .
    . # . # . . # # . .
    . # # # . . . # . .
    . # . . . . . # . .
    . # . . . . # # # .
    `), images.createBigImage(`
    . # # # . . # # # .
    . # . # . . . . # .
    . # # # . . # # # .
    . # . . . . # . . .
    . # . . . . # # # .
    `)]
melodies = [["C7:1", "D:1", "E:1", "F:1", "G:1", "F:1", "E:1", "C:1", "E:1", "F:1", "A8:1", "G7:2", "F:1", "E:2", "D:1", "E:1", "F:2", "B6:1", "C7:1", "D:2", "C7:2", "B6:2", "C7:2"], ["D7:2", "G6:1", "A6:3", "G6:4", "D7:2", "A6:4"], ["G6:1", "A6:1", "G6:1", "A6:1", "G6:2", "E6:1", "G6:1", "C7:3"]]
music.setBuiltInSpeakerEnabled(true)
music.setTempo(100)
startGame()
