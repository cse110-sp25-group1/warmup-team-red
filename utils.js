//helper function
export function calcHand(hand){
    let count = 0;
    let aceCount = 0;
    for (let i = 0; i < hand.length; i++){
         //if face card (J,Q,K) = 10
        if (hand[i] === "J"||hand[i] === "K"||hand[i] === "Q" ){
            count+=10;
        }else if(hand[i] === "A"){
            //if A-> =11
            count+=11;
            aceCount++;
        }else{
            //count ranks, read string as num
            count+=parseInt(hand[i]);
        }   
    }
    //there needs to be at least an ace for this to occur
    while(count>21 && aceCount > 0){
        //counting ace as 1 now
        count -=10;
        //decrease 
        aceCount--;
    }
    return count;
}

export function compare(playerHand, dealerHand){
    const playersTotal = calcHand(playerHand);
    const dealersTotal = calcHand(dealerHand);

    //

}

//blackjack is an immediate win (first two cards that were dealt)
export function isBlackJack(hand){
   return hand.length == 2 && (calcHand(hand)===21);
}

//sum is over 21
export function isBust(hand){
    return calcHand(hand) > 21;
}

