// @ts-check

import { getCardId, getCardImageUrl } from "./card_data.js";
import { drawPileLocation } from "./positions.js";
import { numberToPixel } from "./utils.js";

/**
 * @import {Card} from "./card_data"
 */

export const cardWidth = 160;
export const cardHeight = cardWidth / 240 * 360;
export const gap = -cardWidth / 4 * 3;
export const sumSize = 48;

/**
 * Get the HTML of a card.
 * 
 * @param {Card} card
 * @param {number} initialTop
 * @param {number} initialLeft
 * @returns {string}
 */
export function getCardHtml(card, initialTop, initialLeft) {
  const cardId = getCardId(card);
  return `
      <div class="flip-card" style="top: ${initialTop}px; left: ${initialLeft}px; width: ${numberToPixel(cardWidth)}; height: ${numberToPixel(cardHeight)}" id="card-${cardId}">
        <div class="flip-card-inner flip-card-inner-flipped" id="inner-${cardId}">
          <div class="flip-card-front">
            <img
              src="${getCardImageUrl(card)}"
              alt="Card"
              style="width: ${numberToPixel(cardWidth)}; height: ${numberToPixel(cardHeight)}" 
            />
          </div>
          <div
            class="flip-card-back"
            style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: ${numberToPixel(cardWidth)}; height: ${numberToPixel(cardHeight)}; border-radius: ${numberToPixel(29.944447 / 359 * cardWidth)}"
          >
            <img src="https://i.imgur.com/NvVlPXm.png" alt="Team logo" style="width: ${numberToPixel(cardWidth * 0.75)}" />
            <p>Black Jack<br/>by the Aces</p>
          </div>
        </div>
      </div>
      `;
}

/**
 * Moves a card to a location.
 * If it doesn't exist, it will be created at the pile location and then moved.
 * 
 * @param {Card} cardData 
 * @param {number} top 
 * @param {number} left 
 * @param {boolean} flip 
 */
export function moveCard(cardData, top, left, flip = false) {
  let cardId = `card-${getCardId(cardData)}`;
  let innerId = `inner-${getCardId(cardData)}`;
  let card = document.getElementById(cardId);

  if (card === null) {
    const app = document.getElementById("app");
    if (!app) return;
    const [initialTop, initialLeft] = drawPileLocation();

    let div = document.createElement("div");
    div.setHTMLUnsafe(getCardHtml(cardData, initialTop, initialLeft));
    app.appendChild(div);

    let card = document.getElementById(cardId);
    let inner = document.getElementById(innerId);

    // original transform applied
    requestAnimationFrame(() => {
      // so now in the next frame we can change it
      requestAnimationFrame(() => {
        if (!card) return;
        if (!inner) return;
        card.style.top = numberToPixel(top);
        card.style.left = numberToPixel(left);
        card.style.transform = `rotateZ(${Math.random() * 10 - 5}deg)`;
        if (flip) inner.classList.toggle("flip-card-inner-flipped");
      });
    });
  } else {
    let inner = document.getElementById(innerId);
    if (!inner) return;

    card.style.top = numberToPixel(top);
    card.style.left = numberToPixel(left);
    card.style.transform = `rotateZ(${Math.random() * 10 - 5}deg)`;
    if (flip) inner.classList.toggle("flip-card-inner-flipped");
  }
}

