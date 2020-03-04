import { GeneralLocation } from "./generalLocation.js";
import { firstTimePatchDialog, secondTimePatchDialog } from "../data/dialogs/betweenVillageAndDungeon/patchDialog.js";
import { itemsData } from "../data/itemsData.js";
export class BetweenVillageAndDungeonScene extends GeneralLocation {
    constructor() {
        super({ key: 'BetweenVillageAndDungeon' });
        this.planted = [];
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('betweenVillageAndDungeon');
        let currentDialog = firstTimePatchDialog;
        const patchImage = this.createTrigger({
            objectName: 'Your patch',
            callback: () => {
                const plantables = this.player.inventory.filter(item => { var _a; return (_a = item.specifics) === null || _a === void 0 ? void 0 : _a.plantable; });
                const updatedDialog = JSON.parse(JSON.stringify(currentDialog));
                plantables.forEach(plantable => {
                    updatedDialog[1].replies.unshift({
                        text: plantable.displayName,
                        callbackParam: { itemId: plantable.itemId, resultId: plantable.specifics.plantable }
                    });
                });
                if (this.planted.length !== 0) {
                    this.planted.forEach(plant => {
                        if (plant.grown) {
                            updatedDialog[2].replies.unshift({
                                text: itemsData[plant.plantId].displayName,
                                callbackParam: { itemId: plant.plantId, tileIndex: plant.tileIndex }
                            });
                        }
                    });
                }
                this.switchToScene('Dialog', {
                    dialogTree: updatedDialog,
                    speakerName: 'Your patch',
                    closeCallback: (param) => {
                        currentDialog = secondTimePatchDialog;
                        if (param.resultId !== undefined) {
                            const itemSelected = plantables.find(plantable => plantable.itemId === param.itemId);
                            this.player.removeItemFromInventory(itemSelected, 1);
                            const plant = {
                                plantId: param.resultId,
                                plantedAt: Date.now(),
                                grown: false,
                                tileIndex: this.planted.length
                            };
                            this.planted.push(plant);
                            this.drawPlant(plant);
                        }
                        if (param.tileIndex !== undefined) {
                            this.player.addItemToInventory(param.itemId);
                            this.planted = this.planted.filter(plant => plant.tileIndex !== param.tileIndex);
                            this.erasePlant(param.tileIndex);
                        }
                    }
                }, false);
            }
        }).image;
    }
    update() {
        super.update();
        this.planted.forEach(plant => {
            if (!plant.grown && (Date.now() - plant.plantedAt > 10000)) {
                plant.grown = true;
                this.drawPlant(plant);
            }
        });
    }
    drawPlant(plant) {
        const x = plant.tileIndex % 3;
        const y = (plant.tileIndex - x) / 3;
        const tile = plant.grown ? itemsData[plant.plantId].sprite.frame + 1 : 157;
        this.map.putTileAt(tile, 12 + x, 15 + y, true, 'Patch Plants');
    }
    erasePlant(tileIndex) {
        const x = tileIndex % 3;
        const y = (tileIndex - x) / 3;
        this.map.removeTileAt(12 + x, 15 + y, true, true, 'Patch Plants');
    }
}
//# sourceMappingURL=betweenVillageAndDungeon.js.map