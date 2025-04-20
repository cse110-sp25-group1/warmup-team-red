// @ts-check
import { getDealerHand, getDeck, getPlayerHand, setDealerHand, setDeck, setPlayerHand } from "./state.js";

/**
 * Creates a regular deck (0 - 51 unshuffled)
 * @returns {Number[]}
 */
export function createDefaultDeck() {
    const deck = [];

    for (let i = 0; i < 52; i++) {
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

/**
 * Shuffles the deck
 */
export function shuffleDeck() {
    let deck = getDeck();

    for (let i = 0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * (deck.length));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setDeck(deck);
}

/**
 * Get the rank of a card
 * @param {Number} card 
 * @returns {Number} The rank of the card. 1 Ace, 2-10 Numbers, 11 Jack, 12, Queen, 0 King
 */
export function getCardRank(card) {
    return card % 13;
}

/**
 * Get the suit of a card
 * @param {Number} card
 * @returns {Number} The suit of the card. 0 Spades, 1 Hearts, 2 Clubs, 3 Diamonds
 */
export function getCardSuit(card) {
    return Math.floor(card / 13);
}

/**
 * Get the value of a card
 * @param {Number} card
 * @returns {Number} The value of the card in terms of blackjack. Treats aces as 11
 */
export function getCardValue(card) {
    const rank = getCardRank(card);

    if ([11, 12, 0].includes(rank)) {
        return 10;
    } else if (rank === 1) {
        return 11;
    } else if (rank >= 2 && rank <= 10) {
        return rank;
    } else {
        throw new Error(`Invalid rank: ${rank}`);
    }
}

/**
 * Get the name of a card
 * @param {Number} card
 * @returns {string} The "human readable" name of the card
 */
export function getCardName(card) {
    const ranks = ["King", "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen"];
    const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];

    const rank = getCardRank(card);
    const suit = getCardSuit(card);

    return `${ranks[rank]} of ${suits[suit]}`;
}