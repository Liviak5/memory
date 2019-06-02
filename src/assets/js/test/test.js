// Machen wir nur für die node Tests
if (typeof module !== 'undefined' && module) {
    assert = require('chai').assert;
    expect = require('chai').expect;

    Card = require('../models').Card;
    Board = require('../models').Board;
}

describe('Memory', function () {
    describe('Card', function () {
        it('wir sollten Karten erzeugen können', function () {
            let c = new Card;
            assert.instanceOf(c, Card);
        });
        it('Karten sollten einen Aktiv-Status, eine Bildnummer, eine Position und einen Sichtbarkeits-Status haben', function () {
            let c = new Card(0, 0);
            expect(c.active).to.not.equal(undefined);
            expect(c.cardNumber).to.not.equal(undefined);
            expect(c.cardPosition).to.not.equal(undefined);
            expect(c.imageVisibility).to.not.equal(undefined);
        });
        it('Karten sollten sich aktivieren und deaktivieren lassen', function () {
            let c = new Card;
            c.active = false;
            c.active = true;
            expect(c.active).to.equal(true);
            c.active = false;
            expect(c.active).to.equal(false);
        });
        it('Bild-Nummer sollte gesetzt werden können', function () {
            let c = new Card(3, 0);
            expect(c.cardNumber).to.equal(3);
            c.cardNumber = "text";
            expect(c.cardNumber).to.equal(3);
            c.cardNumber = 5;
            expect(c.cardNumber).to.equal(5);
        });
        it('Positions-Nummer sollte gesetzt werden können', function () {
            let c = new Card(1, 0);
            c.cardPosition = "text";
            expect(c.cardPosition).to.equal(0);
            c.cardPosition = 4;
            expect(c.cardPosition).to.equal(4);
        });
    });

    describe('Board', function () {

        it('wir sollten Board erzeugen können', function () {
            let b = new Board;
            assert.instanceOf(b, Board);
        });

        it('Board sollten Karten haben', function () {
            let b = new Board(2);
            b.init();
            expect(b.cards).to.not.equal(undefined);
            expect(b.amount).to.not.equal(undefined);
        });

        it('Board sollten Cards hinzufügen können und es sollte ein Doppel erzeugt werden', function () {
            let b = new Board(2);
            b.init();
            expect(b.cards.length).to.equal(2);
        });

        it('Board-Cards sollten die richtige Nummer zugewiesen bekommen', function () {
            let b = new Board(6);
            b.init();
            expect(b.cards[0].cardNumber).to.equal(1);
            expect(b.cards[1].cardNumber).to.equal(1);
            expect(b.cards[2].cardNumber).to.equal(2);
            expect(b.cards[3].cardNumber).to.equal(2);
            expect(b.cards[4].cardNumber).to.equal(3);
            expect(b.cards[5].cardNumber).to.equal(3);
        });

        it('Cards im Board sollten deaktiviert werden können', function () {
            let b = new Board(6);
            b.init();
            expect(b.cards.length).to.equal(6);
            b.disableCards(1);
            expect(b.cards[0].active).to.equal(false);
            expect(b.cards[1].active).to.equal(false);
            expect(b.cards[2].active).to.equal(true);
            expect(b.cards[3].active).to.equal(true);
            expect(b.cards[4].active).to.equal(true);
            expect(b.cards[5].active).to.equal(true);
        });

        it('Jedem Board sollte automatisch die gewünschte Kartenzahl zugewiesen werden ', function () {
            let b = new Board(20);
            b.init();
            expect(b.cards.length).to.equal(20);
        });

        it('Jeder Card im Board sollte automatisch eine Position zugewiesen werden zwischen 1 und der Höhe der Kartenanzahl', function () {
            let b = new Board(20);
            b.init();
            expect(b.cards[0].cardPosition).not.to.equal(0);
            expect(b.cards[1].cardPosition).not.to.equal(0);
            expect(b.cards[1].cardPosition).not.to.equal(b.cards[0].cardPosition);
        });
    });
});