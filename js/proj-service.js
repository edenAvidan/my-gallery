'use strict'

var gProjs;

_createProjs();

function getProjs() {
    return gProjs;
}

function getProjById(projId) {
    return gProjs.find(proj => proj.id === projId);
}

function _createProjs() {
    gProjs = [
        _createProj('minesweeper', 'Minesweeper', 'Classic Minesweeper', 'Should be lorem', '1.29.2022', ['Matrixes', 'mouse events']),
        _createProj('pacman', 'Pacman', 'Classic Pacman', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('book-shop', 'Book Shop', 'A Book Shop', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('chess', 'Chess', 'Classic Chess', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('guess-me', 'GuessMe', 'Think Of Someone And I Will Guess It', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('ballon-pop', 'Ballon Pop', 'It\'s Like Bubble Wrap', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
    ]
}

function _createProj(id, name, title, desc, publishedAt, labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: `projs/${id}`,
        publishedAt: publishedAt,
        labels: labels
    }
}
