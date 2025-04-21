// @ts-check
import { flipCard } from "../card.js";
import { showDealerHandValue } from "../hand_value.js";
import { dealCardsToDealer, dealCardsToPlayer, getCardRank, getCardValue } from "./cards.js";
import { hideGameUI, renderDealCardToDealerHand, renderDealCardToPlayerHand, resetGameUI } from "./renderer.js";
import { getDealerHand, getPlayerBank, getPlayerHand, resetGameState, setGameState, setPlayerBank } from "./state.js";
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
export async function actionPlayerHit() {
    const cards = getPlayerHand();
    const dealtCard = dealCardsToPlayer()[0];

    renderDealCardToPlayerHand(cards, dealtCard);

    await sleep(750);
    let ended = checkGameEnded();
    if (ended != null) endGame(ended);

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

        let ended = checkGameEnded();
        if (ended != null) { endGame(ended); return; }
    }

    let ended = checkGameEnded(true);
    // assert(ended != null);
    if (ended != null) endGame(ended);
}

/**
 * @param {boolean} isFinished
 * @returns {"win" | "lose" | "draw" | null}
 */
export function checkGameEnded(isFinished = false) {
    const player = getPlayerHand();
    const dealer = getDealerHand();

    const playerHand = getHandValue(player);
    const dealerHand = getHandValue(dealer);

    if (playerHand == 21) return "win";
    if (dealerHand == 21) return "lose";

    if (playerHand > 21) return "lose";
    if (dealerHand > 21) return "win";

    if (isFinished) {
        if (playerHand == dealerHand) return "draw";
        else if (playerHand > dealerHand) return "win";
        else return "lose";
    }

    return null;
}


/**
 * @param {"win" | "lose" | "draw"} playerWin 
 */
export async function endGame(playerWin) {
    const betAmountElem = /** @type {HTMLInputElement | null} */ (document.getElementById("bet-amount"));
    if (!betAmountElem) return;

    const betAmount = parseInt(betAmountElem.value);

    flipCard(getDealerHand()[0]);
    showDealerHandValue(true);

    if (playerWin == "win") {
        alert("you won!");
        setPlayerBank(getPlayerBank() + 2 * betAmount);
    } else if (playerWin == "lose") {
        alert("you lost!");
    } else if (playerWin == "draw") {
        alert("draw!");
        setPlayerBank(getPlayerBank() + betAmount);
    }

    hideGameUI();
    await sleep(3000);

    resetGameState();
    resetGameUI();
}