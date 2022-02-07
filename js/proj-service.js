'use strict'

var gProjs;

_createProjs();

function getProjs() {
    return gProjs;
}

function _createProjs() {
    gProjs = [
        _createProj('minesweeper', 'Minesweeper', 'Work in progress', 'Should be lorem', '1.29.2022', ['Matrixes', 'mouse events']),
        _createProj('pacman', 'Pacman', 'Work in progress2', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('pacman', 'Pacman', 'Work in progress2', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('pacman', 'Pacman', 'Work in progress2', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('pacman', 'Pacman', 'Work in progress2', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
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
