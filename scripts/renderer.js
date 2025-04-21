// @ts-check

import { moveCard, renderCard } from "../card.js";
import { showDealerHandValue, showPlayerHandValue } from "../hand_value.js";
import { showModal } from "../modal.js";
import { getDealerCardLocation, getPlayerCardLocation } from "../positions.js";

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


export function resetGameUI() {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = "";

    showModal();
}