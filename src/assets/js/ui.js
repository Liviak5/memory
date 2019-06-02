'use strict';

let gameBoard = document.getElementById('game-board');
let newGameButton = document.getElementById('Button__new-Game');
let cardsAmount = document.getElementById('cards-amount');
let board;

function newGame() {
    gameBoard.innerHTML = "";
    board = new Board(cardsAmount.value);
    board.init();
    createCards(board);
}

function createCards(game) {
    game.cards.forEach(card => {
        let newCard = document.createElement('div');
        newCard.classList = "card";
        if (!card.imageVisibility) {
            newCard.classList.add('card--hidden');
        }
        if (!card.active) {
            newCard.classList.add('done');
        }
        newCard.classList.add('card__image--' + card.cardNumber);
        newCard.id = card.cardPosition;
        newCard.style.order = card.cardPosition;
        gameBoard.appendChild(newCard);
    });
}

function findCardByPosition(card) {
    let index = board.cards.findIndex(function (e) {
        return e.cardPosition == card.target.id;
    });
    return index;
}

function findCardByNumber(number) {
    let index = board.cards.findIndex(function (e) {
        return e.cardPosition == number;
    });
    return index;
}

function showCard(e) {
    let index = findCardByPosition(e);
    board.cards[index].imageVisibility = true;
    board.tempPositions.push(e.target.id);
    e.target.classList.remove('card--hidden');
}

function checkMatches(card1, card2) {
    if (card1.cardNumber === card2.cardNumber) {
        card1.active = false;
        card2.active = false;
    } else {
        card1.imageVisibility = false;
        card2.imageVisibility = false;
    }
    board.tempPositions = [];
}

function checkGame(){
    if (board.tempPositions.length > 2) {
        let card1 = board.tempPositions[0];
        let card2 = board.tempPositions[1];
        checkMatches(board.cards[findCardByNumber(card1)], board.cards[findCardByNumber(card2)]);
        board.cards.forEach(card => {
            if (card.active) {
                let domCard = document.getElementById(card.cardPosition);
                domCard.classList.add('card--hidden');
            }
        });
    }
}

ready(() => {
    newGameButton.addEventListener('click', newGame);
    gameBoard.addEventListener('click', e => {
        showCard(e);
    });
    gameBoard.addEventListener('click', e => {
        checkGame();
    });
});