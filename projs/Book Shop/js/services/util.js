'use strict'

function makeId(length = 5) {
    const possible = '0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function isFileExists(fileLocation) {
    var http = new XMLHttpRequest();

    http.open('HEAD', fileLocation, false);
    http.send();

    return http.status != 404;
}
