//helper function
export function calcHand(hand){
    let count = 0;
    let aceCount = 0;
    for (let i = 0; i < hand.length; i++){
        const rank = hand[i].rank;
         //if face card (J,Q,K) = 10
        if (rank === "J"||rank === "K"||rank === "Q" ){
            count+=10;
        }else if(rank === "A"){
            //if A-> =11
            count+=11;
            aceCount++;
        }else{
            //count ranks, read string as num
            count+=parseInt(rank);
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

//blackjack is an immediate win (first two cards that were dealt)
//returns true if received blackjack
export function isBlackJack(hand){
   return hand.length === 2 && (calcHand(hand)===21);
}

//returns true if sum is over 21
export function isBust(total){
    return total > 21;
}

//returns game outcome in string
export function gameOutcome(playerHand, dealerHand){
    const playersTotal = calcHand(playerHand);
    const dealersTotal = calcHand(dealerHand);

    let result = "";
    if (isBust(playersTotal)){
        result = "player lost";
    }else if (isBust(dealersTotal)){
        result = "player won";
    }else if (playersTotal === dealersTotal) {
        result = "push"; // or 'push', depending on how you handle a tie
    }else{
        if (playersTotal > dealersTotal) {
            result = "player won";
        } else {
            result = "player lost";
        }
    }
    return result;
}
