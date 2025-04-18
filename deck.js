// @ts-check

import { shuffle } from "./utils.js";
import { totalDeck } from "./card_data.js";

/**
 * @import {Card} from "./card_data"
 */

export class Deck {
    /**
     * Creates a deck of cards.
     * 
     * @constructor
     */
    constructor() {
        let allCards = [...totalDeck];
        shuffle(allCards);
        this.cards = allCards;
    }

    /**
     * Returns the card pile
     * 
     * @returns {Card[]}
     */
    get cardPile() {
        return this.cards;
    }

    /**
     * Pops and returns a card from the top of the stack.
     * 
     * @returns {Card}
     */
    popCard() {
        if (this.cards.length == 0) {
            throw new Error("Out of cards!");
        }

        const card = this.cards[0];
        this.cards = [...this.cards.slice(1, this.cards.length)];
        return card;
    }
};
