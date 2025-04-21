// @ts-check

import { showActionButtons } from "./action_buttons.js";
import { renderCard } from "./card.js";
import { showDealerHandValue, showPlayerHandValue } from "./hand_value.js";
import { getDealerCardLocation, getPlayerCardLocation } from "./positions.js";
import { dealCardsToDealer, dealCardsToPlayer, shuffleDeck } from "./scripts/cards.js";
import { getDealerHand, getPlayerBank, getPlayerHand, setPlayerBank, setPlayerBet } from "./scripts/state.js";
import { sleep } from "./scripts/util.js";

export function setupModal() {
    const playButton = document.getElementById("play-button");
    const betAmount = /** @type {HTMLInputElement | null} */ (document.getElementById("bet-amount"));
    if (!playButton || !betAmount) return;

    playButton.onclick = async () => {
        console.log("play");
        const bet = parseInt(betAmount.value);
        setPlayerBank(getPlayerBank() - Number.parseInt(betAmount.value));

        hideModal();
        shuffleDeck();

        dealCardsToDealer(2);
        dealCardsToPlayer(2);
        const dealer = getDealerHand();
        const player = getPlayerHand();

        for (let i = 0; i < dealer.length; i++) {
            renderCard(dealer[i], ...getDealerCardLocation(i, dealer.length), i != 0);
            await sleep(750);
        }

        showDealerHandValue(true);

        for (let i = 0; i < player.length; i++) {
            renderCard(player[i], ...getPlayerCardLocation(i, player.length));
            await sleep(750);
        }

        showPlayerHandValue(true);

        // TODO: check if dealer is blackjack or lost
        // TODO: check if player is blackjack or lost

        showActionButtons();
    };

    const update = () => {
        let value = betAmount.value.split("").filter((c) => ("0" <= c && c <= "9")).join("");
        value = value.replace(/^0+/, '');
        if (value.length == 0) value = "1";

        let bet = parseInt(value);
        const bank = getPlayerBank();
        if (bet > bank) {
            bet = bank;
        }
        setPlayerBet(bet);
    };
    update();
    betAmount.onkeyup = update;
}


function showModal() {
    const modal = document.getElementById("start-game-modal-background");
    if (!modal) return;

    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";
}

function hideModal() {
    alert("hiding")
    const modal = document.getElementById("start-game-modal-background");
    if (!modal) return;

    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";
}