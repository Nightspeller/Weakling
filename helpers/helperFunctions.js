import { backpackSlotNames, containerSlotNames, quickSlotNames } from "../data/items/itemSlots.js";
import { quickSlotItems } from "../data/items/quickSlotItems.js";
export function capsFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function drawBorder(scene, object, color = 0x0000ff) {
    scene.add.graphics()
        .lineStyle(1, color)
        .strokeRect(object.getTopLeft().x, object.getTopLeft().y, object.displayWidth, object.displayHeight);
}
export function generatePotions(characteristic, icons) {
    const qualities = ['weak', 'mediocre', 'average', 'strong', 'powerful'];
    const sizes = ['small', 'medium', 'big', 'giant'];
    const result = {};
    sizes.forEach((size, sizeIndex) => {
        qualities.forEach((quality, qualityIndex) => {
            const potionId = `${size}-${quality}-${characteristic}-potion`;
            const sellPrise = (2 ** (sizeIndex + 1)) + (3 ** (qualityIndex + 1));
            result[potionId] = {
                itemId: potionId,
                displayName: `${capsFirstLetter(size)} ${quality} ${characteristic} potion`,
                description: `This potion gives you some ${characteristic}`,
                possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
                sprite: icons[sizeIndex],
                stackable: true,
                modified: false,
                quantity: null,
                specifics: {
                    additionalActions: [`drink${capsFirstLetter(size)}${capsFirstLetter(quality)}${capsFirstLetter(characteristic)}Potion`]
                },
                sellPrice: sellPrise,
                buyPrice: sellPrise * 2
            };
        });
    });
    return result;
}
export function generatePotionActions(characteristic) {
    const sizes = ['small', 'medium', 'big', 'giant'];
    const qualities = ['weak', 'mediocre', 'average', 'strong', 'powerful'];
    const result = {};
    sizes.forEach((size, sizeIndex) => {
        qualities.forEach((quality, qualityIndex) => {
            const actionId = `drink${capsFirstLetter(size)}${capsFirstLetter(quality)}${capsFirstLetter(characteristic)}Potion`;
            //TODO: strength is wrong and bad as a concept.....
            const strength = sizeIndex + qualityIndex + 1;
            result[actionId] = {
                actionId: actionId,
                phase: ['preparation', 'battle'],
                type: 'misc',
                actionName: `Drink ${size} ${quality} ${characteristic} potion`,
                consumes: `${size}-${quality}-${characteristic}-potion`,
                actionDescription: `Drink ${size} ${quality} ${characteristic} potion to get ${strength * 5} ${characteristic}`,
                effectsDescriptions: [{
                        effectId: `add${capsFirstLetter(characteristic)}`,
                        strength: strength
                    }],
                target: 'self',
                actionCost: 0.5,
                noticeable: 0,
                animation: 'castBuff',
                icon: quickSlotItems[`${size}-${quality}-${characteristic}-potion`].sprite,
                parametersCost: {},
            };
        });
    });
    return result;
}
//# sourceMappingURL=helperFunctions.js.map