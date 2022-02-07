'use strict'

const WALL = '#';
const FOOD = '.';
const POWER_FOOD = '🍥';
const CHERRY = '🍒';
const EMPTY = ' ';

var gBoard;
var gGame = {
    score: 0,
    isOn: false
};
var gFoodOnBoard;
var gAddCherryInterval;

function init() {
    gGame.isOn = true;
    gBoard = buildBoard();
    addPowerFood(gBoard);
    createPacman(gBoard);
    createBoard(gBoard, '.board-container');
    createGhosts(gBoard);
    gAddCherryInterval = setInterval(addCherry, 15000);
}

function resetGame() {
    updateScore(-gGame.score);
    gGame.score = 0;
    gGhosts = [];
    gDeadGhosts = [];
    document.querySelector('.game-over-container').classList.add('hidden');
    init();
}

function buildBoard() {
    var SIZE = 10;
    var board = [];

    gFoodOnBoard = 0;
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            } else gFoodOnBoard++;
        }
    }
    return board;
}

function addPowerFood(board) {

    board[1][1] = POWER_FOOD;
    board[1][board[0].length - 2] = POWER_FOOD;

    board[board.length - 2][1] = POWER_FOOD;
    board[board.length - 2][board[0].length - 2] = POWER_FOOD;

}

function addCherry() {
    var randEmptyCell = getRandEmptyPos();
    if (!randEmptyCell) return;
    gBoard[randEmptyCell.i][randEmptyCell.j] = CHERRY;
    renderCell(randEmptyCell, CHERRY);
}

function getRandEmptyPos(countFoodAsEmpty = false) {
    var emptyCells = findEmptyCellsPos(countFoodAsEmpty);
    if (!emptyCells.length) return null;

    return emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)];
}

function findEmptyCellsPos(countFoodAsEmpty = false) {
    var emptyCellsPos = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === EMPTY || (countFoodAsEmpty && gBoard[i][j] === FOOD)) emptyCellsPos.push({ i: i, j: j });
        }
    }
    return emptyCellsPos;
}

function getGameObjectHtml(location) {
    var cell = gBoard[location.i][location.j];
    var className = ` `;
    var overRideStyle = '';
    switch (cell) {
        case FOOD:
            className += 'food ';
            break;
        case POWER_FOOD:
            className += 'power-food ';
            break;
        case PACMAN:
            className += 'pacman ';
            if (!gPacman.isSuper) className += 'not-super';
            break;
        case GHOST:
            if (!gPacman.isSuper) overRideStyle += ` style="color:${getGhostByPos(location).color}" `;
            className += 'ghost-color ';
            break;
    }

    return `<span ${overRideStyle} class="${className}">${cell}</span>`;
}

function createBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            strHTML += `<td class="cell cell-${i}-${j}">${getGameObjectHtml({ i: i, j: j })}</td>`;
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function handleGameControls(keyboardEvent) {

    switch (keyboardEvent.code) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'KeyW':
        case 'KeyS':
        case 'KeyA':
        case 'KeyD':
            movePacman(keyboardEvent.code);
            break;
        case 'KeyR':
            resetGame();
            break;;
    }
}

function gameOver(isPlayerWon) { // add parameter isPlayerWon
    console.log('Game Over');
    gGame.isOn = false;

    clearInterval(gAddCherryInterval);
    clearInterval(gIntervalGhosts);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    document.querySelector('.ending-msg').innerHTML = isPlayerWon ? 'won!' : 'lost...';
    document.querySelector('.game-over-container').classList.remove('hidden');
}

