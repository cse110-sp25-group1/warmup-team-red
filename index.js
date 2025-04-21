// @ts-check

import { Constants } from "./components/constants.js";
import { renderPhantomDeck } from "./components/deck/deck.js";
import { getPlayerBank, resetGameState } from "./scripts/state.js";
import { setupModal } from "./components/modal/modal.js";
import { setupActionButtons } from "./components/action_buttons/action_buttons.js";
import { renderPlayerBank } from "./components/bank/bank.js";

/**
 * @type {Constants}
 */
export let constants;


window.addEventListener('DOMContentLoaded', () => {
  let app = document.getElementById("app");
  if (!app) return;

  constants = new Constants(app.clientWidth, app.clientHeight);
  setupModal();
  setupActionButtons();

  renderPhantomDeck();
  renderPlayerBank();

  resetGameState();
});
