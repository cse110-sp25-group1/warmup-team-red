// @ts-check

/**
 * Sets up game
 * - Creates a regular deck (1 - 52 unshuffled)
 * - Creates player hand (empty)
 * - Creates dealer hand (empty)
 * - Creates player bank (0) 
 */
function resetState() {
    localStorage.clear();

    const deck = [];

    for (let i = 1; i <= 52; i++) {
        deck.push(i);
    }

    localStorage.setItem("deck", deck.toString());
    localStorage.setItem("player_hand", [].toString());
    localStorage.setItem("dealer_hand", [].toString());
    localStorage.setItem("player_bank", 0..toString());
}

/**
 * Helper function for getting the game deck.
 * - Note: Returns and sets default deck (1 - 52 unshuffled) in local storage when not set
 * @returns {Number[]}
 */
function getDeck() {
    const deck = localStorage.getItem("deck");

    if (deck) {
        return deck.split(",").map(c => Number.parseInt(c));
    } else {
        let default_deck = []

        for (let i = 1; i <= 52; i++) {
            default_deck.push(i);
        }

        localStorage.setItem("deck", default_deck.toString());
        return default_deck;
    }
}

/**
 * Helper function for setting the game deck
 * @param {Number[]} deck
 */
function setDeck(deck) {
    localStorage.setItem("deck", deck.toString());
}

/**
 * Helper function for getting the player hand
 * - Note: Returns and sets default player hand (empty) in local storage when not set
 * @returns {Number[]}
 */
function getPlayerHand() {
    const player_hand = localStorage.getItem("player_hand");

    if (player_hand) {
        return player_hand.split(",").map(c => Number.parseInt(c));
    } else {
        const default_player_hand = [];
        
        localStorage.setItem("player_hand", default_player_hand.toString());
        return default_player_hand;
    }
}

/**
 * Helper function for setting the player hand
 * @param {Number[]} deck
 */
function setPlayerHand(deck) {
    localStorage.setItem("player_hand", deck.toString());
}

/**
 * Helper function for getting the dealer hand
 * - Note: Returns and sets default dealer hand (empty) in local storage when not set
 * @returns {Number[]}
 */
function getDealerHand() {
    const dealer_hand = localStorage.getItem("dealer_hand");

    if (dealer_hand) {
        return dealer_hand.split(",").map(c => Number.parseInt(c));
    } else {
        const default_dealer_hand = [];
        
        localStorage.setItem("dealer_hand", default_dealer_hand.toString());
        return default_dealer_hand;
    }
}

/**
 * Helper function for setting the dealer hand
 * @param {Number[]} deck
 */
function setDealerHand(deck) {
    localStorage.setItem("dealer_hand", deck.toString());
}

/**
 * Helper function for getting the player bank balance
 * - Note: Returns and sets default player bank balance (100) in local storage when not set
 * @returns {Number}
 */
function getPlayerBank() {
    const player_bank = localStorage.getItem("player_bank");

    if (player_bank) {
        return Number.parseInt(player_bank);
    } else {
        const default_player_bank = 100;

        localStorage.setItem("player_bank", default_player_bank.toString());
        return default_player_bank;
    }
}

/**
 * Helper function for getting the player bank balance
 * @param {Number} balance
 */
function setPlayerBank(balance) {
    localStorage.setItem("player_bank", balance.toString());
}

resetState();