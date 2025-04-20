// @ts-check

import { Constants } from "./constants.js";
import { renderPhantomDeck } from "./deck.js";
import { AppState } from "./app_state.js";
import { getPlayerBank, resetGameState } from "./scripts/state.js";
import { setupModal } from "./modal.js";
import { setupActionButtons } from "./action_buttons.js";

/**
 * @type {Constants}
 */
export let constants;
/**
 * @type {AppState}
 */
export let state;

window.addEventListener('DOMContentLoaded', () => {
  let app = document.getElementById("app");
  if (!app) return;

  constants = new Constants(app.clientWidth, app.clientHeight);
  setupModal();
  setupActionButtons();

  renderPhantomDeck();

  resetGameState();

  if (getPlayerBank() < 1) {
    // Display: You ran out of money. You lose!
    alert("you lose!");
  }
});
