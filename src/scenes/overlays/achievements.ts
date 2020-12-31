import { GameObjects } from 'phaser';
import { Player, playerInstance } from '../../characters/adventurers/player';
import GeneralOverlayScene from './generalOverlayScene';
import { GAME_W } from '../../config/constants';
import RichText from '../../helpers/richText';

export default class AchievementsScene extends GeneralOverlayScene {
    private player: Player;

    constructor() {
      super({ key: 'Achievements' });
    }

    public init({ prevScene }: { prevScene: string }) {
      this.player = playerInstance;
      this.parentSceneKey = prevScene;
    }

    public preload() {

    }

    public create() {
      super.create(this.parentSceneKey);
      this._drawAchievements();
      this.input.keyboard.on('keyup-K', () => this.closeScene());
    }

    private _drawAchievements() {
      this.add.text(GAME_W / 2, 42, 'Achievements', { color: 'black', fontSize: '32px', fontStyle: 'bold' }).setOrigin(0.5);
      const { achievements } = this.player;

      const textOptions = { color: 'black', wordWrap: { width: 400 }, fontSize: '18px' };
      const achievementDescription = this.add.container(410, 64);
      this._updateQuestDescriptionContainer(achievements[0], achievementDescription);

      let selectedAchievementName: RichText;

      achievements.forEach((achievement, index) => {
        const achievementIcon = this.add.sprite(32, 64 + (32 + 10) * index, achievement.icon.texture, achievement.icon.frame)
          .setOrigin(0, 0);
        const achievementName = new RichText(this, 32 + 32 + 5, 64 + 10 + (32 + 10) * index, achievement.name, textOptions);
        if (index === 0) {
          selectedAchievementName = achievementName;
          selectedAchievementName.setStyle({ fontStyle: 'bold' });
        }
        if (achievement.achieved === true) achievementName.cross();

        achievementIcon.setInteractive({ useHandCursor: true });
        achievementName.setInteractive({ useHandCursor: true });
        const selectAchievement = () => {
          selectedAchievementName.setStyle({ fontStyle: 'normal' });
          selectedAchievementName = achievementName;
          achievementName.setStyle({ fontStyle: 'bold' });
          this._updateQuestDescriptionContainer(achievements[index], achievementDescription);
        };
        achievementName.on('pointerdown', selectAchievement);
        achievementIcon.on('pointerdown', selectAchievement);
      });
    }

    private _updateQuestDescriptionContainer(achievement: any, achievementDescriptionContainer: GameObjects.Container) {
      achievementDescriptionContainer.removeAll(true);
      const text = new RichText(this, 0, 10, achievement.description, { color: 'black', wordWrap: { width: 360 }, fontSize: '18px' });
      if (achievement.progress) {
        const progress = new RichText(this,
          0,
          text.height + 10 + 10,
          `Progress: ${achievement.progress[0]}/${achievement.progress[1]}`,
          { color: 'black', wordWrap: { width: 360 }, fontSize: '18px' });
        achievementDescriptionContainer.add(progress);
      }
      achievementDescriptionContainer.add(text);
    }
}
