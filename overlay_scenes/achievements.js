import { playerInstance } from "../characters/adventurers/player.js";
import { GeneralOverlayScene } from "./generalOverlayScene.js";
import { GAME_W } from "../config/constants.js";
import { RichText } from "../helpers/richText.js";
export class AchievementsScene extends GeneralOverlayScene {
    constructor() {
        super({ key: 'Achievements' });
    }
    init({ prevScene }) {
        this.player = playerInstance;
        this.parentSceneKey = prevScene;
    }
    preload() {
    }
    create() {
        super.create(this.parentSceneKey);
        this._drawAchievements();
        this.input.keyboard.on('keyup-K', () => this.closeScene());
    }
    _drawAchievements() {
        const achievementsTitle = this.add.text(GAME_W / 2, 42, 'Achievements', { color: 'black', fontSize: '32px', fontStyle: 'bold' }).setOrigin(0.5);
        const achievements = this.player.achievements;
        const textOptions = { color: 'black', wordWrap: { width: 400 }, fontSize: '18px' };
        const achievementDescription = this.add.container(410, 64);
        this._updateQuestDescriptionContainer(achievements[0], achievementDescription);
        let selectedAchievementName;
        achievements.forEach((achievement, index) => {
            const achievementIcon = this.add.sprite(32, 64 + (32 + 10) * index, achievement.icon.texture, achievement.icon.frame)
                .setOrigin(0, 0)
                .setTint(0x9A9A9A);
            const achievementName = new RichText(this, 32 + 32 + 5, 64 + 10 + (32 + 10) * index, achievement.name, textOptions);
            if (index === 0) {
                selectedAchievementName = achievementName;
                selectedAchievementName.setStyle({ 'fontStyle': 'bold' });
            }
            if (achievement.achieved === true) {
                achievementIcon.clearTint();
                achievementName.cross();
            }
            achievementIcon.setInteractive({ useHandCursor: true });
            achievementName.setInteractive({ useHandCursor: true });
            const selectAchievement = () => {
                selectedAchievementName.setStyle({ 'fontStyle': 'normal' });
                selectedAchievementName = achievementName;
                achievementName.setStyle({ 'fontStyle': 'bold' });
                this._updateQuestDescriptionContainer(achievements[index], achievementDescription);
            };
            achievementName.on('pointerdown', selectAchievement);
            achievementIcon.on('pointerdown', selectAchievement);
        });
    }
    _updateQuestDescriptionContainer(achievement, achievementDescriptionContainer) {
        achievementDescriptionContainer.removeAll(true);
        const text = new RichText(this, 0, 10, achievement.description, { color: 'black', wordWrap: { width: 360 }, fontSize: '18px' });
        if (achievement.progress) {
            const progress = new RichText(this, 0, text.height + 10 + 10, `Progress: ${achievement.progress[0]}/${achievement.progress[1]}`, { color: 'black', wordWrap: { width: 360 }, fontSize: '18px' });
            achievementDescriptionContainer.add(progress);
        }
        achievementDescriptionContainer.add(text);
    }
}
//# sourceMappingURL=achievements.js.map