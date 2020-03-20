import { playerInstance } from "../characters/adventurers/player.js";
import { GeneralOverlayScene } from "./generalOverlayScene.js";
import { GAME_W } from "../config/constants.js";
export class QuestLogScene extends GeneralOverlayScene {
    constructor() {
        super({ key: 'QuestLog' });
    }
    init({ prevScene }) {
        this.player = playerInstance;
        this.parentSceneKey = prevScene;
    }
    preload() {
    }
    create() {
        this.prepareOverlay(this.parentSceneKey);
        this.questLogDisplayGroup = this.add.group();
        this._drawQuestLog();
        this.events.on('wake', (scene, { prevScene }) => {
            this.parentSceneKey = prevScene;
            this._drawQuestLog();
        });
        this.input.keyboard.on('keyup-J', () => this.closeScene());
    }
    _drawQuestLog() {
        var _a;
        this.questLogDisplayGroup.clear(true, true);
        const quests = this.player.getQuests();
        const textOptions = {
            color: 'black',
            wordWrap: { width: 360 }
        };
        const firstQuestDescription = (_a = quests[0]) === null || _a === void 0 ? void 0 : _a.questState.descriptions.map(descriptionIndex => quests[0].questDescriptions[descriptionIndex]).join('\n\n');
        const questDescription = this.add.text(GAME_W / 2, 32, firstQuestDescription, textOptions);
        this.questLogDisplayGroup.add(questDescription);
        quests.forEach((quest, index) => {
            const questName = this.add.text(32, 32 + 20 * index, quest.questName, textOptions);
            this.questLogDisplayGroup.add(questName);
            const questDescriptionText = quests[index].questState.descriptions.map(descriptionIndex => quests[index].questDescriptions[descriptionIndex]).join('\n\n');
            questName.setInteractive({ useHandCursor: true });
            questName.on('pointerdown', () => {
                questDescription.setText(questDescriptionText);
            });
        });
    }
}
//# sourceMappingURL=questLog.js.map