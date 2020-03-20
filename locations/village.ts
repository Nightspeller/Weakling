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
import {tarethDialog, tarethSecondDialog} from "../data/dialogs/village/tarethDialog.js";
import {keithDialog, keithNoApologyDialog, keithShopAgainDialog} from "../data/dialogs/village/keithDialog.js";
import {questsData} from "../data/quests/questsData.js";

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
                this.player.updateQuest('bigCaltorTrip', {questState: {state: 'talkedWithElder', descriptions: [0,1]}});
                elder.setDialog(elderSecondTimeDialog, (param) => {
                    if (param === 'readyToGo') {
                        elder.image.destroy(true);
                        this.player.party.push(elderInstance);
                        this.player.updateQuest('bigCaltorTrip', {questState: {state: 'readyToGo', descriptions: [0,1,2,3,4]}});
                    }
                });
                nahkha.setDialog(nahkhaAfterTheElderDialog, (param) => {
                    if (param === 'basketsObtained') {
                        nahkha.setDialog(nahkhaAfterGoodsObtainedDialog);
                        this.player.addItemToInventory('basket', 10);
                        if (this.player.getQuestById('bigCaltorTrip').questState.state === 'someGoodsObtained') {
                            this.player.updateQuest('bigCaltorTrip', {questState: {state: 'allGoodsObtained', descriptions: [0,1,2,3]}});
                        } else {
                            this.player.updateQuest('bigCaltorTrip', {questState: {state: 'someGoodsObtained', descriptions: [0,1,3]}});
                        }
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
                tareth.setDialog(tarethSecondDialog, () => {});
                this.player.addQuest(questsData['helpTheTareth']);
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
                    this.switchToScene('Shop', {
                        player: this.player,
                        trader: keith
                    }, false);
                    keith.setDialog(keithShopAgainDialog);
                }
            },
            items:[
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

        const hargkakh = new Npc({
            scene: this,
            mapObjectName: 'Hargkakh',
            initDialog: hargkakhFirstDialog,
            interactionCallback: (param) => {
                if (param === 'pickupFailure') {
                    this.player.addItemToInventory('copper-key').specifics.opens = 'hargkakhsChest';
                    hargkakh.setDialog(hargkakhSecondTryDialog, (param) => {
                        if (param === 'mineralsObtained') {
                            mineralsObtainedFromHargkakh()
                        }
                    });
                }
                if (param === 'mineralsObtained') {
                    mineralsObtainedFromHargkakh()
                }
            }
        });

        const mineralsObtainedFromHargkakh = () => {
            hargkakh.setDialog(hargkakhAfterGoodsObtainedDialog);
            this.player.addItemToInventory('minerals', 10);
            if (this.player.getQuestById('bigCaltorTrip').questState.state === 'someGoodsObtained') {
                this.player.updateQuest('bigCaltorTrip', {questState: {state: 'allGoodsObtained', descriptions: [0,1,3,2]}});
            } else {
                this.player.updateQuest('bigCaltorTrip', {questState: {state: 'someGoodsObtained', descriptions: [0,1,2]}});
            }
        };

        this.events.on('wake', (scene) => {
            if (this.player.getQuestById('bigCaltorTrip').questState.state === 'goodsSold') {
                mitikhha.setDialog(mitikhhaWelcomeBackDialog, () => {
                    mitikhha.image.destroy(true);
                });
                this.player.updateQuest('bigCaltorTrip', {questState: {state: 'someGoodsObtained', descriptions: [0,1,2,3,4,5,6]}});
            }
        });
    }

    public update() {
        super.update();
    }
}
