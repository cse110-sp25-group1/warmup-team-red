// @ts-check
import { resetAllState, getDeck, setDeck, getPlayerHand, setPlayerHand, getDealerHand, setDealerHand, getPlayerBank, setPlayerBank, resetGameState } from "./state.js";
import { dealCardsToDealer, dealCardsToPlayer, getCardName, getCardRank, getCardSuit, getCardValue, shuffleDeck } from "./cards.js";
import { blackjack_step, getHandValue, handIsBlackjack, promptBetAmount } from "./game.js";


if (localStorage.getItem("previously_visited") !== "true") {
    resetAllState();
    localStorage.setItem("previously_visited", "true");
}

while (true) {
    blackjack_step();
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