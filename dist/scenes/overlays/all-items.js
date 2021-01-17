define(["require", "exports", "../../characters/adventurers/player", "./generalOverlayScene", "../../config/constants", "../../data/itemsData", "../../characters/adventurers/elder", "../../characters/adventurers/eyeball"], function (require, exports, player_1, generalOverlayScene_1, constants_1, itemsData_1, elder_1, eyeball_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AllItemsScene extends generalOverlayScene_1.default {
        constructor() {
            super({ key: 'AllItems' });
        }
        init({ prevScene }) {
            this.player = player_1.playerInstance;
            this.parentSceneKey = prevScene;
        }
        preload() {
        }
        create() {
            super.create(this.parentSceneKey);
            this._drawAllItems();
        }
        _drawAllItems() {
            this.add.text(constants_1.GAME_W / 2, 42, 'All Items', {
                color: 'black',
                fontSize: '32px',
                fontStyle: 'bold',
            })
                .setOrigin(0.5);
            const allItems = itemsData_1.default;
            let itemsInRow = 0;
            let itemColumn = 0;
            const description = this.add.text(0, 0, '', { color: 'black', backgroundColor: 'lightgrey' })
                .setVisible(false)
                .setDepth(100);
            Object.keys(allItems)
                .forEach((itemId) => {
                const x = 26 + (10 + 32) * itemsInRow;
                const y = 64 + (32 + 10) * itemColumn;
                // itemBg
                this.add.graphics()
                    .fillStyle(0x323232, 1)
                    .fillRect(x, y, 32, 32)
                    .lineStyle(3, 0x907748)
                    .strokeRect(x, y, 32, 32);
                const itemIcon = this.add.sprite(x, y, allItems[itemId].sprite.texture, allItems[itemId].sprite.frame)
                    .setOrigin(0, 0)
                    .setDisplaySize(32, 32);
                itemIcon.setInteractive({ useHandCursor: true });
                itemIcon.on('pointerdown', () => this.player.addItemToInventory(itemId));
                itemIcon.on('pointerover', () => {
                    description.setText(itemId)
                        .setPosition(x, y - 16);
                    description.setVisible(true);
                });
                itemIcon.on('pointerout', () => description.setVisible(false));
                if (itemsInRow < 17) {
                    itemsInRow += 1;
                }
                else {
                    itemsInRow = 0;
                    itemColumn += 1;
                }
            });
            const elderIcon = this.add.sprite(16, 16, 'elder')
                .setOrigin(0, 0)
                .setDisplaySize(32, 32);
            elderIcon.setInteractive({ useHandCursor: true });
            elderIcon.once('pointerdown', () => { this.player.party = [...new Set([...this.player.party, elder_1.elderInstance])]; });
            elderIcon.on('pointerover', () => {
                description.setText('Add Elder to the party')
                    .setPosition(32, 32);
                description.setVisible(true);
            });
            elderIcon.on('pointerout', () => description.setVisible(false));
            const eyeballIcon = this.add.sprite(58, 16, 'eyeball-idle', 0)
                .setOrigin(0, 0)
                .setDisplaySize(32, 32);
            eyeballIcon.setInteractive({ useHandCursor: true });
            eyeballIcon.once('pointerdown', () => { this.player.party = [...new Set([...this.player.party, eyeball_1.eyeballInstance])]; });
            eyeballIcon.on('pointerover', () => {
                description.setText('Add Eyeball to the party')
                    .setPosition(58, 32);
                description.setVisible(true);
            });
            eyeballIcon.on('pointerout', () => description.setVisible(false));
            const addXPIcon = this.add.sprite(90, 16, 'icon-item-set', 32)
                .setOrigin(0, 0)
                .setDisplaySize(32, 32);
            addXPIcon.setInteractive({ useHandCursor: true });
            addXPIcon.on('pointerdown', () => this.player.addXp(5));
            addXPIcon.on('pointerover', () => {
                description.setText('Add XP')
                    .setPosition(32, 32);
                description.setVisible(true);
            });
            addXPIcon.on('pointerout', () => description.setVisible(false));
        }
    }
    exports.default = AllItemsScene;
});
//# sourceMappingURL=all-items.js.map