import {strangerDialog} from "../dialogs/strangerDialog.js";
import {baelinDialog} from "../dialogs/baelinDialog.js";
import {gregDialog} from "../dialogs/gregDialog.js";
import Npc from "../entities/npc.js";
import {bodgerDialog} from "../dialogs/bodgerDialog.js";
import {Location} from "../entities/location.js";

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

        this.createTrigger(`House Door`, () => {
            this.switchToScene('House')
        });

        this.createTrigger(`Village`, () => {
            this.switchToScene('Village')
        });

        this.createTrigger(`Character Picker`, () => {
            this.switchToScene('CharacterPicker', {}, false)
        });

        let layer4visible = true;
        this.createTrigger(`Barracks`, () => {
            if (layer4visible) {
                this.layers.find(layer => layer.layer.name === 'Tile Layer 4').setVisible(false);
                layer4visible = false
            }
        }, 'Objects', null, null, 'overlap');

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
        }, [
            {itemId: 'copper-pieces', quantity: 10},
            {itemId: 'dagger-weapon', quantity: 1},
            {itemId: 'leather-armor', quantity: 1},
            {itemId: 'leather-pants', quantity: 1},
            {itemId: 'leather-boots', quantity: 1},
        ]);
        const baelin = new Npc(this, 'Baelin', this.getMapObject("Fisherman"), 'fisherman', 7, baelinDialog);

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