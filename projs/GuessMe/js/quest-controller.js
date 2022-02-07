'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-play-again').click(onRestartGame);

function init() {
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide();

  renderQuest();

  $('.quest').show();
}

function renderQuest() {
  const currQuest = getCurrQuest();
  const question = currQuest.txt + (isChildless(currQuest) ? '' : '?');
  $('.quest h2').text(question);
}

function onUserResponse(ev) {
  const res = ev.data.ans;
  const currQuest = getCurrQuest();

  // If this node has no children
  if (isChildless(currQuest)) {
    $('.quest').hide();
    if (res === 'yes') {
      const $elPlayAgain = $('.play-again');
      $elPlayAgain.find('.answer').text(currQuest.txt)
      $elPlayAgain.show();
    } else {
      $('.new-quest').show();
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();

  const $elNewGuess = $('#newGuess');
  const $elNewQuest = $('#newQuest');

  addGuess($elNewQuest.val(), $elNewGuess.val(), gLastRes);

  $elNewGuess.val(''); // next time the from is shown it will be empty
  $elNewQuest.val('');
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.play-again').hide();
  $('.game-start').show();
  gLastRes = null;
  restartGame();
}
