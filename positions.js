// @ts-check

import { cardHeight, cardWidth, gap, sumSize } from "./card.js";
import { cardVerticalPadding, viewHeight, viewWidth } from "./index.js";

/**
 * Calculates the pile's position.
 *
 * @returns {[number, number]} An array containing the top and left offsets for the card position.
 */
export const drawPileLocation = () => {
    return [(viewHeight - cardHeight) / 2, 0];
};

/**
 * Calculates the dealer's card position for a given card index and total number of cards.
 *
 * @param {number} cardIdx - The index of the card (0-based).
 * @param {number} totalCards - The total number of cards to be displayed.
 * @returns {[number, number]} An array containing the top and left offset for the card position.
 */
export const drawDealerLocation = (cardIdx, totalCards) => {
    // assert(totalCards > 0);
    const totalWidth = cardWidth * totalCards + gap * (totalCards - 1);
    // ----------- viewWidth
    // [  [ | ]  ]
    //    ----- total width
    //    | want this left-offset
    const containerLeftOffset = (viewWidth - totalWidth) / 2;
    const leftOffset = containerLeftOffset + (cardWidth + gap) * cardIdx;
    return [cardVerticalPadding, leftOffset];
}

/**
 * Calculates the player's card position for a given card index and total number of cards.
 *
 * @param {number} cardIdx - The index of the card (0-based).
 * @param {number} totalCards - The total number of cards to be displayed.
 * @returns {[number, number]} An array containing the top and left offset for the card position.
 */
export const drawPlayerLocation = (cardIdx, totalCards) => {
    let [_, left] = drawDealerLocation(cardIdx, totalCards);
    return [
        viewHeight - cardVerticalPadding - cardHeight,
        left
    ];
}

/**
 * Calculates the dealer's card position for a given card index and total number of cards.
 *
 * @param {number} totalCards - The total number of player's cards.
 * @returns {[number, number]} An array containing the top and left offset for the sum display position.
 */
export const drawDealerSumContainerLocation = (totalCards) => {
    const totalWidth = cardWidth * totalCards + gap * (totalCards - 1);
    return [
        cardVerticalPadding + cardHeight / 2 - sumSize / 2,
        viewWidth / 2 + totalWidth / 2 + sumSize
    ];
};

/**
 * Calculates the player's card position for a given card index and total number of cards.
 *
 * @param {number} totalCards - The total number of player's cards.
 * @returns {[number, number]} An array containing the top and left offset for the sum display position.
 */
export const drawPlayerSumContainerLocation = (totalCards) => {
    const totalWidth = cardWidth * totalCards + gap * (totalCards - 1);
    return [
        viewHeight - cardVerticalPadding - cardHeight / 2 - sumSize / 2,
        viewWidth / 2 + totalWidth / 2 + sumSize
    ];
};
