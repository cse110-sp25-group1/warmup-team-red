import { getDealerHand, getDeck, getPlayerHand, setDealerHand, setDeck, setPlayerHand } from "./state.js";

/**
 * Creates a regular deck (1 - 52 unshuffled)
 * @returns {Number[]}
 */
export function createDefaultDeck() {
    const deck = [];

    for (let i = 1; i <= 52; i++) {
        deck.push(i);
    }

    return deck;
}

/**
 * Takes a card from the deck and deals it to the player hand
 * @param {Number} amount Number of cards to deal (default 1)
 */
export function dealCardToPlayer(amount = 1) {
    const deck = getDeck();
    const hand = getPlayerHand();

    for (let i = 0; i < amount; i++) {
        hand.push(deck.pop());
    }

    setDeck(deck);
    setPlayerHand(hand);
}

/**
 * Takes a card from the deck and deals it to the dealer hand
 * @param {Number} amount Number of cards to deal (default 1)
 */
export function dealCardToDealer(amount = 1) {
    const deck = getDeck();
    const hand = getDealerHand();

    for (let i = 0; i < amount; i++) {
        hand.push(deck.pop());
    }

    setDeck(deck);
    setDealerHand(hand);
}

//randomly sort cards

export function shuffleDeck(deck){
    for (let i=0; i < deck.length; i++){
        const shuffle = Math.floor(Math.random()*(deck.length));
        [deck[i],deck[shuffle]] = [deck[shuffle],deck[i]];
    }
    return deck;
}