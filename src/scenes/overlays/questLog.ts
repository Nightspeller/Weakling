import * as Phaser from 'phaser';
import { Player, playerInstance } from '../../characters/adventurers/player';
import GeneralOverlayScene from './generalOverlayScene';
import { GAME_W } from '../../config/constants';
import RichText from '../../helpers/richText';
import itemsData from '../../data/itemsData';
import { Quest } from '../../types/my-types';

export default class QuestLogScene extends GeneralOverlayScene {
  private player: Player;
  private questLogDisplayGroup: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'QuestLog' });
  }

  public init({ prevScene }: {prevScene: string}) {
    this.player = playerInstance;
    this.parentSceneKey = prevScene;
  }

  public preload() {

  }

  public create() {
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

  private _drawQuestLog() {
    this.questLogDisplayGroup.clear(true, true);
    const questLogTitle = this.add.text(GAME_W / 2, 42, 'Quest Journal', {
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

    const questDescription = this.add.container(GAME_W / 2, 64);
    this._updateQuestDescriptionContainer(quests[0], questDescription);
    this.questLogDisplayGroup.add(questDescription);

    let selectedQuestName: RichText;

    quests.forEach((quest, index) => {
      const questName = new RichText(this, 32, 64 + 20 * index, quest.questName, textOptions);
      if (index === 0) {
        selectedQuestName = questName;
        selectedQuestName.setStyle({ fontStyle: 'bold' });
      }
      if (quest.currentStates.includes('completed')) questName.cross();
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

  private _updateQuestDescriptionContainer(quest: Quest, questDescriptionContainer: Phaser.GameObjects.Container) {
    let lastY = 0;
    questDescriptionContainer.removeAll(true);
    quest.currentStates.forEach((state, index) => {
      if (quest.availableStates[state] !== '') {
        const textOptions: any = {
          color: 'black',
          wordWrap: { width: 460 },
        };
        if (index === quest.currentStates.length - 1 && quest.currentStates.length !== 1) textOptions.fontStyle = 'bold';
        const text = new RichText(this, 0, lastY, `${quest.availableStates[state]}\n\n`, textOptions);
        questDescriptionContainer.add(text);
        lastY += text.height;
      }
    });

    let rewardText = 'Possible reward:\n';
    rewardText += [`${quest.questReward.xp} XP`, ...quest.questReward.items.map((item) => `${item.quantity} ${itemsData[item.itemId].displayName}`)].join(', ');
    if (quest.questReward.text) {
      rewardText += `, ${quest.questReward.text}`;
    }

    const text = new RichText(this, 0, lastY, rewardText, {
      color: 'black',
      wordWrap: { width: 360 },
    });
    questDescriptionContainer.add(text);
  }
}
