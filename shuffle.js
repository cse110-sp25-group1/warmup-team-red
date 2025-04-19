
//randomly sort cards


export function shuffleDeck(deck){
    for (let i=0; i < deck.length; i++){
        const shuffle = Math.floor(Math.random()*(deck.length));
        [deck[i],deck[shuffle]] = [deck[shuffle],deck[i]];
    }
    return deck;
}