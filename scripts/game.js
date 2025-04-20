// @ts-check
import { getCardRank, getCardValue } from "./cards.js";
import { getGameState, getPlayerBank, setGameState } from "./state.js";

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

            setGameState(1);
            break;
        }
        // Player Turn
        case 1: {
            setGameState(2);
            break;
        }
        // Dealer Turn
        case 2: {
            setGameState(3);
            break;
        }
        // Results/Play Again?
        case 3: {
            const play_again = getPlayerBank() > 0;
            if (play_again) {
                setGameState(0);
            }
            break;
        }
        // Unknown
        default: {
            console.log("Unknown game status. Resetting game status to 0.");
            setGameState(0);
            break;
        }
    }
}

// function blackjack() {
//     resetGameState();

//     let bet_amount = 0;

//     if (getPlayerBank() >= 1) {
//         // Input: How much would you like to bet?
//         bet_amount = promptBetAmount();
//         setPlayerBank(getPlayerBank() - bet_amount);
//     } else {
//         // Display: You ran out of money. You lose!
//     }

//     dealCardsToPlayer(2);
//     dealCardsToDealer(2);

//     while (getHandValue(getPlayerHand()) < 21) {
//         // Input: Hit or Stand?
//         const hit = true;

//         if (hit) {
//             dealCardsToPlayer();
//         }
//     }

//     // Player bust
//     if (getHandValue(getPlayerHand()) > 21) {
//         // Display: You lose!
//         // Input: Would you like to play again?
//         // If yes: blackjack();
//     }

//     while (getHandValue(getDealerHand()) <= 16) {
//         dealCardsToDealer();
//     }

//     // Dealer bust
//     if (getHandValue(getDealerHand()) > 21) {
//         // Display: You win!
//         setPlayerBank(getPlayerBank() + (2 * bet_amount));
//         // Input: Would you like to play again?
//         // If yes: blackjack();
//     }

//     const player_hand = getPlayerHand();
//     const player_hand_value = getHandValue(player_hand);
//     const player_blackjack = handIsBlackjack(player_hand);

//     const dealer_hand = getDealerHand();
//     const dealer_hand_value = getHandValue(dealer_hand);
//     const dealer_blackjack = handIsBlackjack(dealer_hand);

//     if (player_hand_value === dealer_hand_value) {
//         // Display: Push!
//         // Input: Would you like to play again?
//         // If yes: blackjack();
//     } else if (player_hand_value > dealer_hand_value) {
//         // Display: You win!
//         setPlayerBank(getPlayerBank() + (2 * bet_amount));
//         // Input: Would you like to play again?
//         // If yes: blackjack();
//     } else {
//         // Display: You lose!
//         // Input: Would you like to play again?
//         // If yes: blackjack();
//     }
// }