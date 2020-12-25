import {Player, playerInstance} from "../../characters/adventurers/player.js";
import {GeneralOverlayScene} from "./generalOverlayScene.js";
import {GAME_W} from "../../config/constants.js";
import {itemsData} from "../../data/itemsData.js";
import {elderInstance} from "../../characters/adventurers/elder.js";
import {eyeballInstance} from "../../characters/adventurers/eyeball.js";

export class AllItemsScene extends GeneralOverlayScene {
    private player: Player;

    constructor() {
        super({key: 'AllItems'});

    }

    public init({prevScene}) {
        this.player = playerInstance;
        this.parentSceneKey = prevScene;
    }

    public preload() {

    }

    public create() {
        super.create(this.parentSceneKey);
        this._drawAllItems();
    }

    private _drawAllItems() {
        const allItemsTitle = this.add.text(GAME_W / 2, 42, 'All Items', {
            color: 'black',
            fontSize: '32px',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        const allItems = itemsData;

        let itemsInRow = 0;
        let itemColumn = 0;
        const description = this.add.text(0,0, '', {color: 'black', backgroundColor: 'lightgrey'}).setVisible(false).setDepth(100);
        Object.keys(allItems).forEach(itemId => {
            const x = 26 + (10 + 32) * itemsInRow;
            const y = 64 + (32 + 10) * itemColumn;
            const itemBg = this.add.graphics()
                .fillStyle(0x323232, 1)
                .fillRect(x, y, 32, 32)
                .lineStyle(3, 0x907748)
                .strokeRect(x, y, 32, 32);
            const itemIcon = this.add.sprite(x, y, allItems[itemId].sprite.texture, allItems[itemId].sprite.frame)
                .setOrigin(0, 0)
                .setDisplaySize(32, 32);

            itemIcon.setInteractive({useHandCursor: true});
            itemIcon.on('pointerdown', () => this.player.addItemToInventory(itemId));
            itemIcon.on('pointerover', () => {
                description.setText(itemId).setPosition(x, y-16);
                description.setVisible(true)
            });
            itemIcon.on('pointerout', () => description.setVisible(false));
            if (itemsInRow < 17) {
                itemsInRow++
            } else {
                itemsInRow = 0;
                itemColumn++;
            }
        })
        const elderIcon = this.add.sprite(16, 16, 'elder')
            .setOrigin(0, 0)
            .setDisplaySize(32, 32);
        elderIcon.setInteractive({useHandCursor: true});
        elderIcon.once('pointerdown', () => this.player.party = [... new Set([...this.player.party, elderInstance])]);
        elderIcon.on('pointerover', () => {
            description.setText('Add Elder to the party').setPosition(32, 32);
            description.setVisible(true)
        });
        elderIcon.on('pointerout', () => description.setVisible(false));
        const eyeballIcon = this.add.sprite(58, 16, 'eyeball-idle', 0)
            .setOrigin(0, 0)
            .setDisplaySize(32, 32);
        eyeballIcon.setInteractive({useHandCursor: true});
        eyeballIcon.once('pointerdown', () => this.player.party = [... new Set([...this.player.party, eyeballInstance])]);
        eyeballIcon.on('pointerover', () => {
            description.setText('Add Eyeball to the party').setPosition(58, 32);
            description.setVisible(true)
        });
        eyeballIcon.on('pointerout', () => description.setVisible(false));
        const addXPIcon = this.add.sprite(90, 16, 'icon-item-set', 32)
            .setOrigin(0, 0)
            .setDisplaySize(32, 32);
        addXPIcon.setInteractive({useHandCursor: true});
        addXPIcon.on('pointerdown', () => this.player.addXp(5));
        addXPIcon.on('pointerover', () => {
            description.setText('Add XP').setPosition(32, 32);
            description.setVisible(true)
        });
        addXPIcon.on('pointerout', () => description.setVisible(false));
    }
}
