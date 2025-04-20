// @ts-check
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
 * @returns {Number} Number of cards that were succesfully dealt
 */
export function dealCardsToPlayer(amount = 1) {
    const deck = getDeck();
    const hand = getPlayerHand();
    let dealt_amount = 0;

    for (let i = 0; i < amount; i++) {
        let card = deck.pop();

        if (card) {
            hand.push(card);
            dealt_amount += 1;
        } else {
            break;
        }
    }

    setDeck(deck);
    setPlayerHand(hand);

    return dealt_amount;
}

/**
 * Takes a card from the deck and deals it to the dealer hand
 * @param {Number} amount Number of cards to deal (default 1)
 * @returns {Number} Number of cards that were succesfully dealt
 */
export function dealCardsToDealer(amount = 1) {
    const deck = getDeck();
    const hand = getDealerHand();
    let dealt_amount = 0;

    for (let i = 0; i < amount; i++) {
        let card = deck.pop();

        if (card) {
            hand.push(card);
            dealt_amount += 1;
        } else {
            break;
        }
    }

    setDeck(deck);
    setDealerHand(hand);

    return dealt_amount;
}