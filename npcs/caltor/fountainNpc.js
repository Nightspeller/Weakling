import GeneralNpc from "../generalNpc.js";
import { fountainChangedDialog, fountainSignDialog, fountainVandalDialog } from "../../data/dialogs/caltor/fountainSignDialog.js";
export class FountainNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Fountain sign',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: fountainSignDialog,
            interactionCallback: (param) => {
                var _a;
                if ((_a = scene.player.getQuestById('theSelflessSpirit')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('started')) {
                    scene.player.updateQuest('theSelflessSpirit', 'falseNameLearned');
                }
            }
        });
        this.preInteractionCallback = () => {
            var _a, _b;
            if (((_a = scene.player.getQuestById('theSelflessSpirit')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('trueNameLearned')) &&
                !((_b = scene.player.getQuestById('theSelflessSpirit')) === null || _b === void 0 ? void 0 : _b.currentStates.includes('deedsGlorified'))) {
                this.setDialog(fountainVandalDialog, (param) => {
                    if (param === 'fountainVandalized') {
                        scene.player.updateQuest('theSelflessSpirit', 'deedsGlorified');
                        this.setDialog(fountainChangedDialog, () => {
                        });
                    }
                });
            }
        };
    }
}
//# sourceMappingURL=fountainNpc.js.map