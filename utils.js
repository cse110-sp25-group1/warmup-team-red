// fisher-yates
export function shuffle(array) {
    let i = array.length;
    while (i != 0) {
        let j = Math.floor(Math.random() * i);
        i--;
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const numberToPixel = (number) => `${number}px`;
export const pixelToNumber = (pixel) => pixel.slice(0, pixel.length - 2);

export const sleep = async (ms) => await new Promise((r) => setTimeout(r, ms));