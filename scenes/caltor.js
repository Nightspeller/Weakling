import { strangerDialog } from "../dialogs/caltor/strangerDialog.js";
import { baelinDialog } from "../dialogs/caltor/baelinDialog.js";
import { gregDialog } from "../dialogs/caltor/gregDialog.js";
import Npc from "../entities/npc.js";
import { bodgerDialog } from "../dialogs/caltor/bodgerDialog.js";
import { Location } from "../entities/location.js";
import { announcementsDialog, announcementsEmptyDialog } from "../dialogs/caltor/announcementsDialog.js";
export class CaltorScene extends Location {
    constructor() {
        super({ key: 'Caltor' });
    }
    preload() {
        this.preparePlugins();
    }
    init() {
    }
    create() {
        this.prepareMap('caltor');
        this.createTrigger({
            objectName: `Character Picker`,
            callback: () => {
                this.switchToScene('CharacterPicker', {}, false);
            }
        });
        let layer4visible = true;
        this.createTrigger({
            objectName: `Barracks`,
            interaction: 'overlap',
            callback: () => {
                if (layer4visible) {
                    this.layers.find(layer => layer.layer.name === 'Barracks Roof').setVisible(false);
                    layer4visible = false;
                }
            }
        });
        const stranger = new Npc({
            scene: this,
            mapObjectName: "Stranger",
            texture: 'stranger',
            frame: 1,
            initDialog: strangerDialog,
            interactionCallback: param => {
                if (param === 'daggerObtained') {
                    this.player.addItemToInventory('dagger-weapon');
                }
            }
        });
        const greg = new Npc({
            scene: this,
            mapObjectName: "Greg",
            texture: 'fisherman',
            frame: 1,
            initDialog: gregDialog
        });
        const bodger = new Npc({
            scene: this,
            mapObjectName: "Bodger",
            initDialog: bodgerDialog,
            items: [
                { itemId: 'copper-pieces', quantity: 10 },
                { itemId: 'dagger-weapon', quantity: 1 },
                { itemId: 'leather-armor', quantity: 1 },
                { itemId: 'leather-pants', quantity: 1 },
                { itemId: 'leather-boots', quantity: 1 },
            ],
            interactionCallback: (param) => {
                if (param === 'openShop') {
                    this.switchToScene('Shop', {
                        player: this.player,
                        trader: bodger
                    }, false);
                }
                if (param === 'goodsSold') {
                    this.player.addItemToInventory('copper-pieces', 100);
                    bodger.addItemToInventory('minerals', 10);
                    bodger.addItemToInventory('basket', 10);
                }
                if (param === 'goodsSoldAndOpenShop') {
                    this.player.addItemToInventory('copper-pieces', 100);
                    bodger.addItemToInventory('minerals', 10);
                    bodger.addItemToInventory('basket', 10);
                    this.switchToScene('Shop', {
                        player: this.player,
                        trader: bodger
                    }, false);
                }
            }
        });
        const baelin = new Npc({ scene: this, mapObjectName: 'Baelin', initDialog: baelinDialog });
        const announcementsDesk = new Npc({
            scene: this,
            name: 'Announcements Desk',
            mapObjectName: 'Announcements',
            initDialog: announcementsDialog,
            interactionCallback: (param) => {
                if (param === 'questAccepted') {
                    announcementsDesk.setDialog(announcementsEmptyDialog);
                }
            }
        });
        const kasima = new Npc({
            scene: this,
            name: 'Kasima',
            mapObjectName: 'Trader',
            texture: 'trader',
            items: [
                { itemId: 'copper-pieces', quantity: 200 },
                { itemId: 'rope-belt', quantity: 1 },
                { itemId: 'dagger-weapon', quantity: 1 },
                { itemId: 'leather-armor', quantity: 1 },
                { itemId: 'invisibility-cape', quantity: 1 },
                { itemId: 'leather-gloves', quantity: 1 },
            ], interactionCallback: () => {
                this.switchToScene('Shop', {
                    player: this.player,
                    trader: kasima
                }, false);
            }
        });
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=caltor.js.map