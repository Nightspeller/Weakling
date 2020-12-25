import { GeneralLocation } from "../generalLocation.js";
import { Trigger } from "../../../entities/trigger.js";
import { StrangerNpc } from "../../../npcs/caltor/strangerNpc.js";
import { BodgerNpc } from "../../../npcs/caltor/bodgerNpc.js";
import { BaelinNpc } from "../../../npcs/caltor/baelinNpc.js";
import { AnnouncementsDeskNpc } from "../../../npcs/caltor/announcementsDeskNpc.js";
import { KasimaNpc } from "../../../npcs/caltor/kasimaNpc.js";
import { FountainNpc } from "../../../npcs/caltor/fountainNpc.js";
import { FionaNpc } from "../../../npcs/caltor/fionaNpc.js";
export class CaltorScene extends GeneralLocation {
    constructor() {
        super({ key: 'Caltor' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('caltor');
        let layer4visible = true;
        const barracksMapObject = this.getMapObject(`Barracks`);
        new Trigger({
            scene: this,
            name: barracksMapObject.name,
            triggerX: barracksMapObject.x,
            triggerY: barracksMapObject.y,
            triggerW: barracksMapObject.width,
            triggerH: barracksMapObject.height,
            interaction: 'overlap',
            callback: () => {
                if (layer4visible) {
                    this.layers.find(layer => layer.layer.name === 'Barracks Roof').setVisible(false);
                    layer4visible = false;
                }
            }
        });
        const stranger = new StrangerNpc({ scene: this });
        const bodger = new BodgerNpc({ scene: this });
        const baelin = new BaelinNpc({ scene: this });
        const announcementsDesk = new AnnouncementsDeskNpc({ scene: this });
        const kasima = new KasimaNpc({ scene: this });
        const fiona = new FionaNpc({ scene: this });
        const fountain = new FountainNpc({ scene: this });
        this.events.on('resume', (scene, data) => {
            if (this.player.defeatedEnemies.includes('caltor/Boars 1') && this.player.defeatedEnemies.includes('caltor/Boars 2')) {
                this.player.updateQuest('boarsAtTheFields', 'boarsKilled');
            }
        });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=caltor.js.map