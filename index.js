// @ts-check

import { cardHeight, cardWidth } from "./card.js";
import { Game } from "./game.js";
import { hideModal, showModal } from "./start_game_modal.js";


/**
 * @constant
 * @type {number}
 */
export let viewWidth;
/**
 * @constant
 * @type {number}
 */
export let viewHeight;
/**
 * @constant
 * @type {number}
 */
export let cardVerticalPadding;


export let enteredBetAmount = 0;
export let playerAsset = 100;
/**
 * 
 * @param {number} delta 
 */
export const addToPlayerAsset = (delta) => {
  playerAsset += delta;
  const playerAmount = document.getElementById("in-game-display-player-amount");
  if (!playerAmount) return;
  playerAmount.innerHTML = `$${playerAsset}`;
}


let isFirstGame = true;

let init = () => {
  let app = document.getElementById("app");
  let startGameButton = document.getElementById("start-game");
  let playButton = document.getElementById("play-button");
  let hitButton = document.getElementById("hit");
  let standButton = document.getElementById("stand");
  if (!app || !startGameButton || !playButton || !hitButton || !standButton) return;

  viewWidth = app.clientWidth;
  viewHeight = app.clientHeight;
  cardVerticalPadding = viewHeight / 24;

  if (viewWidth < 4 * cardWidth || viewHeight < 2 * cardHeight) {
    alert("ur screen is too small! expect a bad experience");
  }

  const betAmount = /** @type {HTMLInputElement | null} */ (document.getElementById("bet-amount"));
  if (betAmount) {
    const update = () => {
      let value = betAmount.value.split("").filter((c) => ("0" <= c && c <= "9")).join("");
      value = value.replace(/^0+/, '');
      if (value.length == 0) value = "1";

      enteredBetAmount = parseInt(value);
      if (enteredBetAmount > playerAsset) {
        enteredBetAmount = playerAsset;
      }

      betAmount.value = enteredBetAmount.toString();
    };
    update();
    betAmount.onkeyup = update;
  }


  let game = new Game();

  startGameButton.onclick = () => {
    showModal();
  }

  playButton.onclick = async () => {
    addToPlayerAsset(-enteredBetAmount);

    hideModal();

    if (!isFirstGame) {
      await game.reset();
    }
    game.start();
    isFirstGame = false;
  };

  hitButton.onclick = () => game.playerHit();

  standButton.onclick = () => game.playerStand();
};

window.addEventListener('DOMContentLoaded', init);
