// @ts-check
import { resetAllState, getDeck, setDeck, getPlayerHand, setPlayerHand, getDealerHand, setDealerHand, getPlayerBank, setPlayerBank, resetGameState } from "./state.js";
import { dealCardsToDealer, dealCardsToPlayer, getCardRank, getCardSuit, getCardValue, shuffleDeck } from "./cards.js";
import { blackjack_step, getHandValue, handIsBlackjack, promptBetAmount } from "./game.js";


if (localStorage.getItem("previously_visited") !== "true") {
    resetAllState();
    localStorage.setItem("previously_visited", "true");
}

while (true) {
    blackjack_step();
}