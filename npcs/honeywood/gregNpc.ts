import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {
    gregAfterQuestFinishedDialog,
    gregDialog,
    gregQuestAcceptedDialog
} from "../../data/dialogs/honeywood/gregDialog.js";

export class GregNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Greg',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: gregDialog,
            interactionCallback: (param) => {
                if (param === 'jobAccepted') {
                    scene.player.addQuest('gatherTheGarlic');
                    this.setDialog(gregQuestAcceptedDialog);
                }
                if (param === 'garlicGathered') {
                    scene.player.updateQuest('gatherTheGarlic', 'completed');
                    this.setDialog(gregAfterQuestFinishedDialog);
                }
                if (param === 'garlicGatheredOpenShop') {
                    scene.player.updateQuest('gatherTheGarlic', 'completed');
                    this.setDialog(gregAfterQuestFinishedDialog);
                    this.startTrade();
                }
                if (param === 'openShop') {
                    this.startTrade();
                }
            },
            items: [
                {itemId: 'garlic', quantity: 10},
                {itemId: 'garlic-seeds', quantity: 10},
            ],
        });
    }
}
