// @ts-check

import { moveCard, renderCard } from "./card.js";
import { Constants } from "./constants.js";
import { renderPhantomDeck } from "./deck.js";
import { getPlayerCardLocation } from "./positions.js";

/**
 * @import {Card} from "./scripts/cards.js"
 */

/**
 * app state **triggers** ui changes
 * like u wud expect say in react.
 */
export class AppState {
    /**
     * @constructor
     * @param {Constants} constants Global state constants
     * @param {Card[]} pile Popped from the end
     */
    constructor(constants, pile) {
        this.constants /** @type {Constants} */ = constants;
        this.pile /** @type {Card[]} */ = pile
        this.player /** @type {Card[]} */ = [];

        renderPhantomDeck();
    }

    drawCard() {
        let card = this.pile.pop();
        if (!card) return;


        this.player.forEach((card, i) => moveCard(card, ...getPlayerCardLocation(i, this.player.length + 1)));
        this.player.push(card);
        renderCard(card, ...getPlayerCardLocation(this.player.length - 1, this.player.length));
    }
}
