define(["require", "exports", "../../characters/adventurers/player", "./generalOverlayScene", "../../config/constants", "../../helpers/richText", "../../data/itemsData"], function (require, exports, player_1, generalOverlayScene_1, constants_1, richText_1, itemsData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class QuestLogScene extends generalOverlayScene_1.default {
        constructor() {
            super({ key: 'QuestLog' });
        }
        init({ prevScene }) {
            this.player = player_1.playerInstance;
            this.parentSceneKey = prevScene;
        }
        preload() {
        }
        create() {
            super.create(this.parentSceneKey);
            this.questLogDisplayGroup = this.add.group();
            this._drawQuestLog();
            // @ts-ignore
            this.events.on('wake', (scene, { prevScene }) => {
                this.parentSceneKey = prevScene;
                this._drawQuestLog();
            });
            this.input.keyboard.on('keyup-J', () => this.closeScene());
        }
        _drawQuestLog() {
            this.questLogDisplayGroup.clear(true, true);
            const questLogTitle = this.add.text(constants_1.GAME_W / 2, 42, 'Quest Journal', {
                color: 'black',
                fontSize: '32px',
                fontStyle: 'bold',
            })
                .setOrigin(0.5);
            this.questLogDisplayGroup.add(questLogTitle);
            const quests = this.player.getQuests();
            quests.sort((quest) => (quest.currentStates.includes('completed') ? 1 : 0));
            const textOptions = {
                color: 'black',
                wordWrap: { width: 360 },
            };
            const questDescription = this.add.container(constants_1.GAME_W / 2, 64);
            this._updateQuestDescriptionContainer(quests[0], questDescription);
            this.questLogDisplayGroup.add(questDescription);
            let selectedQuestName;
            quests.forEach((quest, index) => {
                const questName = new richText_1.default(this, 32, 64 + 20 * index, quest.questName, textOptions);
                if (index === 0) {
                    selectedQuestName = questName;
                    selectedQuestName.setStyle({ fontStyle: 'bold' });
                }
                if (quest.currentStates.includes('completed'))
                    questName.cross();
                this.questLogDisplayGroup.add(questName);
                questName.setInteractive({ useHandCursor: true });
                questName.on('pointerdown', () => {
                    selectedQuestName.setStyle({ fontStyle: 'normal' });
                    selectedQuestName = questName;
                    questName.setStyle({ fontStyle: 'bold' });
                    this._updateQuestDescriptionContainer(quests[index], questDescription);
                });
            });
        }
        _updateQuestDescriptionContainer(quest, questDescriptionContainer) {
            let lastY = 0;
            questDescriptionContainer.removeAll(true);
            quest.currentStates.forEach((state, index) => {
                if (quest.availableStates[state] !== '') {
                    const textOptions = {
                        color: 'black',
                        wordWrap: { width: 360 },
                    };
                    if (index === quest.currentStates.length - 1 && quest.currentStates.length !== 1)
                        textOptions.fontStyle = 'bold';
                    const text = new richText_1.default(this, 0, lastY, `${quest.availableStates[state]}\n\n`, textOptions);
                    questDescriptionContainer.add(text);
                    lastY += text.height;
                }
            });
            let rewardText = 'Possible reward:\n';
            rewardText += [`${quest.questReward.xp} XP`, ...quest.questReward.items.map((item) => `${item.quantity} ${itemsData_1.default[item.itemId].displayName}`)].join(', ');
            if (quest.questReward.text) {
                rewardText += `, ${quest.questReward.text}`;
            }
            const text = new richText_1.default(this, 0, lastY, rewardText, {
                color: 'black',
                wordWrap: { width: 360 },
            });
            questDescriptionContainer.add(text);
        }
    }
    exports.default = QuestLogScene;
});
//# sourceMappingURL=questLog.js.map