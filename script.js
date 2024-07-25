const gameBoard = (function() {
    let gameArray = [[],[],[]];
    
    const placeToken = (token, x, y) => {
        gameArray[x][y] = token;
    }

    const resetBoard = () => {
        gameArray = [[],[],[]];
    }

    const checkWin = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (gameArray[i][0] !== undefined &&
                gameArray[i][0] === gameArray[i][1] &&
                gameArray[i][1] === gameArray[i][2]) {
                return true;
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (gameArray[0][j] !== undefined &&
                gameArray[0][j] === gameArray[1][j] &&
                gameArray[1][j] === gameArray[2][j]) {
                return true;
            }
        }

        // Check diagonals
        if (gameArray[0][0] !== undefined &&
            gameArray[0][0] === gameArray[1][1] &&
            gameArray[1][1] === gameArray[2][2]) {
            return true;
        }

        if (gameArray[0][2] !== undefined &&
            gameArray[0][2] === gameArray[1][1] &&
            gameArray[1][1] === gameArray[2][0]) {
            return true;
        }

        return false; // No winner yet
    }

    const checkTie = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; i < 3; j++) {
                if (gameArray[i][j] === undefined) {
                    return false;
                }
            }
        }

        return true;
    }

    return { placeToken, checkWin, checkTie };
})();

function createPlayer(token, name) {
    return { token, name };
}

const gameController = (function() {
    let gameState = false;

    const board = gameBoard;

    const gameOn = () => {
        gameState = true;
    }

    const getGameState = () => {
        return gameState;
    }

    const playerMove = (player, x, y) => {
        board.placeToken(player, x, y)
        if (board.checkWin()) {
            gameState = false;
            return player;
        }
        else if (board.checkTie()) {
            gameState = false;
            return 'tie'
        }
        else {
            return null;
        }
    }

    return { getGameState, gameOn, playerMove }
})();

console.log("Welcome to Tic Tac Toe")
const playerOne = prompt("Please Enter Player 1's Name", "Player One")
const playerTwo = prompt("Please Enter Player 2's Name", "Player Two")
const tokenOne = prompt("Please Enter Player 1's Token", "X")
const tokenTwo = prompt("Please Enter Player 2's Token", "O")

p1 = createPlayer(tokenOne, playerOne)
p2 = createPlayer(tokenTwo, playerTwo)

console.log(`Game will be player with ${p1.name} as ${p1.token} and ${p2.name} as ${p2.token}. Player 1 to start.`)

gameController.gameOn();
let winner = null;

console.log(gameController.getGameState())

while (gameController.getGameState()) {
    const moveOneX = parseInt(prompt(`${p1.name}, enter x coordinate:`));
    const moveOneY = parseInt(prompt(`${p1.name}, enter y coordinate:`));
    winner = gameController.playerMove(p1, moveOneX, moveOneY);
    if (!gameController.getGameState()) {
        break
    }
    const moveTwoX = parseInt(prompt(`${p2.name}, enter x coordinate:`));
    const moveTwoY = parseInt(prompt(`${p2.name}, enter y coordinate:`));
    winner = gameController.playerMove(p2, moveTwoX, moveTwoY);
}

if (winner) {
    if (winner === 'tie') {
        console.log('Game is a tie!')
    }
    else {
        console.log(`${winner.name} has won the game`)
    }
}
