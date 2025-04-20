import { resetState, getDeck, setDeck, getPlayerHand, setPlayerHand, getDealerHand, setDealerHand, getPlayerBank, setPlayerBank } from "./state.js";
import { dealCardToPlayer } from "./cards.js";

resetState();

dealCardToPlayer(2);

console.log(getDeck());
console.log(getPlayerHand());

dealCardToPlayer(2);

console.log(getDeck());
console.log(getPlayerHand());

