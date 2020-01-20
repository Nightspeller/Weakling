import { Location } from "../entities/location.js";
export class HargkakhsCaveScene extends Location {
    constructor() {
        super({ key: 'HargkakhsCave' });
    }
    preload() {
        this.preparePlugins();
    }
    init() {
    }
    create() {
        this.prepareMap('hargkakhsCave', 304, 192);
        this.layers.find(layer => layer.layer.name === 'EmptyChest').setVisible(false);
        const exitObject = this.map.findObject("Objects", obj => obj.name === "Exit");
        const exit = this.physics.add
            .image(exitObject['x'] + 304, exitObject['y'] + 192, null)
            .setOrigin(0, 0)
            .setDisplaySize(exitObject['width'], exitObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, exit, () => this.switchToScene("Village"));
        const chestObject = this.map.findObject("Objects", obj => obj.name === "Chest");
        this.chest = this.physics.add
            .image(chestObject['x'] + 304, chestObject['y'] + 192, null)
            .setOrigin(0, 0)
            .setDisplaySize(chestObject['width'], chestObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.overlap(this.playerImage, this.chest, () => {
        });
    }
    update() {
        var _a;
        this.updatePlayer();
        if (((_a = this.chest.body) === null || _a === void 0 ? void 0 : _a.embedded) && this.keys.space.isDown) {
            const key = this.player.inventory.find(item => { var _a; return ((_a = item.specifics) === null || _a === void 0 ? void 0 : _a.opens) === 'hargkakhsChest'; });
            if (key) {
                this.layers.find(layer => layer.layer.name === 'EmptyChest').setVisible(true);
                this.player.addItemToInventory('fancy-belt');
                this.player.addItemToInventory('work-gloves');
                this.player.removeItemFromInventory(key);
                this.chest.destroy(true);
            }
        }
    }
}
//# sourceMappingURL=hargkakhsCave.js.map