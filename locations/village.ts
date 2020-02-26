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
import {elderInstance} from "../characters/adventurers/elder.js";
import Npc from "../entities/npc.js";
import {GeneralLocation} from "./generalLocation.js";
import {introVillageDialog} from "../dialogs/introDialog.js";
import {mitikhhaDialog, mitikhhaSecondDialog} from "../dialogs/village/mitikhhaDialog.js";

export class VillageScene extends GeneralLocation {
    constructor() {
        super({key: 'Village'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('village');

        this.switchToScene('Dialog', {
            dialogTree: introVillageDialog,
            closeCallback: (param) => {}
        }, false);

        const elder = new Npc({
            scene: this,
            mapObjectName: 'Elder',
            texture: 'stranger',
            frame: 1,
            initDialog: elderFirstTimeDialog,
            interactionCallback: (param) => {
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
            }
        });

        const mitikhha = new Npc({
            scene: this,
            mapObjectName: 'Mitikhha',
            initDialog: mitikhhaDialog,
            interactionCallback: (param) => {
                mitikhha.setDialog(mitikhhaSecondDialog);
            }
        });

        const nahkha = new Npc({
            scene: this,
            mapObjectName: 'Nahkha',
            texture: 'trader',
            frame: 1,
            initDialog: nahkhaBeforeTheElderDialog
        });

        const hargkakh = new Npc({
            scene: this,
            mapObjectName: 'Hargkakh',
            texture: 'stranger',
            frame: 1,
            initDialog: hargkakhFirstDialog,
            interactionCallback: (param) => {
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
            }
        });
    }

    public update() {
        super.update();
    }
}
