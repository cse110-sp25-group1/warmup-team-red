// @ts-check

import { constants } from "./index.js";

/**
 * Get the `top` and `left` coordinates of the card pile.
 * 
 * @returns {[number, number]}
 */
export function getPileLocation() {
    return [constants.viewHeight / 2 - constants.cardHeight / 2, 0];
}

/**
 * Get the `top` and `left` coordinates of a dealer's card.
 * `index` should be from 0 to `outOf - 1` (inclusive).
 * 
 * @param {number} index
 * @param {number} outOf
 * @returns {[number, number]}
 */
export function getDealerCardLocation(index, outOf) {
    let totalWidth = constants.cardWidth * outOf + constants.cardGap * (outOf - 1);
    return [
        constants.padding,
        (constants.viewWidth - totalWidth) / 2 + (constants.cardWidth + constants.cardGap) * index,
    ];
}

/**
 * Get the `top` and `left` coordinates of a player's card.
 * `index` should be from 0 to `outOf - 1` (inclusive).
 * 
 * @param {number} index
 * @param {number} outOf
 * @returns {[number, number]}
 */
export function getPlayerCardLocation(index, outOf) {
    let totalWidth = constants.cardWidth * outOf + constants.cardGap * (outOf - 1);
    return [
        constants.viewHeight - constants.cardHeight - constants.padding,
        (constants.viewWidth - totalWidth) / 2 + (constants.cardWidth + constants.cardGap) * index,
    ];
}

/**
 * Calculates the dealer's card position for a given card index and total number of cards.
 *
 * @param {number} totalCards - The total number of player's cards.
 * @returns {[number, number]} An array containing the top and left offset for the sum display position.
 */
export const drawDealerSumContainerLocation = (totalCards) => {
    const totalWidth = constants.cardWidth * totalCards + constants.cardGap * (totalCards - 1);
    return [
        constants.padding + constants.cardHeight / 2 - constants.handValueContainerSize / 2,
        constants.viewWidth / 2 + totalWidth / 2 + constants.handValueContainerSize
    ];
};

/**
 * Calculates the player's card position for a given card index and total number of cards.
 *
 * @param {number} totalCards - The total number of player's cards.
 * @returns {[number, number]} An array containing the top and left offset for the sum display position.
 */
export const drawPlayerSumContainerLocation = (totalCards) => {
    const totalWidth = constants.cardWidth * totalCards + constants.cardGap * (totalCards - 1);
    return [
        constants.viewHeight - constants.padding - constants.cardHeight / 2 - constants.handValueContainerSize / 2,
        constants.viewWidth / 2 + totalWidth / 2 + constants.handValueContainerSize
    ];
};
