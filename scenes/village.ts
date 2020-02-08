import {elderFirstTimeDialog, elderSecondTimeDialog} from "../dialogs/village/elderGreetingDialog.js";
import {
    nahkhaAfterGoodsObtainedDialog,
    nahkhaAfterTheElderDialog,
    nahkhaBeforeTheElderDialog
} from "../dialogs/village/nahkhaDialog.js";
import {
    hargkakhAfterGoodsObtainedDialog,
    hargkakhFirstDialog,
    hargkakhSecondTryDialog
} from "../dialogs/village/hargkakhDialog.js";
import {elderInstance} from "../entities/elder.js";
import Npc from "../entities/npc.js";
import {Location} from "../entities/location.js";

export class VillageScene extends Location {
    constructor() {
        super({key: 'Village'});
    }

    public preload() {
        this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('village');

        const elder = new Npc(this, 'Elder', this.getMapObject("Elder"), 'stranger', 1, elderFirstTimeDialog, (param) => {
            elder.setDialog(elderSecondTimeDialog, (param) => {
                if (param === 'readyToGo') {
                    elder.image.destroy(true);
                    this.player.party.push(elderInstance);
                }
            });
            nahkha.setDialog(nahkhaAfterTheElderDialog, (param) => {
                if (param === 'basketsObtained') {
                    nahkha.setDialog(nahkhaAfterGoodsObtainedDialog);
                    this.player.addItemToInventory('basket', 10);
                }
            });
        });

        const nahkha = new Npc(this, 'Nahkha', this.getMapObject("Nahkha"), 'trader', 1, nahkhaBeforeTheElderDialog);

        const hargkakh = new Npc(this, 'Hargkakh', this.getMapObject("Hargkakh"), 'stranger', 1, hargkakhFirstDialog, (param) => {
            if (param === 'pickupFailure') {
                this.player.addItemToInventory('copper-key').specifics.opens = 'hargkakhsChest';
                hargkakh.setDialog(hargkakhSecondTryDialog, (param) => {
                    if (param === 'mineralsObtained') {
                        hargkakh.setDialog(hargkakhAfterGoodsObtainedDialog);
                        this.player.addItemToInventory('minerals', 10);
                    }
                });
            }
            if (param === 'mineralsObtained') {
                hargkakh.setDialog(hargkakhAfterGoodsObtainedDialog);
                this.player.addItemToInventory('minerals', 10);
            }
        });
    }

    public update() {
        this.updatePlayer();
    }
}
