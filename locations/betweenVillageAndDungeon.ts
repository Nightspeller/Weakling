import {GeneralLocation} from "./generalLocation.js";
import {firstTimePatchDialog, secondTimePatchDialog} from "../data/dialogs/betweenVillageAndDungeon/patchDialog.js";
import {itemsData} from "../data/itemsData.js";

export class BetweenVillageAndDungeonScene extends GeneralLocation {
    private planted: { plantId: string; plantedAt: number, grown: boolean, tileIndex: number }[];

    constructor() {
        super({key: 'BetweenVillageAndDungeon'});
        this.planted = [];
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('betweenVillageAndDungeon');
        let currentDialog = firstTimePatchDialog;
        //TODO: place plants on the proper places in array and field when some of them are collected and some are not
        this.createTrigger({
            objectName: 'Your patch',
            callback: () => {
                const plantables = this.player.inventory.filter(item => item.specifics?.plantable);
                const updatedDialog = JSON.parse(JSON.stringify(currentDialog));
                const dialogLineToModify = currentDialog === firstTimePatchDialog ? 1 : 0;
                if (this.planted.length < 9) {
                    plantables.forEach(plantable => {
                        updatedDialog[dialogLineToModify].replies.unshift({
                            text: plantable.displayName,
                            callbackParam: {itemId: plantable.itemId, resultId: plantable.specifics.plantable}
                        })
                    });
                } else {
                    updatedDialog[dialogLineToModify].replies[0] = {
                        text: "It seems like your patch is fully utilized - collect existing crops before planting new.",
                        callbackParam: 'fastEnd'
                    }
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
                                tileIndex: this.planted.length // <------ this is wrong, must put to first empty spot!
                            };
                            this.planted.push(plant);
                            this.drawPlant(plant)
                        }
                    }
                }, false);
            }
        });
    }

    public update() {
        super.update();
        this.planted.forEach(plant => {
            if (!plant.grown && (Date.now() - plant.plantedAt > 10000)) {
                plant.grown = true;
                this.drawPlant(plant);
            }
        })
    }

    private drawPlant(plant: { tileIndex: number; plantId: string; grown: boolean; plantedAt: number }) {
        const x = plant.tileIndex % 3;
        const y = (plant.tileIndex - x) / 3;
        if (plant.grown) {
            this.erasePlant(plant.tileIndex);
            this.createTrigger({
                objectName: `Patch ${x},${y}`,
                texture: itemsData[plant.plantId].sprite.key,
                frame: itemsData[plant.plantId].sprite.frame,
                singleUse: true,
                callback: () => {
                    this.player.addItemToInventory(plant.plantId);
                    this.planted = this.planted.filter(plantInList => plantInList.tileIndex !== plant.tileIndex);
                },
            })
        } else {
            this.map.putTileAt(157, 12 + x, 15 + y, true, 'Patch Plants');
        }
    }

    private erasePlant(tileIndex: number) {
        const x = tileIndex % 3;
        const y = (tileIndex - x) / 3;
        this.map.removeTileAt(12 + x, 15 + y, true, true,'Patch Plants');
    }
}
