//creating deck, suit and val

/*representing : 0-51 
 Number % mod 13 => rank
*/

const ranks = ["A", "2","3","4","5", "6", "7","8", "9","10","J","Q","K"];
const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];

//creating blank deck 
export function createDeck(){
    const deck = [];
    for (let i = 0; i < 52; i++){
        const rank = ranks[i % 13];
        //each suit has 13 cards
        const suit = suits[Math.floor(i/13)];
        deck.push({rank,suit});
    }
    return deck;
}
