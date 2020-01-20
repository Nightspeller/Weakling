import {strangerDialog} from "../dialogs/strangerDialog.js";
import Trader from "../entities/trader.js";
import {fishermanDialog} from "../dialogs/fishermanDialog.js";
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

        const houseDoorObject = this.map.findObject("Objects", obj => obj.name === "House Door");
        const houseDoor = this.physics.add
            .image(houseDoorObject['x'], houseDoorObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(houseDoorObject['width'], houseDoorObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, houseDoor, () => this.switchToScene("House"));

        const villageObject = this.map.findObject("Objects", obj => obj.name === "Village");
        const villagePortal = this.physics.add
            .image(villageObject['x'], villageObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(villageObject['width'], villageObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, villagePortal, () => this.switchToScene("Village"));

        const enemyObject = this.map.findObject("Objects", obj => obj.name === "Goblin");
        const enemy = this.physics.add
            .image(enemyObject['x'], enemyObject['y'], 'boar-avatar')
            .setOrigin(0, 0)
            .setDisplaySize(enemyObject['width'], enemyObject['height'])
            // .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, enemy, () => this.switchToScene("Fight"));

        const barracksObject = this.map.findObject("Objects", obj => obj.name === "Barracks");
        const barracks = this.physics.add
            .image(barracksObject['x'], barracksObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(barracksObject['width'], barracksObject['height'])
            .setVisible(false)
            .setImmovable();
        let layer4visible = true;
        this.physics.add.overlap(this.playerImage, barracks, () => {
            if (layer4visible) {
                this.layers.find(layer => layer.name === 'Tile Layer 4').setVisible(false);
                layer4visible = false
            }
        });

        const stranger = new Npc(this, 'Stranger', this.map.findObject("Objects", obj => obj.name === "Stranger"), 'stranger', 1, strangerDialog, param => {
            if (param === 'daggerObtained') {
                this.player.addItemToInventory('dagger-weapon');
            }
        });

        const greg = new Npc(this, 'Greg', this.map.findObject("Objects", obj => obj.name === "Greg"), 'fisherman', 1, gregDialog);
        const bodger = new Npc(this, 'Bodger', this.map.findObject("Objects", obj => obj.name === "Bodger"), 'fisherman', 1, bodgerDialog);
        const fisherman = new Npc(this, 'Fisherman', this.map.findObject("Objects", obj => obj.name === "Fisherman"), 'fisherman', 7, fishermanDialog);

        const traderObject = this.map.findObject("Objects", obj => obj.name === "Trader");
        const trader = this.physics.add
            .image(traderObject['x'], traderObject['y'], 'trader')
            .setOrigin(0, 0)
            .setDisplaySize(traderObject['width'], traderObject['height'])
            .setImmovable();
        const traderItems = [
            {itemId: 'copper-pieces', quantity: 200},
            {itemId: 'rope-belt', quantity: 1},
            {itemId: 'dagger-weapon', quantity: 1},
            {itemId: 'leather-armor', quantity: 1},
            {itemId: 'invisibility-cape', quantity: 1},
        ];
        const traderEntity = new Trader(traderItems);
        this.physics.add.collider(this.playerImage, trader, () => this.switchToScene('Shop', {
            player: this.player,
            trader: traderEntity
        }, false));

        const chatPickerObject = this.map.findObject("Objects", obj => obj.name === "Character Picker");
        const chatPicker = this.physics.add
            .image(chatPickerObject['x'], chatPickerObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(chatPickerObject['width'], chatPickerObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, chatPicker, () => this.switchToScene('CharacterPicker', {}, false));
    }

    public update() {
        this.updatePlayer();
    }
}