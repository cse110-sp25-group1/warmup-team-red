// @ts-check

import { playerAsset } from "./index.js";

export function showModal() {
    const modalContainer = document.getElementById("start-game-modal-background");
    const playerAmount = document.getElementById("start-game-modal-player-amount");
    if (!modalContainer || !playerAmount) return;

    playerAmount.innerHTML = `$${playerAsset}`;
    modalContainer.style.pointerEvents = "auto";
    modalContainer.style.opacity = "1";
}

export function hideModal() {
    let modalContainer = document.getElementById("start-game-modal-background");
    if (!modalContainer) return;

    modalContainer.style.pointerEvents = "none";
    modalContainer.style.opacity = "0";
}
