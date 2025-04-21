// @ts-check
import { getDealerHand, getDeck, getPlayerHand, setDealerHand, setDeck, setPlayerHand } from "./state.js";


/**
 * @typedef {number} Card
 */


/**
 * Creates a regular deck (0 - 51 unshuffled)
 * @returns {Card[]}
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
 * @returns {Card[]} Cards that were succesfully dealt
 */
export function dealCardsToPlayer(amount = 1) {
    const deck = getDeck();
    const hand = getPlayerHand();
    const dealt = [];

    for (let i = 0; i < amount; i++) {
        let card = deck.pop();

        if (card != null) {
            hand.push(card);
            dealt.push(card);
        } else {
            alert("wtf")
            break;
        }
    }

    setDeck(deck);
    setPlayerHand(hand);

    return dealt;
}


/**
 * Takes a card from the deck and deals it to the dealer hand
 * @param {Number} amount Number of cards to deal (default 1)
 * @returns {Card[]} Cards that were succesfully dealt
 */
export function dealCardsToDealer(amount = 1) {
    const deck = getDeck();
    const hand = getDealerHand();
    const dealt = [];

    for (let i = 0; i < amount; i++) {
        let card = deck.pop();

        if (card != null) {
            hand.push(card);
            dealt.push(card);
        } else {
            alert("wtf")
            break;
        }
    }

    setDeck(deck);
    setDealerHand(hand);

    return dealt;
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
 * @param {Card} card 
 * @returns {Number} The rank of the card. 1 Ace, 2-10 Numbers, 11 Jack, 12, Queen, 0 King
 */
export function getCardRank(card) {
    return card % 13;
}


/**
 * Get the suit of a card
 * @param {Card} card
 * @returns {Number} The suit of the card. 0 Spades, 1 Hearts, 2 Clubs, 3 Diamonds
 */
export function getCardSuit(card) {
    return Math.floor(card / 13);
}


/**
 * Get the value of a card
 * @param {Card} card
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
 * @param {Card} card
 * @returns {string} The "human readable" name of the card
 */
export function getCardName(card) {
    const ranks = ["King", "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen"];
    const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];

    const rank = getCardRank(card);
    const suit = getCardSuit(card);

    return `${ranks[rank]} of ${suits[suit]}`;
}


/**
 * Calculate the blackjack value of a hand
 * @param {Card[]} hand 
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
