// @ts-check
import { dealCardsToDealer, dealCardsToPlayer, getCardRank, getCardValue } from "./cards.js";
import { renderDealCardToDealerHand, renderDealCardToPlayerHand } from "./renderer.js";
import { getDealerHand, getGameState, getPlayerBank, getPlayerHand, setGameState } from "./state.js";
import { sleep } from "./util.js";

/**
 * @import {Card} from "./cards.js"
 */

/**
 * Calculate the blackjack value of a hand
 * @param {Card[]} hand 
 * @returns {Number}
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

/**
 * Checks if a hand is a blackjack (Ace + 10 value card)
 * @param {Number[]} hand 
 * @returns {boolean}
 */
export function handIsBlackjack(hand) {
    return (hand.length === 2) && (getHandValue(hand) === 21);
}

/**
 * Performs the actions necessary when the player hits
 */
export function actionPlayerHit() {
    const cards = getPlayerHand();
    const dealt_card = dealCardsToPlayer()[0];

    renderDealCardToPlayerHand(cards, dealt_card);
    
    const new_cards = getPlayerHand();

    // Fix for later to account for blackjack
    const handValue = getHandValue(new_cards);
    if (handValue == 21) {
        alert('win!');
    } else if (handValue > 21) {
        alert("lose!");
    }
}

/**
 * Performs the actions necessary when the player stands
 */
export async function actionPlayerStand() {
    let dealer_hand = getDealerHand();

    while (getHandValue(dealer_hand) <= 16) {
        let dealt_card = dealCardsToDealer()[0];

        renderDealCardToDealerHand(dealer_hand, dealt_card);
        await sleep(750);

        dealer_hand = getDealerHand();
    }

    // Fix for later to account for blackjack
    const handValue = getHandValue(getDealerHand());
    if (handValue == 21) {
        alert('you lost!');
    } else if (handValue > 21) {
        alert("you won!");
    }
}
