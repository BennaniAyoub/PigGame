'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current0.textContent = 0;

    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};
init();
const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
    if (playing) {
        const randomRoll = Math.trunc(Math.random() * 6) + 1;
        const imgSrc = `dice-${randomRoll}.png`;
        dice.src = imgSrc;
        dice.classList.remove('hidden');
        if (randomRoll !== 1) {
            currentScore += randomRoll;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});
btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            dice.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});
btnNew.addEventListener('click', init);
