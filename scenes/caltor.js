import { strangerDialog } from "../dialogs/strangerDialog.js";
import Trader from "../entities/trader.js";
import { fishermanDialog } from "../dialogs/fishermanDialog.js";
import { gregDialog } from "../dialogs/gregDialog.js";
import Npc from "../entities/npc.js";
import { bodgerDialog } from "../dialogs/bodgerDialog.js";
import { Location } from "../entities/location.js";
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
        this.createTrigger(`House Door`, () => {
            this.switchToScene('House');
        });
        this.createTrigger(`Village`, () => {
            this.switchToScene('Village');
        });
        this.createTrigger(`Boars`, () => {
            this.switchToScene('Fight');
        }, 'Objects', 'boar-avatar');
        this.createTrigger(`Character Picker`, () => {
            this.switchToScene('CharacterPicker', {}, false);
        });
        let layer4visible = true;
        this.createTrigger(`Barracks`, () => {
            if (layer4visible) {
                this.layers.find(layer => layer.layer.name === 'Tile Layer 4').setVisible(false);
                layer4visible = false;
            }
        }, 'Objects', null, null, 'overlap');
        const stranger = new Npc(this, 'Stranger', this.map.findObject("Objects", obj => obj.name === "Stranger"), 'stranger', 1, strangerDialog, param => {
            if (param === 'daggerObtained') {
                this.player.addItemToInventory('dagger-weapon');
            }
        });
        const greg = new Npc(this, 'Greg', this.map.findObject("Objects", obj => obj.name === "Greg"), 'fisherman', 1, gregDialog);
        const bodger = new Npc(this, 'Bodger', this.map.findObject("Objects", obj => obj.name === "Bodger"), 'fisherman', 1, bodgerDialog);
        const fisherman = new Npc(this, 'Fisherman', this.map.findObject("Objects", obj => obj.name === "Fisherman"), 'fisherman', 7, fishermanDialog);
        const traderEntity = new Trader([
            { itemId: 'copper-pieces', quantity: 200 },
            { itemId: 'rope-belt', quantity: 1 },
            { itemId: 'dagger-weapon', quantity: 1 },
            { itemId: 'leather-armor', quantity: 1 },
            { itemId: 'invisibility-cape', quantity: 1 },
        ]);
        this.createTrigger(`Trader`, () => {
            this.switchToScene('Shop', {
                player: this.player,
                trader: traderEntity
            }, false);
        }, 'Objects', 'trader');
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=Caltor.js.map