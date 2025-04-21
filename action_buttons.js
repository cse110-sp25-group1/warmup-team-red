// @ts-check

import { moveCard, renderCard } from "./card.js";
import { showDealerHandValue, showPlayerHandValue } from "./hand_value.js";
import { getDealerCardLocation, getPlayerCardLocation } from "./positions.js";
import { dealCardsToDealer, dealCardsToPlayer } from "./scripts/cards.js";
import { actionPlayerHit, actionPlayerStand, getHandValue } from "./scripts/game.js";
import { getDealerHand, getPlayerHand } from "./scripts/state.js";
import { sleep } from "./scripts/util.js";


export function setupActionButtons() {
    let hitButton = document.getElementById("hit");
    let standButton = document.getElementById("stand");
    if (!hitButton || !standButton) return;

    hitButton.onclick = actionPlayerHit;
    standButton.onclick = actionPlayerStand;
}

export function showActionButtons() {
    let playingOptions = document.getElementById("playing-options");
    if (!playingOptions) return;

    playingOptions.style.opacity = "1";
    playingOptions.style.pointerEvents = "auto";
}
