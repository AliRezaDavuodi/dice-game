'use strict';

// - get all elements that we need
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scoreOne = document.getElementById('score--0');
const scoreTwo = document.getElementById('score--1');
const currentScoreOne = document.getElementById('current--0');
const currentScoreTwo = document.getElementById('current--1');

// -functions
const init = function () {
  // -- set all the values to zero
  state.currentPlayer = 0;
  state.scores = [0, 0];
  state.playing = true;

  // -- reset UI
  playerOne.classList.contains('player--winner')
    ? playerOne.classList.remove('player--winner')
    : playerTwo.classList.remove('player--winner');

  currentScoreTwo.textContent = 0;
  currentScoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  scoreOne.textContent = 0;
  dice.classList.add('hidden');

  // -- set the player one to play
  if (!playerOne.classList.contains('player--active')) {
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
  }
};

const changePlayer = function () {
  // -- change the player of game
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
  currentScoreTwo.textContent = 0;
  state.currentScore = 0;
  currentScoreOne.textContent = 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

// - create a statet
const state = {
  // -- we shold keep going to play or not
  playing: true,

  // -- scores of players
  scores: [0, 0],

  // -- whoes turn is it
  currentPlayer: 0,

  // -- craete current score
  currentScore: 0,
};

// init
init();

// - add event listener to roll dice
btnRoll.addEventListener('click', function () {
  // -- check for playing
  if (state.playing) {
    // -- generate number
    const generatedNumber = Math.trunc(Math.random() * 6) + 1;

    // -- show it's dice
    dice.classList.remove('hidden');
    dice.src = `dice-${generatedNumber}.png`;

    // -- check if the number is NOT one
    if (generatedNumber === 1) {
      // -  change the player
      changePlayer();
    } else {
      // - if NO update currnet score on UI and state
      state.currentScore += generatedNumber;
      state.currentPlayer === 0
        ? (currentScoreOne.textContent = state.currentScore)
        : (currentScoreTwo.textContent = state.currentScore);
    }
  }
});

// - add event listener to hold btn
btnHold.addEventListener('click', function () {
  if (state.playing) {
    // -- save the current score to the totall sore
    state.scores[state.currentPlayer] += state.currentScore;
    state.currentPlayer === 0
      ? (scoreOne.textContent = state.scores[state.currentPlayer])
      : (scoreTwo.textContent = state.scores[state.currentPlayer]);

    // -- set currnent score to zero
    state.currentScore = 0;
    state.currentPlayer === 0
      ? (currentScoreOne.textContent = 0)
      : (currentScoreTwo.textContent = 0);

    // -- check for continueing game
    if (state.scores[state.currentPlayer] >= 20) {
      // -- end the game
      state.playing = false;

      // -- show the winner
      state.currentPlayer
        ? playerTwo.classList.add('player--winner')
        : playerOne.classList.add('player--winner');

      // -- hide dice
      dice.classList.add('hidden');
    } else {
      // -- change the player of game
      changePlayer();
    }
  }
});

// - add event listener to play again btn
btnNew.addEventListener('click', init);
