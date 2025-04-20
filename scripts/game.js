// @ts-check

import { getCardRank, getCardValue } from "./cards.js";

/**
 * Calculate the blackjack value of a hand
 * @param {Number[]} hand 
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

    // For each ace that keeps up above 21, treat as a 1 instead of 11
    while (count > 21 && ace_count > 0) {
        count -= 10;
        ace_count -= 1;
    }

    return count;
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
