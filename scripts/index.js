import { resetState, getDeck, setDeck, getPlayerHand, setPlayerHand, getDealerHand, setDealerHand, getPlayerBank, setPlayerBank } from "./state.js";

resetState();

console.log(getDeck());

setDeck([0,1,2,3,4,5]);

console.log(getDeck());

localStorage.clear();

console.log(getDeck());
