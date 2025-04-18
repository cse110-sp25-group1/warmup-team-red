// @ts-check

import { totalDeck } from "./card_data.js";
import { getCardHtml } from "./card.js";
import { shuffle } from "./utils.js";

const N = 8;

window.addEventListener('DOMContentLoaded', () => {
  let deck = [...totalDeck];
  shuffle(deck);

  let cards = document.getElementById("cards");
  let clickMeButton = document.getElementById("clickme");

  if (!cards || !clickMeButton) return;

  cards.innerHTML =
    deck.slice(0, N).map((card, i) => getCardHtml(card, i)).join("");

  clickMeButton.onclick = clickMeButtonOnClick;
});

async function clickMeButtonOnClick() {
  let x = Array.from(Array(N).keys());
  shuffle(x);

  for (let i = 0; i < N; i++) {
    let card = document.getElementById(`card-${i}`);
    let inner = document.getElementById(`inner-${i}`);
    if (!card || !inner) continue;

    card.style.top = `0px`;
    card.style.transform = `translate(360px, 0px)`;

    inner.classList.add("flip-card-inner-flipped");
  }

  await new Promise((r) => setTimeout(r, 1000));

  for (let i = 0; i < N; i++) {
    let card = document.getElementById(`card-${i}`);
    let inner = document.getElementById(`inner-${i}`);
    if (!card || !inner) continue;

    card.style.zIndex = x[i].toString();
    card.style.top = `${x[i] * 24}px`;
    card.style.transform = `translate(0px, 0px)`;

    inner.classList.remove("flip-card-inner-flipped");
  }
}

