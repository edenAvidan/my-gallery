'use strict'
const PACMAN = '😷';
const CHERRY_POINTS = 10;

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false,
        cherryCollected: 0
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodOnBoard--;
}

function movePacman(ev) {
    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === POWER_FOOD) {
        if (!gPacman.isSuper) {
            gPacman.isSuper = true;
            setTimeout(deactivatePowerFood, 5000);
        }
    }  // change so it will be for 5 seconds

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            nextCell = eatGhost(nextLocation);
        } else {
            gameOver(false);
            return;
        }
    }
    if (nextCell === FOOD || nextCell === POWER_FOOD) {
        updateScore(1);

        if (gFoodOnBoard === (gGame.score - gPacman.cherryCollected * CHERRY_POINTS)) { // winning condition
            gameOver(true);
        }
    } else if (nextCell === CHERRY) {
        updateScore(CHERRY_POINTS);
        gPacman.cherryCollected++;
    }

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, getGameObjectHtml(gPacman.location));

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, getGameObjectHtml(gPacman.location));
}

function eatGhost(ghostLocation) {
    var ghost = getGhostByPos(ghostLocation);
    var nextCell = ghost.currCellContent;
    ghost.currCellContent = EMPTY;
    renderCell(ghostLocation, EMPTY);
    destroyGhost(ghost);
    return nextCell;
}

function deactivatePowerFood() {
    if (!gGame.isOn) return;

    gGhosts.push(...gDeadGhosts);
    gDeadGhosts = [];
    gPacman.isSuper = false;
}

function getNextLocation(keyboardEventCode) {
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEventCode) {
        case 'ArrowUp':
        case 'KeyW':
            nextLocation.i--
            break;
        case 'ArrowDown':
        case 'KeyS':
            nextLocation.i++
            break;
        case 'ArrowLeft':
        case 'KeyA':
            nextLocation.j--
            break;
        case 'ArrowRight':
        case 'KeyD':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}