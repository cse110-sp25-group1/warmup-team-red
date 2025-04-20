// @ts-check
import { createDefaultDeck } from "./cards.js";


/**
 * Sets up game
 * - Creates a regular deck (0 - 51 unshuffled)
 * - Creates player hand (empty)
 * - Creates dealer hand (empty)
 * - Creates player bank (0) 
 */
export function resetAllState() {
    localStorage.clear();

    const deck = createDefaultDeck();

    // Per Game State
    localStorage.setItem("deck", deck.toString());
    localStorage.setItem("player_hand", [].toString());
    localStorage.setItem("dealer_hand", [].toString());
    localStorage.setItem("game_state", 0..toString());
    localStorage.setItem("player_bet", 0..toString());

    // Persistent User State
    localStorage.setItem("player_bank", 100..toString());
}


/**
 * Sets up *new* game (reset cards, but not money)
 * - Creates a regular deck (0 - 51 unshuffled)
 * - Creates player hand (empty)
 * - Creates dealer hand (empty)
 * - Sets player bet to 0
 * - Sets game state integer to 0
 */
export function resetGameState() {
    const deck = createDefaultDeck();

    localStorage.setItem("deck", deck.toString());
    localStorage.setItem("player_hand", [].toString());
    localStorage.setItem("dealer_hand", [].toString());
    localStorage.setItem("game_state", 0..toString());
    localStorage.setItem("player_bet", 0..toString());
}

/**
 * Helper function for getting the game deck.
 * - Note: Returns default deck (0 - 51 unshuffled) when not set
 * @returns {Number[]}
 */
export function getDeck() {
    const deck = localStorage.getItem("deck");

    if (deck) {
        return deck.split(",").map(c => Number.parseInt(c));
    } else {
        // console.log(`\"deck\" not set in local storage, using default value of []`);
        return [];
    }
}

/**
 * Helper function for setting the game deck
 * @param {Number[]} deck
 */
export function setDeck(deck) {
    localStorage.setItem("deck", deck.toString());
}

/**
 * Helper function for getting the player hand
 * - Note: Returns default player hand (empty) when not set
 * @returns {Number[]}
 */
export function getPlayerHand() {
    const player_hand = localStorage.getItem("player_hand");

    if (player_hand) {
        return player_hand.split(",").map(c => Number.parseInt(c));
    } else {        
        // console.log(`\"player_hand\" not set in local storage, using and setting default value of []`);
        return [];
    }
}

/**
 * Helper function for setting the player hand
 * @param {Number[]} deck
 */
export function setPlayerHand(deck) {
    localStorage.setItem("player_hand", deck.toString());
}

/**
 * Helper function for getting the dealer hand
 * - Note: Returns default dealer hand (empty) when not set
 * @returns {Number[]}
 */
export function getDealerHand() {
    const dealer_hand = localStorage.getItem("dealer_hand");

    if (dealer_hand) {
        return dealer_hand.split(",").map(c => Number.parseInt(c));
    } else {        
        // console.log(`\"dealer_hand\" not set in local storage, using and setting default value of []`);
        return [];
    }
}

/**
 * Helper function for setting the dealer hand
 * @param {Number[]} deck
 */
export function setDealerHand(deck) {
    localStorage.setItem("dealer_hand", deck.toString());
}

/**
 * Helper function for getting the player bank balance
 * - Note: Returns and sets default player bank balance (100) in local storage when not set
 * @returns {Number}
 */
export function getPlayerBank() {
    const player_bank = localStorage.getItem("player_bank");

    if (player_bank) {
        return Number.parseInt(player_bank);
    } else {
        const default_player_bank = 100;
        console.log(`\"player_bank\" not set in local storage, using and setting default value of ${default_player_bank}`);
        localStorage.setItem("player_bank", default_player_bank.toString());
        return default_player_bank;
    }
}

/**
 * Helper function for getting the player bank balance
 * @param {Number} balance
 */
export function setPlayerBank(balance) {
    localStorage.setItem("player_bank", balance.toString());
}

/**
 * Helper function for getting the player bet amount
 * - Note: Returns and sets default player bet amount (5) in local storage when not set
 * @returns {Number}
 */
export function getPlayerBet() {
    const player_bet = localStorage.getItem("player_bet");

    if (player_bet) {
        return Number.parseInt(player_bet);
    } else {
        const default_player_bet = 5;
        console.log(`\"player_bet\" not set in local storage, using and setting default value of ${default_player_bet}`);
        localStorage.setItem("player_bet", default_player_bet.toString());
        return default_player_bet;
    }
}

/**
 * Helper function for getting the player bet amount
 * @param {Number} amount
 */
export function setPlayerBet(amount) {
    localStorage.setItem("player_bet", amount.toString());
}

/**
 * Helper function for getting the current game status
 * - 0: Bet Input
 * - 1: Player Turn
 * - 2: Dealer Turn
 * - 3: Results/Play Again?
 * @returns {Number}
 */
export function getGameState() {
    const game_state = localStorage.getItem("game_state");

    if (game_state) {
        return Number.parseInt(game_state);
    } else {
        const default_game_state = 0;
        console.log(`\"game_state\" not set in local storage, using and setting default value of ${default_game_state}`);
        localStorage.setItem("game_state", default_game_state.toString());
        return default_game_state;
    }
}

/**
 * Helper function for setting the current game status
 * @param {Number} status
 */
export function setGameStatus(status) {
    localStorage.setItem("game_state", status.toString());
}