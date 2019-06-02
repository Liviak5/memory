'use strict';

class Card {
    constructor(number) {
        this._cardNumber = number;
        this._cardPosition = 0;
        this.active = true;
        this.imageVisibility = false;
    }

    get cardPosition() {
        return this._cardPosition;
    }

    set cardPosition(value) {
        if (typeof value === 'number') {
            this._cardPosition = value;
        } else {
            console.log('this is not a number')
        }
    }

    get cardNumber() {
        return this._cardNumber;
    }

    set cardNumber(value) {
        if (typeof value === 'number') {
            this._cardNumber = value;
        } else {
            console.log('this is not a number')
        }
    }
}

class Board {
    constructor(number) {
        this.cards = [];
        this.amount = number;
        this.tempPositions = [];
    }

    init() {
        for (let i = 1; i <= this.amount; i++) {
            this.tempPositions.push(i);
        }
        for (let i = 1; i <= this.amount / 2; i++) {
            this.addNewCard();
        }
        this.addCardsPosition();
    }

    /**
     * Add New Card to the board
     */
    addNewCard() {
        let number;
        if (this.cards.length === 0) {
            number = 1;
        } else {
            number = (this.cards.length + 2) / 2;
        }
        let card = new Card(number);
        let card2 = new Card(number);
        this.cards.push(card);
        this.cards.push(card2);
    }

    /**
     * Add Cardposition to each card
     */
    addCardsPosition() {
        this.cards.forEach(card => {
            let random = this.generateRandomNumber(this.tempPositions);
            card.cardPosition = random;
            this.tempPositions.splice(this.tempPositions.findIndex(function (e) {
                return e === random;
            }), 1);
        })
    }

    /**
     * Disables Cards
     * @param number
     */
    disableCards(number) {
        this.cards.forEach(card => {
            if (card.cardNumber === number) {
                card.active = false;
            }
        })
    }

    /**
     * generate random number for Position and push it into array
     */
    generateRandomNumber(arr) {
        let actualPosition = Math.floor(Math.random() * (arr.length - 1));
        return arr[actualPosition];
    }
}

// only for tests needed
if (typeof module !== 'undefined' && module) {
    module.exports.Card = Card;
    module.exports.Board = Board;
}