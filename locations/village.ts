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
import {
    mitikhhaDialog,
    mitikhhaSecondDialog,
    mitikhhaWelcomeBackDialog
} from "../data/dialogs/village/mitikhhaDialog.js";
import {DEBUG} from "../config/constants.js";
import {tarethDialog, tarethDoneDialog, tarethSecondDialog} from "../data/dialogs/village/tarethDialog.js";
import {keithDialog, keithNoApologyDialog, keithShopAgainDialog} from "../data/dialogs/village/keithDialog.js";
import {whiskersDialog, whiskersSecondDialog} from "../data/dialogs/village/whiskersDialog.js";
import {moorshDialog} from "../data/dialogs/village/MoorshDialog.js";

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
                this.player.updateQuest('bigCaltorTrip', 'talkedToElder');
                elder.setDialog(elderSecondTimeDialog, (param) => {
                    if (param === 'readyToGo') {
                        elder.destroy();
                        this.player.party.push(elderInstance);
                        this.player.updateQuest('bigCaltorTrip', 'readyToGo');
                    }
                });
                nahkha.setDialog(nahkhaAfterTheElderDialog, (param) => {
                    if (param === 'basketsObtained') {
                        nahkha.setDialog(nahkhaAfterGoodsObtainedDialog);
                        this.player.addItemToInventory('basket', 10, undefined, this);
                        this.player.updateQuest('bigCaltorTrip', 'basketsObtained');
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

        const whiskers = new Npc({
            scene: this,
            mapObjectName: 'Whiskers',
            initDialog: whiskersDialog,
            interactionCallback: (param) => {
                whiskers.setDialog(whiskersSecondDialog);
            }
        });

        const tareth = new Npc({
            scene: this,
            mapObjectName: 'Tareth',
            initDialog: tarethDialog,
            interactionCallback: (param) => {
                tareth.setDialog(tarethSecondDialog, (param) => {
                    if (param === 'potionGiven') {
                        tareth.setDialog(tarethDoneDialog, (param) => {
                            this.player.updateQuest('helpTheTareth', 'completed');
                        });
                        this.player.updateQuest('helpTheTareth', 'potionGiven');
                    } else {
                        this.player.updateQuest('helpTheTareth', 'potionToMake');
                    }
                });
                this.player.addQuest('helpTheTareth');
            }
        });

        const keith = new Npc({
            scene: this,
            mapObjectName: 'Farmer Keith',
            initDialog: keithDialog,
            interactionCallback: (param) => {
                if (param === 'noApology') {
                    keith.setDialog(keithNoApologyDialog);
                }
                if (param === 'openShop') {
                    keith.startTrade();
                    keith.setDialog(keithShopAgainDialog);
                }
            },
            items: [
                {itemId: 'copper-pieces', quantity: 30},
                {itemId: 'carrot-seeds', quantity: 5},
                {itemId: 'carrot', quantity: 3},
                {itemId: 'strawberry-seeds', quantity: 3},
                {itemId: 'strawberry', quantity: 5},
                {itemId: 'pumpkin-seeds', quantity: 5},
                {itemId: 'pumpkin', quantity: 3},
                {itemId: 'cabbage-seeds', quantity: 5},
                {itemId: 'cabbage', quantity: 3},
            ]
        });

        const nahkha = new Npc({
            scene: this,
            mapObjectName: 'Nahkha',
            initDialog: nahkhaBeforeTheElderDialog
        });

        const moorsh = new Npc({
            scene: this,
            mapObjectName: 'Moorsh',
            initDialog: moorshDialog,
            interactionCallback: (param) =>{
                if (param === 'boneQuestAccepted') {
                    this.player.addQuest('bonesPicking');
                }
            }
        });

        const hargkakh = new Npc({
            scene: this,
            mapObjectName: 'Hargkakh',
            initDialog: hargkakhFirstDialog,
            interactionCallback: (param) => {
                if (param === 'pickupFailure') {
                    this.player.addItemToInventory('hargkakhs-key', 1, undefined, this);
                    hargkakh.setDialog(hargkakhSecondTryDialog, (param) => {
                        if (param === 'mineralsObtained') {
                            hargkakh.setDialog(hargkakhAfterGoodsObtainedDialog);
                            this.player.addItemToInventory('minerals', 10, undefined, this);
                            this.player.updateQuest('bigCaltorTrip', 'mineralsObtained');
                        }
                    });
                }
                if (param === 'mineralsObtained') {
                    hargkakh.setDialog(hargkakhAfterGoodsObtainedDialog);
                    this.player.addItemToInventory('minerals', 10, undefined, this);
                    this.player.updateQuest('bigCaltorTrip', 'mineralsObtained');
                }
            }
        });

        this.events.on('wake', (scene) => {
            if (this.player.getQuestById('bigCaltorTrip').currentStates.includes('goodsSold')) {
                mitikhha.setDialog(mitikhhaWelcomeBackDialog, () => {
                    mitikhha.destroy();
                });
                this.player.updateQuest('bigCaltorTrip', 'completed');
            }
        });
    }

    public update() {
        super.update();
    }
}
