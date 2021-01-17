define(["require", "exports", "phaser", "../data/items/itemSlots", "../data/items/quickSlotItems"], function (require, exports, Phaser, itemSlots_1, quickSlotItems_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generatePotionActions = exports.generatePotions = exports.drawBorder = exports.capsFirstLetter = void 0;
    function capsFirstLetter(string) {
        return string.charAt(0)
            .toUpperCase() + string.slice(1);
    }
    exports.capsFirstLetter = capsFirstLetter;
    function drawBorder(scene, object, color = 0x0000ff) {
        if (object instanceof Phaser.GameObjects.Sprite) {
            scene.add.graphics()
                .lineStyle(1, color)
                .strokeRect(object.getTopLeft().x, object.getTopLeft().y, object.displayWidth, object.displayHeight);
        }
        else {
            scene.add.graphics()
                .lineStyle(1, color)
                .strokeRect(object.x, object.y, object.width, object.height);
        }
    }
    exports.drawBorder = drawBorder;
    function generatePotions(characteristic, icons) {
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
                    possibleSlots: [...itemSlots_1.quickSlotNames, ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
                    sprite: icons[sizeIndex],
                    stackable: true,
                    modified: false,
                    quantity: null,
                    specifics: {
                        additionalActions: [`drink${capsFirstLetter(size)}${capsFirstLetter(quality)}${capsFirstLetter(characteristic)}Potion`],
                        recovers: [{
                                itemId: `${size}-bottle`,
                                quality: 1,
                            }],
                    },
                    sellPrice: sellPrise,
                    buyPrice: sellPrise * 2,
                };
            });
        });
        return result;
    }
    exports.generatePotions = generatePotions;
    function generatePotionActions(characteristic) {
        const sizes = ['small', 'medium', 'big', 'giant'];
        const qualities = ['weak', 'mediocre', 'average', 'strong', 'powerful'];
        const result = {};
        sizes.forEach((size, sizeIndex) => {
            qualities.forEach((quality, qualityIndex) => {
                const actionId = `drink${capsFirstLetter(size)}${capsFirstLetter(quality)}${capsFirstLetter(characteristic)}Potion`;
                // TODO: strength is wrong and bad as a concept.....
                const strength = sizeIndex + qualityIndex + 1;
                result[actionId] = {
                    actionId,
                    phase: ['preparation', 'battle'],
                    type: 'misc',
                    actionName: `Drink ${size} ${quality} ${characteristic} potion`,
                    consumes: `${size}-${quality}-${characteristic}-potion`,
                    actionDescription: `Drink ${size} ${quality} ${characteristic} potion to get ${strength * 5} ${characteristic}`,
                    effectsDescriptions: [{
                            effectId: `add${capsFirstLetter(characteristic)}`,
                            // @ts-ignore
                            strength,
                        }],
                    target: 'self',
                    actionCost: 0.5,
                    noticeable: 0,
                    animation: 'castBuff',
                    icon: quickSlotItems_1.default[`${size}-${quality}-${characteristic}-potion`].sprite,
                    parametersCost: {},
                };
            });
        });
        return result;
    }
    exports.generatePotionActions = generatePotionActions;
});
//# sourceMappingURL=helperFunctions.js.map