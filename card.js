// @ts-check

import { constants } from "./index.js";
import { getPileLocation } from "./positions.js";

/**
 * @import {Card} from "./scripts/cards"
 */

/**
 * @param {Card} card
 * @param {number} initialTop
 * @param {number} initialLeft
 * @returns {string}
 */
function getCardHtml(card, initialTop, initialLeft) {
  return `
    <div
      id="card-${card}"
      class="flip-card"
      style="top: ${initialTop}px; left: ${initialLeft}px; width: ${constants.cardWidth}px; height: ${constants.cardHeight}px"
    >
      <div class="flip-card-inner flip-card-inner-flipped" id="inner-${card}">
        <div class="flip-card-front">
          <img
            src="assets/cards/${card}.svg"
            alt="Card"
            style="width: ${constants.cardWidth}px; height: ${constants.cardHeight}px"
          />
        </div>
        <div
          class="flip-card-back"
          style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: ${constants.cardWidth}px; height: ${constants.cardHeight}px; border-radius: ${29.944447 / 360 * constants.cardWidth}px"
        >
          <img src="https://i.imgur.com/NvVlPXm.png" alt="Team logo" style="width: ${constants.cardWidth * 0.75}px" />
          <p>Black Jack<br/>by the Aces</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render a card initially, complete with animations.
 *
 * @param {Card} card
 * @param {number} top
 * @param {number} left
 * @param {boolean} [flip=true] (Default: `true`) If selected, the card will be flipped and revealed.
 * @param {boolean} [rotate=true] (Default: `true`) If selected, the card will have a random rotation animation.
 */
export function renderCard(card, top, left, flip = true, rotate = true) {
  const app = document.getElementById("app");
  if (!app) return;

  let cardId = `card-${card}`;
  let innerId = `inner-${card}`;

  if (document.getElementById(cardId) != null) return;

  const [initialTop, initialLeft] = getPileLocation();

  let div = document.createElement("div");
  div.setHTMLUnsafe(getCardHtml(card, initialTop, initialLeft));
  app.appendChild(div);

  let cardElem = document.getElementById(cardId);
  let innerElem = document.getElementById(innerId);

  // original transform applied
  requestAnimationFrame(() => {
    // so now in the next frame we can change it
    requestAnimationFrame(() => {
      if (!cardElem) return;
      if (!innerElem) return;
      cardElem.style.top = `${top}px`;
      cardElem.style.left = `${left}px`;
      if (rotate) cardElem.style.transform = `rotateZ(${Math.random() * 10 - 5}deg)`;
      if (flip) innerElem.classList.toggle("flip-card-inner-flipped");
    });
  });
}

/**
 *
 * @param {Card} card
 * @param {number} top
 * @param {number} left
 * @param {boolean} rotate (Default: `true`) If selected, the card will be flipped and revealed.
 */
export function moveCard(card, top, left, rotate = true) {
  let cardId = `card-${card}`;
  let cardElem = document.getElementById(cardId);
  if (cardElem == null) return;

  cardElem.style.top = `${top}px`;
  cardElem.style.left = `${left}px`;
  if (rotate) cardElem.style.transform = `rotateZ(${Math.random() * 10 - 5}deg)`;
}

/**
 * 
 * @param {Card} card
 */
export function flipCard(card) {
  let innerId = `inner-${card}`;
  let inner = document.getElementById(innerId);
  if (!inner) return;

  inner.classList.toggle("flip-card-inner-flipped");
}