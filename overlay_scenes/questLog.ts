import {Player, playerInstance} from "../characters/adventurers/player.js";
import {GeneralOverlayScene} from "./generalOverlayScene.js";
import {GAME_W} from "../config/constants.js";

export class QuestLogScene extends GeneralOverlayScene {
    private player: Player;
    private questLogDisplayGroup: Phaser.GameObjects.Group;

    constructor() {
        super({key: 'QuestLog'});
    }

    public init({prevScene}) {
        this.player = playerInstance;
        this.parentSceneKey = prevScene;
    }

    public preload() {

    }

    public create() {
        super.create(this.parentSceneKey);
        this.questLogDisplayGroup = this.add.group();
        this._drawQuestLog();
        this.events.on('wake', (scene, {prevScene}) => {
            this.parentSceneKey = prevScene;
            this._drawQuestLog();
        });
        this.input.keyboard.on('keyup-J', () => this.closeScene());
    }

    private _drawQuestLog() {
        this.questLogDisplayGroup.clear(true, true);
        const quests = this.player.getQuests();
        const textOptions = {
            color: 'black',
            wordWrap: {width: 360}
        };
        const questDescription = this.add.text(GAME_W / 2, 32, this._getQuestDescriptionText(quests[0]), textOptions);
        this.questLogDisplayGroup.add(questDescription);
        quests.forEach((quest, index) => {
            const questName = this.add.text(32, 32 + 20 * index, quest.questName, textOptions);
            this.questLogDisplayGroup.add(questName);
            const questDescriptionText = this._getQuestDescriptionText(quests[index]);
            questName.setInteractive({useHandCursor: true});
            questName.on('pointerdown', () => {
                questDescription.setText(questDescriptionText);
            })
        })
    }

    private _getQuestDescriptionText(quest: Quest) {
        let description = '';
        quest.currentStates.forEach(state => {
            if (quest.availableStates[state] !== '') {
                description += quest.availableStates[state] + '\n\n'
            }
        })
        return description
    }
}
