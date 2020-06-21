import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {liatshDialog} from "../../data/dialogs/eldersCave/liatshDialog.js";

export class LiatshNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Liatsh',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: liatshDialog,
            interactionCallback: (param) => {
            }
        });
    }
}
