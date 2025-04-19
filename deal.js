
//add count amount of cards to player's hand

//dealCards(deck, playerHand, 2); // for starting hand
export function dealCards(deck, hand, count){
    for (i = 0; i < count; i++){
        //first card in deck list gets appended to hand
        hand.push(deck.pop());
    }
    return hand;
}
