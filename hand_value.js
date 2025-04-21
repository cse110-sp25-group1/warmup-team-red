// @ts-check

import { drawDealerSumContainerLocation, drawPlayerSumContainerLocation } from "./positions.js";
import { getHandValue } from "./scripts/game.js";
import { getDealerHand, getPlayerHand } from "./scripts/state.js";

/**
 * Calculates, displays and returns the sum of the player's hand.
 * 
 * @param {boolean} initial
 */
export const showPlayerHandValue = (initial = false) => {
    const handValue = getHandValue(getPlayerHand());

    const playerHandValue = document.getElementById("player-hand-value");
    if (!playerHandValue) return handValue;

    const [top, left] = drawPlayerSumContainerLocation(getPlayerHand().length);

    if (initial) {
        playerHandValue.style.opacity = "1";
    }
    playerHandValue.style.top = `${top}px`;
    playerHandValue.style.left = `${left}px`;
    playerHandValue.innerHTML = `${handValue}`;
}


/**
 * Hides the sum of the player's hand.
 */
export const hidePlayerSum = () => {
    const playerHandValue = document.getElementById("player-hand-value");
    if (!playerHandValue) return;
    playerHandValue.style.opacity = "0";
}

/**
 * Resets the sum of the player's hand.
 */
export const resetPlayerSum = () => {
    const playerHandValue = document.getElementById("player-hand-value");
    if (!playerHandValue) return;
    playerHandValue.style.top = "";
    playerHandValue.style.left = "";
}

/**
 * Calculates, displays and returns the sum of the dealer's hand.
 * 
 * @param {boolean} initial
 */
export const showDealerHandValue = (revealFirst, initial = false) => {
    const hand = getDealerHand();
    const handValue = getHandValue(hand.slice(revealFirst ? 0 : 1, hand.length));

    const dealerHandValue = document.getElementById("dealer-hand-value");
    if (!dealerHandValue) return handValue;

    const [top, left] = drawDealerSumContainerLocation(getDealerHand().length);

    if (initial) {
        dealerHandValue.style.opacity = "1";
    }
    dealerHandValue.style.top = `${top}px`;
    dealerHandValue.style.left = `${left}px`;
    dealerHandValue.innerHTML = `${handValue}`;
}


/**
 * Hides the sum of the dealer's hand.
 */
export const hideDealerSum = () => {
    const dealerHandValue = document.getElementById("dealer-hand-value");
    if (!dealerHandValue) return;
    dealerHandValue.style.opacity = "0";
}

/**
 * Resets the sum of the dealer's hand.
 */
export const resetDealerSum = () => {
    const dealerHandValue = document.getElementById("dealer-hand-value");
    if (!dealerHandValue) return;
    dealerHandValue.style.top = "";
    dealerHandValue.style.left = "";
}
