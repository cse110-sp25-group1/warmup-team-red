// @ts-check

import { moveCard, moveCardBack, renderCard } from "../components/card.js";
import { renderPhantomDeck } from "../components/deck.js";
import { hideDealerSum, hidePlayerSum, resetDealerSum, resetPlayerSum, showDealerHandValue, showPlayerHandValue } from "../components/hand_value.js";
import { showModal } from "../components/modal.js";
import { getDealerCardLocation, getPileLocation, getPlayerCardLocation } from "../components/positions.js";
import { getDealerHand, getPlayerHand } from "./state.js";


/**
 * @import {Card} from "./cards.js"
 */


/**
 * @param {Card[]} hand
 * @param {Card} card 
 */
export function renderDealCardToPlayerHand(hand, card) {
    const new_hand_size = hand.length + 1;

    for (let i = 0; i < hand.length; i++) {
        moveCard(hand[i], ...getPlayerCardLocation(i, new_hand_size));
    }

    renderCard(card, ...getPlayerCardLocation(new_hand_size - 1, new_hand_size));

    showPlayerHandValue();
}


/**
 * @param {Card[]} hand
 * @param {Card} card 
 */
export function renderDealCardToDealerHand(hand, card) {
    const new_hand_size = hand.length + 1;

    for (let i = 0; i < hand.length; i++) {
        moveCard(hand[i], ...getDealerCardLocation(i, new_hand_size));
    }

    renderCard(card, ...getDealerCardLocation(new_hand_size - 1, new_hand_size))

    showDealerHandValue(false);
}


/**
 * Hide the game UI after game end.
 */
export function hideGameUI() {
    const app = document.getElementById("app");
    if (!app) return;

    getDealerHand().forEach(moveCardBack);
    getPlayerHand().forEach(moveCardBack);

    hidePlayerSum();
    hideDealerSum();
}


/**
 * 
 * Resets the game UI after hiding it using `hideGameUI()`.
 */
export function resetGameUI() {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = "";
    resetPlayerSum();
    resetDealerSum();
    renderPhantomDeck();
    showModal();
}