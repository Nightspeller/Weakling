import {elderFirstTimeDialog, elderSecondTimeDialog} from "../data/dialogs/village/elderGreetingDialog.js";
import {
    nahkhaAfterGoodsObtainedDialog,
    nahkhaAfterTheElderDialog,
    nahkhaBeforeTheElderDialog
} from "../data/dialogs/village/nahkhaDialog.js";
import {
    hargkakhAfterGoodsObtainedDialog,
    hargkakhFirstDialog,
    hargkakhSecondTryDialog
} from "../data/dialogs/village/hargkakhDialog.js";
import {elderInstance} from "../characters/adventurers/elder.js";
import Npc from "../entities/npc.js";
import {GeneralLocation} from "./generalLocation.js";
import {introVillageDialog} from "../data/dialogs/introDialog.js";
import {mitikhhaDialog, mitikhhaSecondDialog} from "../data/dialogs/village/mitikhhaDialog.js";
import {DEBUG} from "../config/constants.js";
import {tarethDialog, tarethSecondDialog} from "../data/dialogs/village/tarethDialog.js";

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

        if (!DEBUG) {
            this.switchToScene('Dialog', {
                dialogTree: introVillageDialog,
                closeCallback: (param) => {
                }
            }, false);
        }

        const elder = new Npc({
            scene: this,
            mapObjectName: 'Elder Guarthh',
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

        const tareth = new Npc({
            scene: this,
            mapObjectName: 'Tareth',
            initDialog: tarethDialog,
            interactionCallback: (param) => {
                tareth.setDialog(tarethSecondDialog);
            }
        });

        const nahkha = new Npc({
            scene: this,
            mapObjectName: 'Nahkha',
            initDialog: nahkhaBeforeTheElderDialog
        });

        const hargkakh = new Npc({
            scene: this,
            mapObjectName: 'Hargkakh',
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
