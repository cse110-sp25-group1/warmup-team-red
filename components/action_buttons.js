// @ts-check

import { actionPlayerHit, actionPlayerStand } from "../scripts/game.js";


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
