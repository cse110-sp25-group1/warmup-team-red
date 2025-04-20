// @ts-check

import { getCardRank, getCardValue } from "./cards.js";

/**
 * Calculate the blackjack value of a hand
 * @param {Number[]} hand 
 */
export function getHandValue(hand) {
    let count = 0;
    let ace_count = 0;

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        const rank = getCardRank(card);

        count += getCardValue(card);
        if (rank === 1) {
            ace_count += 1;
        }
    }

    // For each ace that keeps us above 21, treat as a 1 instead of 11
    while (count > 21 && ace_count > 0) {
        count -= 10;
        ace_count -= 1;
    }

    return count;
}
