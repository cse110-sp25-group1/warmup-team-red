// @ts-check

import { constants } from "./index.js";
import { getPileLocation } from "./positions.js";

/**
 * Render the HTML of the phantom deck.
 * @param {number} initialTop
 * @param {number} initialLeft
 * @returns {string}
 */
function getPhantomDeckHtml(initialTop, initialLeft) {
  return `
      <div
        id="phantom-deck"
        class="flip-card-back"
        style="
          transform: rotateY(0deg); transition: opacity 0.75s ease-in-out;
          position: absolute; top: ${initialTop}px; left: ${initialLeft}px;
          width: ${constants.cardWidth}px; height: ${constants.cardHeight}px;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          transition: opacity 1s; 
        "
      >
        <img src="https://i.imgur.com/NvVlPXm.png" alt="Team logo" style="width: 180px;" />
        <p>Black Jack<br/>by the Aces</p>
      </div>
    `;
}


/**
 * Draw the initial phantom deck for the card pile.
 */
export function renderPhantomDeck() {
  const [top, left] = getPileLocation();
  const app = document.getElementById("app");
  if (!app) return;

  let phantomDeck = document.createElement("div");
  phantomDeck.setHTMLUnsafe(getPhantomDeckHtml(top, left))
  app.appendChild(phantomDeck);
}

/**
 * Hide the phantom deck.
 */
export function hidePhantomDeck() {
  const phantomDeck = document.getElementById("phantom-deck");
  if (!phantomDeck) return;

  phantomDeck.style.opacity = "0";
}

/**
 * Show the phantom deck.
 */
export function showPhantomDeck() {
  const phantomDeck = document.getElementById("phantom-deck");
  if (!phantomDeck) return;

  phantomDeck.style.opacity = "1";
}
