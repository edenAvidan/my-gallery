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
        _createProj('minesweeper', 'Minesweeper', 'Classic Minesweeper', makeLorem(), '1/29/2022', ['Matrixes', 'mouse events']),
        _createProj('pacman', 'Pacman', 'Classic Pacman', makeLorem(), '1/25/2022', ['Matrixes', 'keyboard events']),
        _createProj('book-shop', 'Book Shop', 'A Book Shop', makeLorem(), '2/5/2022', ['CRUD']),
        _createProj('chess', 'Chess', 'Classic Chess', makeLorem(), '1/20/2022', ['Matrixes', 'mouse events']),
        _createProj('guess-me', 'GuessMe', 'Think Of Someone And I Will Guess It', makeLorem(), '2/6/2022', ['jQuery', 'Bootstrap']),
        _createProj('ballon-pop', 'Ballon Pop', 'It\'s Like Bubble Wrap', makeLorem(), '1/20/2022', ['Arrays']),
    ]
}

function _createProj(id, name, title, desc, publishedAt, labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: `projs/${name}`,
        publishedAt: publishedAt,
        labels: labels
    }
}
