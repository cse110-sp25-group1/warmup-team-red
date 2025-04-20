// @ts-check

import { totalDeck } from "./card_data.js";
import { shuffle } from "./utils.js";
import { Constants } from "./constants.js";
import { renderPhantomDeck } from "./deck.js";
import { AppState } from "./app_state.js";

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

  let deck = [...totalDeck];
  shuffle(deck);

  state = new AppState(constants, deck);

  setupButtons();
});

function setupButtons() {
  let drawCardButton = document.getElementById("draw-card-button");
  if (!drawCardButton) return;

  drawCardButton.onclick = () => { state.drawCard() };
}