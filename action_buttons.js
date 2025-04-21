// @ts-check

import { moveCard, renderCard } from "./card.js";
import { showDealerHandValue, showPlayerHandValue } from "./hand_value.js";
import { getDealerCardLocation, getPlayerCardLocation } from "./positions.js";
import { dealCardsToDealer, dealCardsToPlayer } from "./scripts/cards.js";
import { getHandValue } from "./scripts/game.js";
import { getDealerHand, getPlayerHand } from "./scripts/state.js";
import { sleep } from "./utils.js";


export function setupActionButtons() {
    let hitButton = document.getElementById("hit");
    let standButton = document.getElementById("stand");
    if (!hitButton || !standButton) return;

    hitButton.onclick = () => {
        dealCardsToPlayer();
        let cards = getPlayerHand();
        let lastCard = cards[cards.length - 1];

        cards.slice(0, cards.length - 1).forEach((card, i) =>
            moveCard(card, ...getPlayerCardLocation(i, cards.length)));
        renderCard(lastCard, ...getPlayerCardLocation(cards.length - 1, cards.length));

        showPlayerHandValue();

        const handValue = getHandValue(getPlayerHand());
        if (handValue == 21) {
            alert('win!');
        } else if (handValue > 21) {
            alert("lose!")
        }
    };

    standButton.onclick = async () => {
        while (getHandValue(getDealerHand()) <= 16) {
            dealCardsToDealer();
            let cards = getDealerHand();
            let lastCard = cards[cards.length - 1];

            cards.slice(0, cards.length - 1).forEach((card, i) =>
                moveCard(card, ...getDealerCardLocation(i, cards.length)));
            renderCard(lastCard, ...getDealerCardLocation(cards.length - 1, cards.length));

            showDealerHandValue();

            await sleep(750);
        }

        const handValue = getHandValue(getDealerHand());
        if (handValue == 21) {
            alert('you lost!');
        } else if (handValue > 21) {
            alert("you won!")
        }
    };
}

export function showActionButtons() {
    let playingOptions = document.getElementById("playing-options");
    if (!playingOptions) return;

    playingOptions.style.opacity = "1";
    playingOptions.style.pointerEvents = "auto";
}
