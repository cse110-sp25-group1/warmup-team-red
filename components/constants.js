// @ts-check

export class Constants {
    /**
     * @constructor
     * @param {number} viewWidth 
     * @param {number} viewHeight 
     */
    constructor(viewWidth, viewHeight) {
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;

        this.cardWidth = 240;
        this.cardHeight = this.cardWidth * 1.5;
        this.cardGap = -0.75 * this.cardWidth;

        this.padding = 24;
        this.handValueContainerSize = 48;
    }
}
