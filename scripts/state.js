// @ts-check
import { createDefaultDeck } from "./cards.js";


/**
 * Sets up game
 * - Creates a regular deck (1 - 52 unshuffled)
 * - Creates player hand (empty)
 * - Creates dealer hand (empty)
 * - Creates player bank (0) 
 */
export function resetState() {
    localStorage.clear();

    const deck = createDefaultDeck();

    localStorage.setItem("deck", deck.toString());
    localStorage.setItem("player_hand", [].toString());
    localStorage.setItem("dealer_hand", [].toString());
    localStorage.setItem("player_bank", 100..toString());
}


/**
 * Sets up *new* game (reset cards, but not money)
 * - Creates a regular deck (1 - 52 unshuffled)
 * - Creates player hand (empty)
 * - Creates dealer hand (empty)
 */
export function resetGameState() {
    const deck = createDefaultDeck();

    localStorage.setItem("deck", deck.toString());
    localStorage.setItem("player_hand", [].toString());
    localStorage.setItem("dealer_hand", [].toString());
}

/**
 * Helper function for getting the game deck.
 * - Note: Returns and sets default deck (1 - 52 unshuffled) in local storage when not set
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
 * - Note: Returns and sets default player hand (empty) in local storage when not set
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
 * - Note: Returns and sets default dealer hand (empty) in local storage when not set
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