import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {strangerDialog} from "../../data/dialogs/caltor/strangerDialog.js";

export class StrangerNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Stranger',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: strangerDialog,
            interactionCallback: (param) => {
                if (param === 'daggerObtained') {
                    scene.player.addItemToInventory('dagger-weapon', 1, undefined, scene);
                }
            }
        });
    }
}
