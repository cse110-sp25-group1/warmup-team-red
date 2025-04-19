//player skips/stands --> dealer's turn
import { dealCard } from "./deal.js";
import { isBlackJack, isBust, calcHand, didPlayerWin } from "./utils.js";

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



