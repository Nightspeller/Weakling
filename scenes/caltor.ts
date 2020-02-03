import {strangerDialog} from "../dialogs/strangerDialog.js";
import {baelinDialog} from "../dialogs/baelinDialog.js";
import {gregDialog} from "../dialogs/gregDialog.js";
import Npc from "../entities/npc.js";
import {bodgerDialog} from "../dialogs/bodgerDialog.js";
import {Location} from "../entities/location.js";
import {announcementsDialog, announcementsEmptyDialog} from "../dialogs/announcementsDialog.js";

export class CaltorScene extends Location {
    constructor() {
        super({key: 'Caltor'});
    }

    public preload() {
        this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('caltor');

        this.createTrigger({
            objectName: `Character Picker`,
            callback: () => {
                this.switchToScene('CharacterPicker', {}, false)
            }
        });

        let layer4visible = true;
        this.createTrigger({
            objectName: `Barracks`,
            interaction: 'overlap',
            callback: () => {
                if (layer4visible) {
                    this.layers.find(layer => layer.layer.name === 'Tile Layer 4').setVisible(false);
                    layer4visible = false
                }
            }
        });

        const stranger = new Npc(this, 'Stranger', this.getMapObject("Stranger"), 'stranger', 1, strangerDialog, param => {
            if (param === 'daggerObtained') {
                this.player.addItemToInventory('dagger-weapon');
            }
        });

        const greg = new Npc(this, 'Greg', this.getMapObject("Greg"), 'fisherman', 1, gregDialog);
        const bodger = new Npc(this, 'Bodger', this.getMapObject("Bodger"), 'fisherman', 1, bodgerDialog, (param) => {
            if (param === 'openShop') {
                this.switchToScene('Shop', {
                    player: this.player,
                    trader: bodger
                }, false)
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
                }, false)
            }
        }, [
            {itemId: 'copper-pieces', quantity: 10},
            {itemId: 'dagger-weapon', quantity: 1},
            {itemId: 'leather-armor', quantity: 1},
            {itemId: 'leather-pants', quantity: 1},
            {itemId: 'leather-boots', quantity: 1},
        ]);
        const baelin = new Npc(this, 'Baelin', this.getMapObject("Fisherman"), 'fisherman', 7, baelinDialog);

        const announcementsDesk = new Npc(this, 'Announcements Desk', this.getMapObject("Announcements"), null, null, announcementsDialog, (param) =>{
            if (param==='questAccepted') {
                announcementsDesk.setDialog(announcementsEmptyDialog);
            }
        });

        const kasima = new Npc(this, 'Kasima', this.getMapObject('Trader'), 'trader', null, undefined, () => {
            this.switchToScene('Shop', {
                player: this.player,
                trader: kasima
            }, false)
        }, [
            {itemId: 'copper-pieces', quantity: 200},
            {itemId: 'rope-belt', quantity: 1},
            {itemId: 'dagger-weapon', quantity: 1},
            {itemId: 'leather-armor', quantity: 1},
            {itemId: 'invisibility-cape', quantity: 1},
            {itemId: 'leather-gloves', quantity: 1},
        ]);
    }

    public update() {
        this.updatePlayer();
    }
}