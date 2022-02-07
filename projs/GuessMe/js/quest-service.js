'use strict'

const QUESTION_KEY = 'questDB';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(QUESTION_KEY);

    if (!gQuestsTree) {
        gQuestsTree = _createQuest('Male');
        gQuestsTree.yes = _createQuest('Gandhi');
        gQuestsTree.no = _createQuest('Rita');
        _saveQuestsToStorage();
    }

    gCurrQuest = gQuestsTree;
}

function isChildless(node) {
    return !node.yes && !node.no;
}

function restartGame() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = _createQuest(newQuestTxt);
    newQuest.yes = _createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    gPrevQuest[lastRes] = newQuest;

    _saveQuestsToStorage();
}

function getCurrQuest() {
    return gCurrQuest;
}

function _createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function _saveQuestsToStorage() {
    saveToStorage(QUESTION_KEY, gQuestsTree);
}
