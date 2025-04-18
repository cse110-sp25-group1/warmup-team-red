// @ts-check

import { getCardImageUrl } from "./card_data.js";

/**
 * @import {Card} from "./card_data"
 */

/**
 * 
 * @param {Card} card 
 * @param {number} i 
 * @returns {string}
 */
export function getCardHtml(card, i) {
  return `
      <div class="flip-card" style="position: absolute; top: ${8 * i}px; left: 0px;" id="card-${i}">
        <div class="flip-card-inner" id="inner-${i}" style="width: 240px;">
          <div class="flip-card-front">
            <img src="${getCardImageUrl(card)}" alt="Avatar" style="width: 240px; height: 360px;" />
          </div>
          <div
            class="flip-card-back"
            style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
          >
            <img src="https://i.imgur.com/NvVlPXm.png" alt="Team logo" style="width: 180px;" />
            <p>Black Jack<br/>by the Aces</p>
          </div>
        </div>
      </div>
      `;
}
