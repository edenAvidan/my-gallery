'use strict'

var gBaloons;

function init() {
    gBaloons = [];
    renderBallons(getRandomInt(10, 15));
    var intervalId = setInterval(moveBallons, 120);
    setTimeout(clearInterval, 30000, intervalId);
}

function ballonClick(elBallon) {
    //protecting from multiple poping sounds from the same ballon
    if (!elBallon.classList.contains('fade-out')) {
        //new Audio('sounds/pop.mp3').play();
        var popAudio = new Audio('sounds/pop.mp3');
        popAudio.play();
        elBallon.classList.add('fade-out');
    }
}

function moveBallons() {
    var elBallons = document.querySelectorAll('.ballon');

    for (var i = 0; i < elBallons.length; i++) {
        elBallons[i].style.bottom = gBaloons[i].bottom + 'px';
        gBaloons[i].bottom += gBaloons[i].speed;
    }
}

function renderBallons(numOfBallons) {
    document.body.innerHTML = createBallons(numOfBallons);
    initializeBaloons();
}

function createBallons(numOfBallons) {
    var ballonsHTML = '';
    for (var i = 0; i < numOfBallons; i++) {
        gBaloons[i] = createBaloon(getRandomInt(5, 15));
        ballonsHTML += '<div class="ballon" onclick="ballonClick(this)"></div>';
    }
    return ballonsHTML;
}

function initializeBaloons() {
    var elBaloons = document.querySelectorAll('.ballon');
    var leftAlign = 50;
    for (var i = 0; i < elBaloons.length; i++) {
        elBaloons[i].style.backgroundColor = getRandomColor();
        elBaloons[i].style.left = leftAlign + 'px';
        leftAlign += 80;
    }
}

function createBaloon(speed = 10) {
    return {
        bottom: 0,
        speed: speed
    };
}

function getRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
