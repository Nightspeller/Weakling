import { GeneralLocation } from "./generalLocation.js";
import { Trigger } from "../entities/trigger.js";
import { StrangerNpc } from "../npcs/caltor/strangerNpc.js";
import { GregNpc } from "../npcs/caltor/gregNpc.js";
import { BodgerNpc } from "../npcs/caltor/bodgerNpc.js";
import { BaelinNpc } from "../npcs/caltor/baelinNpc.js";
import { AnnouncementsDeskNpc } from "../npcs/caltor/announcementsDeskNpc.js";
import { KasimaNpc } from "../npcs/caltor/kasimaNpc.js";
import { FountainNpc } from "../npcs/caltor/fountainNpc.js";
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
        const charPickerMapObject = this.getMapObject(`Character Picker`);
        new Trigger({
            scene: this,
            name: charPickerMapObject.name,
            triggerX: charPickerMapObject.x,
            triggerY: charPickerMapObject.y,
            triggerW: charPickerMapObject.width,
            triggerH: charPickerMapObject.height,
            callback: () => {
                this.switchToScene('CharacterPicker', {}, false);
            }
        });
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
        const greg = new GregNpc({ scene: this });
        const bodger = new BodgerNpc({ scene: this });
        const baelin = new BaelinNpc({ scene: this });
        const announcementsDesk = new AnnouncementsDeskNpc({ scene: this });
        const kasima = new KasimaNpc({ scene: this });
        const fountain = new FountainNpc({ scene: this });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=caltor.js.map