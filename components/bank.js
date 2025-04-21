import { constants } from "../index.js";

/**
 * Renders the initial top-left player bank amount.
 */
export function renderPlayerBank() {
    const container = document.getElementById("in-game-player-bank-container");
    const bank = document.getElementById("in-game-player-bank");
    if (!container || !bank) return;

    container.style.top = `${constants.padding}px`;
    container.style.left = `${constants.padding}px`;
}
