// @ts-check
import { getValue } from "./card_data.js";
import { drawDealerSumContainerLocation, drawPlayerSumContainerLocation } from "./positions.js";
import { numberToPixel } from "./utils.js";

/**
 * @import {Card} from "./card_data"
 */

/**
 * 
 * @param {Card[]} cards 
 * @returns 
 */
export const getHandValue = (cards) => cards.map((card) => getValue(card)).reduce((acc, val) => acc + val, 0);


/**
 * Calculates, displays and returns the sum of the player's hand.
 * 
 * @param {Card[]} cards 
 * @param {boolean} initial 
 * @returns {number}
 */
export const showPlayerSum = (cards, initial = false) => {
    const sum = getHandValue(cards);

    const playerSumContainer = document.getElementById("player-sum-container");
    const playerSum = document.getElementById("player-sum");

    if (!playerSumContainer || !playerSum) return sum;

    const [top, left] = drawPlayerSumContainerLocation(cards.length);

    if (initial) {
        playerSumContainer.style.opacity = "1";
    }
    playerSumContainer.style.top = numberToPixel(top);
    playerSumContainer.style.left = numberToPixel(left);
    playerSum.innerHTML = `${sum}`;

    return sum;
}

/**
 * Calculates, displays and returns the sum of the AI's hand.
 * 
 * @param {Card[]} cards 
 * @param {boolean} initial 
 * @returns {number}
 */
export const showDealerSum = (cards, hideInitial = true, initial = false) => {
    const sum = hideInitial ? getHandValue(cards.slice(1, cards.length)) : getHandValue(cards);

    const dealerSumContainer = document.getElementById("dealer-sum-container");
    const playerSum = document.getElementById("dealer-sum");

    if (!dealerSumContainer || !playerSum) return sum;

    const [top, left] = drawDealerSumContainerLocation(cards.length);

    if (initial) {
        dealerSumContainer.style.opacity = "1";
    }
    dealerSumContainer.style.top = numberToPixel(top);
    dealerSumContainer.style.left = numberToPixel(left);
    playerSum.innerHTML = `${sum}`;

    return hideInitial ? getHandValue(cards) : sum;
}

/**
 * Hides the sum of the player's hand.
 */
export const hidePlayerSum = () => {
    const playerSumContainer = document.getElementById("player-sum-container");
    if (!playerSumContainer) return;
    playerSumContainer.style.opacity = "0";
}

/**
 * Resets the sum of the player's hand.
 */
export const resetPlayerSum = () => {
    const playerSumContainer = document.getElementById("player-sum-container");
    if (!playerSumContainer) return;
    playerSumContainer.style.top = "";
    playerSumContainer.style.left = "";
}

/**
 * Hides the sum of the player's hand.
 */
export const hideDealerSum = () => {
    const dealerSumContainer = document.getElementById("dealer-sum-container");
    if (!dealerSumContainer) return;
    dealerSumContainer.style.opacity = "0";
    dealerSumContainer.style.transition = "";
}

/**
 * Resets the sum of the dealer's hand.
 */
export const resetDealerSum = () => {
    const dealerSumContainer = document.getElementById("dealer-sum-container");
    if (!dealerSumContainer) return;
    dealerSumContainer.style.top = "";
    dealerSumContainer.style.left = "";
}
