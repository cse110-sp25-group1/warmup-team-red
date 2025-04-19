//funtions that help handle game progress

export function reset(){
    playerHand.length = 0;
    dealerHand.length = 0;
    currentBet = 0;
    playerBank = 1000;

    return { playerHand, dealerHand, currentBet, playerBank };
}
export function setBet(playerBank, currBet, betAmt){
    //set valid bet
    if (betAmt <= playerBank && betAmt > 0){
        currBet = betAmt;
    }
    return currBet;
}
export function doubleBet(playerBank, currBet){
    //check if can afford to double
    if (playerBank >= currBet * 2){
        currBet*=2;
    }
    return {currBet, playerBank};
}

export function updateBank(playerBank, currBet, result){
    if (result === "player won"){
        playerBank+=currBet;
    }else if(result === "player lost"){
        playerBank -=currBet;
    }else if (result==="push"){
        playerBank = playerBank;
    }
    return playerBank;
}


export function dealersTurn(deck, playerHand, dealerHand){
//check dealer total, is it blackjack or no
    if (isBlackJack(dealerHand)){
        return false;
    }
    //dealer hits until dealertotal reaches 17 or 18 idk 
    //important use of let here
    let dealersTotal = calcHand(dealerHand);
    while(dealersTotal < 17){
        dealCard(deck, dealerHand, 1);
        dealersTotal = calcHand(dealerHand)
    }
    return dealerHand;
}

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
