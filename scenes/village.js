import { elderFirstTimeDialog, elderSecondTimeDialog } from "../dialogs/elderGreetingDialog.js";
import { nahkhaAfterGoodsObtainedDialog, nahkhaAfterTheElderDialog, nahkhaBeforeTheElderDialog } from "../dialogs/nahkhaDialog.js";
import { hargkakhAfterGoodsObtainedDialog, hargkakhFirstDialog, hargkakhSecondTryDialog } from "../dialogs/hargkakhDialog.js";
import { elderInstance } from "../entities/elder.js";
import Npc from "../entities/npc.js";
import { Location } from "../entities/location.js";
export class VillageScene extends Location {
    constructor() {
        super({ key: 'Village' });
    }
    preload() {
        this.preparePlugins();
    }
    init() {
    }
    create() {
        this.prepareMap('village');
        const map = this.map;
        const caltorObject = map.findObject("Objects", obj => obj.name === "Caltor");
        const caltorPortal = this.physics.add
            .image(caltorObject['x'], caltorObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(caltorObject['width'], caltorObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, caltorPortal, () => this.switchToScene("Caltor"));
        const elder = new Npc(this, 'Elder', map.findObject("Objects", obj => obj.name === "Elder"), 'stranger', 1, elderFirstTimeDialog, (param) => {
            elder.setDialog(elderSecondTimeDialog, (param) => {
                if (param === 'readyToGo') {
                    elder.image.destroy(true);
                    this.player.party.push(elderInstance);
                }
            });
            nahkha.setDialog(nahkhaAfterTheElderDialog, (param) => {
                if (param === 'basketsObtained') {
                    nahkha.setDialog(nahkhaAfterGoodsObtainedDialog);
                    this.player.addItemToInventory('basket', 10);
                }
            });
        });
        const nahkha = new Npc(this, 'Nahkha', map.findObject("Objects", obj => obj.name === "Nahkha"), 'trader', 1, nahkhaBeforeTheElderDialog);
        const hargkakh = new Npc(this, 'Hargkakh', map.findObject("Objects", obj => obj.name === "Hargkakh"), 'stranger', 1, hargkakhFirstDialog, (param) => {
            if (param === 'pickupFailure') {
                this.player.addItemToInventory('copper-key').specifics.opens = 'hargkakhsChest';
                hargkakh.setDialog(hargkakhSecondTryDialog, (param) => {
                    if (param === 'mineralsObtained') {
                        hargkakh.setDialog(hargkakhAfterGoodsObtainedDialog);
                        this.player.addItemToInventory('minerals', 10);
                    }
                });
            }
            if (param === 'mineralsObtained') {
                hargkakh.setDialog(hargkakhAfterGoodsObtainedDialog);
                this.player.addItemToInventory('minerals', 10);
            }
        });
        const hargkakhsCaveObject = map.findObject("Objects", obj => obj.name === "Hargkakh's Cave");
        const hargkakhsCave = this.physics.add
            .image(hargkakhsCaveObject['x'], hargkakhsCaveObject['y'], null)
            .setVisible(false)
            .setOrigin(0, 0)
            .setDisplaySize(hargkakhsCaveObject['width'], hargkakhsCaveObject['height'])
            .setImmovable();
        this.physics.add.collider(this.playerImage, hargkakhsCave, () => this.switchToScene('HargkakhsCave'));
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=village.js.map