import { playerInstance } from "../characters/adventurers/player.js";
import { GeneralOverlayScene } from "./generalOverlayScene.js";
import { GAME_W } from "../config/constants.js";
import { RichText } from "../helpers/richText.js";
import { itemsData } from "../data/itemsData.js";
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
        super.create(this.parentSceneKey);
        this.questLogDisplayGroup = this.add.group();
        this._drawQuestLog();
        this.events.on('wake', (scene, { prevScene }) => {
            this.parentSceneKey = prevScene;
            this._drawQuestLog();
        });
        this.input.keyboard.on('keyup-J', () => this.closeScene());
    }
    _drawQuestLog() {
        this.questLogDisplayGroup.clear(true, true);
        const quests = this.player.getQuests();
        quests.sort(quest => quest.currentStates.includes('completed') ? 1 : 0);
        const textOptions = { color: 'black', wordWrap: { width: 360 } };
        const questDescription = this.add.container(GAME_W / 2, 32);
        this._updateQuestDescriptionContainer(quests[0], questDescription);
        this.questLogDisplayGroup.add(questDescription);
        let selectedQuestName;
        quests.forEach((quest, index) => {
            const questName = new RichText(this, 32, 32 + 20 * index, quest.questName, textOptions);
            if (index === 0) {
                selectedQuestName = questName;
                selectedQuestName.setStyle({ 'fontStyle': 'bold' });
            }
            if (quest.currentStates.includes('completed'))
                questName.cross();
            this.questLogDisplayGroup.add(questName);
            questName.setInteractive({ useHandCursor: true });
            questName.on('pointerdown', () => {
                selectedQuestName.setStyle({ 'fontStyle': 'normal' });
                selectedQuestName = questName;
                questName.setStyle({ 'fontStyle': 'bold' });
                this._updateQuestDescriptionContainer(quests[index], questDescription);
            });
        });
    }
    _updateQuestDescriptionContainer(quest, questDescriptionContainer) {
        let lastY = 0;
        questDescriptionContainer.removeAll(true);
        quest.currentStates.forEach((state, index) => {
            if (quest.availableStates[state] !== '') {
                const textOptions = { color: 'black', wordWrap: { width: 360 } };
                if (index === quest.currentStates.length - 1 && quest.currentStates.length !== 1)
                    textOptions['fontStyle'] = 'bold';
                const text = new RichText(this, 0, lastY, quest.availableStates[state] + '\n\n', textOptions);
                questDescriptionContainer.add(text);
                lastY += text.height;
            }
        });
        let rewardText = `Possible reward:\n`;
        rewardText += [`${quest.questReward.xp} XP`, ...quest.questReward.items.map(item => `${item.quantity} ${itemsData[item.itemId].displayName}`)].join(', ');
        if (quest.questReward.text) {
            rewardText += `, ${quest.questReward.text}`;
        }
        const text = new RichText(this, 0, lastY, rewardText, { color: 'black', wordWrap: { width: 360 } });
        questDescriptionContainer.add(text);
    }
}
//# sourceMappingURL=questLog.js.map