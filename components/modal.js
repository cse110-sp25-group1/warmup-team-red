// @ts-check

import { play } from "../scripts/game.js";
import { DEFAULT_PLAYER_BANK, getPlayerBank, setPlayerBank } from "../scripts/state.js";


export function setupModal() {
    const playButton = document.getElementById("play-button");
    const playerBank = document.getElementById("start-game-modal-player-bank");
    const resetButton = document.getElementById("reset-button");
    if (!playButton || !playerBank || !resetButton) return;

    playerBank.innerHTML = getPlayerBank().toString();

    playButton.onclick = play;
    resetButton.onclick = () => {
        setPlayerBank(DEFAULT_PLAYER_BANK);
        playerBank.innerHTML = getPlayerBank().toString();
    }
}


export function showModal() {
    const modal = document.getElementById("start-game-modal-background");
    const playerBank = document.getElementById("start-game-modal-player-bank");
    if (!modal || !playerBank) return;

    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";

    playerBank.innerHTML = getPlayerBank().toString();
}


export function hideModal() {
    const modal = document.getElementById("start-game-modal-background");
    if (!modal) return;

    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";
}