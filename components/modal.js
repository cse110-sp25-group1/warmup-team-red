// @ts-check

import { showActionButtons } from "./action_buttons.js";
import { renderCard } from "./card.js";
import { showDealerHandValue, showPlayerHandValue } from "./hand_value.js";
import { getDealerCardLocation, getPlayerCardLocation } from "./positions.js";
import { dealCardsToDealer, dealCardsToPlayer, shuffleDeck } from "../scripts/cards.js";
import { checkGameEnded, endGame } from "../scripts/game.js";
import { getDealerHand, getPlayerBank, getPlayerHand, setPlayerBank } from "../scripts/state.js";
import { sleep } from "../scripts/util.js";

export function setupModal() {
    const playButton = document.getElementById("play-button");
    const playerBank = document.getElementById("start-game-modal-player-bank");
    const betAmountElem = /** @type {HTMLInputElement | null} */ (document.getElementById("bet-amount"));
    if (!playButton || !playerBank || !betAmountElem) return;

    playerBank.innerHTML = getPlayerBank().toString();

    playButton.onclick = async () => {
        let betValue = parseInt(betAmountElem.value);
        if (Number.isNaN(betValue) || betValue <= 0 || betValue > getPlayerBank()) {
            betAmountElem.classList.add("input-error");
            return;
        }
        betAmountElem.classList.remove("input-error");

        const betAmount = parseInt(betAmountElem.value);
        setPlayerBank(getPlayerBank() - betAmount);

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

        showDealerHandValue(false, true);

        {
            let ended = checkGameEnded();
            if (ended != null) { endGame(ended); return; }
        }

        for (let i = 0; i < player.length; i++) {
            renderCard(player[i], ...getPlayerCardLocation(i, player.length));
            await sleep(750);
        }

        showPlayerHandValue(true);

        {
            let ended = checkGameEnded();
            if (ended != null) { endGame(ended); return; }
        }

        showActionButtons();
    };
}


export function showModal() {
    const modal = document.getElementById("start-game-modal-background");
    const playerBank = document.getElementById("start-game-modal-player-bank");
    if (!modal || !playerBank) return;

    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";

    playerBank.innerHTML = getPlayerBank().toString();
}

export function hideModal() {
    const modal = document.getElementById("start-game-modal-background");
    if (!modal) return;

    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";
}