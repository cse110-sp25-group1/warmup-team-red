// @ts-check
import { getCardRank, getCardValue } from "./cards.js";
import { getGameState, getPlayerBank, setGameStatus } from "./state.js";

/**
 * Calculate the blackjack value of a hand
 * @param {Number[]} hand 
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
 * Asks the player for the bet amount
 * @returns {Number}
 */
export function promptBetAmount() {
    return 0;
}

/**
 * Plan, use the game status number to decide what to do each turn. After each step in the game
 * is processesed call this blackjack_step function again
 */
export function blackjack_step() {
    switch (getGameState()) {
        // Bet Input
        case 0: {
            setGameStatus(1);
            break;
        }
        // Player Turn
        case 1: {
            setGameStatus(2);
            break;
        }
        // Dealer Turn
        case 2: {
            setGameStatus(3);
            break;
        }
        // Results/Play Again?
        case 3: {
            const play_again = getPlayerBank() > 0;
            if (play_again) {
                setGameStatus(0);
            }
            break;
        }
        // Unknown
        default: {
            console.log("Unknown game status. Resetting game status to 0.");
            setGameStatus(0);
            break;
        }
    }
}