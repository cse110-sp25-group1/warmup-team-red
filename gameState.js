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
