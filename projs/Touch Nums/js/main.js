'use strict'

var gNums;
var gCurrNum;
var gTimerInterval;
var gGameStartTime;

function init() {
    gCurrNum = 1;
    createBoard();
}

function resetGame() {
    if (gTimerInterval)
        clearInterval(gTimerInterval);
    gCurrNum = 1;
    gTimerInterval = null;
    gGameStartTime = null;
    createBoard();
    updateNextNumber();
}

function createBoard() {
    gNums = getShuffeledNums(getBoardSize());
    createNumTable();
}

function createNumTable() {
    var strHTML = '';
    var length = Math.sqrt(gNums.length);
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < length; j++) {
            var idx = i * length + j;
            strHTML += `<td class="num-button" onclick="cellClicked(this)">${gNums[idx]}</td>`;
        }
        strHTML += '</tr>'
    }
    document.querySelector('.game-container table tbody').innerHTML = strHTML;
}

function cellClicked(clickedNum) {
    if (!gTimerInterval)
        gTimerInterval = setInterval(updateTimer, 100);

    var cellNum = parseInt(clickedNum.innerHTML);
    if (cellNum === gCurrNum) {
        clickedNum.style.backgroundColor = 'green';
        clickedNum.classList.add('no-hover');
        gCurrNum++;
        if (gCurrNum > gNums.length) {
            updateTimer();
            clearInterval(gTimerInterval);
        }
        else updateNextNumber();
    }
}

function updateNextNumber() {
    document.querySelector('.next-number').innerHTML = gCurrNum;
}

function updateTimer() {
    var elTimer = document.querySelector('.timer');
    if (!gGameStartTime)
        gGameStartTime = Date.now();
    var diff = new Date(Date.now() - gGameStartTime);
    elTimer.innerHTML = `${diff.getSeconds()}:${diff.getMilliseconds()}`;

}

function getBoardSize() {
    var elements = document.getElementsByName('difficulty');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
        }
    }
}

function getShuffeledNums(size) {
    gNums = [];
    for (var i = 0; i < size; i++) {
        gNums[i] = i + 1;
    }

    return shuffle(gNums)
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}