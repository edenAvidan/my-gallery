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
        _createProj('minesweeper', 'Minesweeper', 'Work in progress', 'Should be lorem', '1.29.2022', ['Matrixes', 'mouse events']),
        _createProj('pacman', 'Pacman1', 'Work in progress2', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('pacman', 'Pacman2', 'Work in progress2', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('pacman', 'Pacman3', 'Work in progress2', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
        _createProj('pacman', 'Pacman4', 'Work in progress2', 'Should be lorem2', '1.25.2022', ['Matrixes', 'keyboard events']),
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
