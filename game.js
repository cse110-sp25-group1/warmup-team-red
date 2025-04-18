// @ts-check

import { moveCard } from "./card.js";
import { getCardId } from "./card_data.js";
import { drawPhantomCard, hidePhantomCard } from "./components/phantom_card.js";
import { Deck } from "./deck.js";
import { addToPlayerAsset, enteredBetAmount } from "./index.js";
import { drawDealerLocation, drawPlayerLocation } from "./positions.js";
import { showModal } from "./start_game_modal.js";
import { getHandValue, hideDealerSum, hidePlayerSum, resetDealerSum, resetPlayerSum, showDealerSum, showPlayerSum } from "./sum.js";
import { sleep } from "./utils.js";

/**
 * @import {Card} from "./card_data"
 */

/**
 * The animation duration per card.
 * 
 * @constant
 * @type {number}
 */
export const CARD_ANIMATION_DURATION = 750;

export class Game {
    /**
     * Creates a new instance of the game.
     */
    constructor() {
        /**
         * @type {Deck}
         */
        this.deck = new Deck();
        // /**
        //  * @type {Card[]}
        //  */
        // this.visibleCards = [];
        /**
         * @type {Card[]}
         */
        this.player = [];
        /**
         * @type {Card[]}
         */
        this.ai = [];
        /**
         * @type {"won" | "lost" | "draw" | "in_progress"}
         */
        this.status = "in_progress";

    }

    /**
     * Resets the game UI and state.
     * 
     * Delay: CARD_ANIMATION_DELAY
     */
    async reset() {
        [...this.ai, ...this.player].forEach((card) => {
            let cardElem = document.getElementById(`card-${getCardId(card)}`);
            if (!cardElem) return;

            cardElem.style.opacity = "0";
        });
        hidePlayerSum();
        hideDealerSum();
        hidePhantomCard();

        let playingOptions = document.getElementById("playing-options");
        if (!playingOptions) return;
        playingOptions.style.pointerEvents = "none";
        playingOptions.style.opacity = "0";

        await sleep(CARD_ANIMATION_DURATION);

        const app = document.getElementById("app");
        if (!app) return;
        app.innerHTML = "";
        resetPlayerSum();
        resetDealerSum();

        this.deck = new Deck();
        this.player = [];
        this.ai = [];
        this.status_ = "in_progress";
    }

    /**
     * 
     * @param {"won" | "lost" | "draw" | "in_progress"} status 
     */
    set status(status) {
        this.status_ = status;

        (async () => {
            if (status == "won") {
                alert("won!");
                addToPlayerAsset(2 * enteredBetAmount);
            } else if (status == "draw") {
                alert("draw!");
                addToPlayerAsset(enteredBetAmount);
            } else if (status == "lost") {
                alert("lost!");
            } else { return; }

            await this.revealDealer();
            await sleep(1000);

            showModal();
            // this.reset();
        })();
    }

    /**
     * Deal 2 initial cards to the dealer/AI.
     * The first card is hidden; the second is visible.
     * 
     * Delay: CARD_ANIMATION_DELAY * 2
     */
    async initialDealToDealer() {
        // not revealed
        {
            let card = this.deck.popCard();
            let [top, left] = drawDealerLocation(0, 2);
            moveCard(card, top, left, false);
            this.ai.push(card);
        }
        await sleep(CARD_ANIMATION_DURATION);

        // revealed
        {
            let card = this.deck.popCard();
            let [top, left] = drawDealerLocation(1, 2);
            moveCard(card, top, left, true);
            this.ai.push(card);
            showDealerSum(this.ai, true, true);
        }
        await sleep(CARD_ANIMATION_DURATION);

        const sum = getHandValue(this.ai);
        if (sum == 21) {
            this.status = "lost";
        } else if (sum > 21) {
            this.status = "won";
        }
    }

    /**
     * Deal 2 initial cards to the player.
     * 
     * Delay: CARD_ANIMATION_DELAY * 2
     */
    async initialDealToPlayer() {
        // both revealed
        for (let idx = 0; idx < 2; idx++) {
            const card = this.deck.popCard();
            let [top, left] = drawPlayerLocation(idx, 2);
            moveCard(card, top, left, true);
            this.player.push(card);

            const sum = showPlayerSum(this.player, idx == 0);
            if (sum == 21) {
                this.status = "won";
            } else if (sum > 21) {
                this.status = "lost";
            }

            await sleep(CARD_ANIMATION_DURATION);
        }
    }

    /**
     * Starts the game.
     */
    async start() {
        await drawPhantomCard();
        await this.initialDealToDealer();
        await this.initialDealToPlayer();

        let playingOptions = document.getElementById("playing-options");
        if (!playingOptions) return;

        playingOptions.style.pointerEvents = "auto";
        playingOptions.style.opacity = "1";
    }

    /**
     * Player hit.
     * 
     * Delay: CARD_ANIMATION_DELAY
     */
    async playerHit() {
        const card = this.deck.popCard();
        this.player.push(card);

        this.player.forEach((card, idx) => {
            let [top, left] = drawPlayerLocation(idx, this.player.length);
            moveCard(card, top, left, idx == this.player.length - 1);
        });

        const sum = showPlayerSum(this.player);

        if (sum == 21) {
            this.status = "won";
        } else if (sum > 21) {
            this.status = "lost";
        }

        await sleep(CARD_ANIMATION_DURATION);
    }

    /**
     * Player stand.
     */
    async playerStand() {
        let aiSum = getHandValue(this.ai);
        let playerSum = getHandValue(this.player);
        if (playerSum < aiSum) {
            this.status = "lost";
            return;
        }

        let gameOver = false;
        while (Math.random() < 0.5) {
            console.log("ai hitting!");
            gameOver = await this.aiHit();
            if (gameOver) break;
        }
        console.log("ai standing!");
        if (gameOver) return;

        aiSum = getHandValue(this.ai);
        playerSum = getHandValue(this.player);
        if (playerSum > aiSum) {
            this.status = "won";
        }
        else {
            this.status = "lost";
        }
    }

    /**
     * @returns {Promise<boolean>}
     */
    async aiHit() {
        const card = this.deck.popCard();
        this.ai.push(card);

        this.ai.forEach((card, idx) => {
            let [top, left] = drawDealerLocation(idx, this.player.length);
            moveCard(card, top, left, idx == this.ai.length - 1);
        });
        await sleep(CARD_ANIMATION_DURATION);

        const aiSum = showDealerSum(this.ai, true);
        const playerSum = getHandValue(this.player);
        if (aiSum > 21) {
            this.status = "won";
            return true;
        } else if (aiSum == 21 || playerSum < aiSum) {
            this.status = "lost";
            return true;
        } else {
            return false;
        }
    }

    async revealDealer() {
        this.ai.forEach((cardData) => {
            let cardId = getCardId(cardData);
            let card = document.getElementById(`inner-${cardId}`);
            if (!card) return;
            card.classList.remove("flip-card-inner-flipped");
        });
        showDealerSum(this.ai, false);
        await sleep(CARD_ANIMATION_DURATION);
    }
}
