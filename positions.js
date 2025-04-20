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
        constants.viewHeight - constants.cardHeight,
        (constants.viewWidth - totalWidth) / 2 + (constants.cardWidth + constants.cardGap) * index,
    ];
}
