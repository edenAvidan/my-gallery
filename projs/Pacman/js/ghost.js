'use strict'

const GHOST = '&#9781;';
const NUM_OF_GHOSTS = 3;
var gGhosts;
var gDeadGhosts;
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: getRandEmptyPos(true),
        currCellContent: FOOD,
        color: getRandomColor()
    };

    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

    return ghost;
}

function createGhosts(board) {
    gDeadGhosts = [];
    gGhosts = [];
    for (var i = 0; i < NUM_OF_GHOSTS; i++) {
        createGhost(board, i);
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    };
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL || nextCell === GHOST) {
        moveGhost(ghost); // find another possible location
        return;
    }
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            moveGhost(ghost); // run away from pacman
            return;
        } else gameOver(false);
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, getGameObjectHtml(ghost.location));

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    };
    ghost.currCellContent = nextCell;
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGameObjectHtml(ghost.location));
}

function destroyGhost(ghost) {
    gGhosts.splice(gGhosts.indexOf(ghost), 1);
    gDeadGhosts.push(ghost);
}

function getGhostByPos(pos) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === pos.i && gGhosts[i].location.j === pos.j) return gGhosts[i];
    }
    return null;
}

function getGhostHTML(ghost) {
    var color = gPacman.isSuper ? 'red' : ghost.color;
    return `<span style="color: ${color}">${GHOST}</span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 };
    } else if (randNum <= 50) {
        return { i: -1, j: 0 };
    } else if (randNum <= 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

