

//creating deck, suit and val

/*representing : 0-51 
 Number % mod 13 => rank
*/

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



//add count amount of cards to player's hand

//dealCards(deck, playerHand, 2); // for starting hand
export function dealCard(deck, hand, count){
    for (let i = 0; i < count; i++){
        //first card in deck list gets appended to hand
        hand.push(deck.pop());
    }
    return hand;
}


//randomly sort cards

export function shuffleDeck(deck){
    for (let i=0; i < deck.length; i++){
        const shuffle = Math.floor(Math.random()*(deck.length));
        [deck[i],deck[shuffle]] = [deck[shuffle],deck[i]];
    }
    return deck;
}