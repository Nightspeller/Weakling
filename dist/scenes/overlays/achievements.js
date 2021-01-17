define(["require", "exports", "../../characters/adventurers/player", "./generalOverlayScene", "../../config/constants", "../../helpers/richText"], function (require, exports, player_1, generalOverlayScene_1, constants_1, richText_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AchievementsScene extends generalOverlayScene_1.default {
        constructor() {
            super({ key: 'Achievements' });
        }
        init({ prevScene }) {
            this.player = player_1.playerInstance;
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
            this.add.text(constants_1.GAME_W / 2, 42, 'Achievements', { color: 'black', fontSize: '32px', fontStyle: 'bold' }).setOrigin(0.5);
            const { achievements } = this.player;
            const textOptions = { color: 'black', wordWrap: { width: 400 }, fontSize: '18px' };
            const achievementDescription = this.add.container(410, 64);
            this._updateQuestDescriptionContainer(achievements[0], achievementDescription);
            let selectedAchievementName;
            achievements.forEach((achievement, index) => {
                const achievementIcon = this.add.sprite(32, 64 + (32 + 10) * index, achievement.icon.texture, achievement.icon.frame)
                    .setOrigin(0, 0);
                const achievementName = new richText_1.default(this, 32 + 32 + 5, 64 + 10 + (32 + 10) * index, achievement.name, textOptions);
                if (index === 0) {
                    selectedAchievementName = achievementName;
                    selectedAchievementName.setStyle({ fontStyle: 'bold' });
                }
                if (achievement.achieved === true)
                    achievementName.cross();
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
        _updateQuestDescriptionContainer(achievement, achievementDescriptionContainer) {
            achievementDescriptionContainer.removeAll(true);
            const text = new richText_1.default(this, 0, 10, achievement.description, { color: 'black', wordWrap: { width: 360 }, fontSize: '18px' });
            if (achievement.progress) {
                const progress = new richText_1.default(this, 0, text.height + 10 + 10, `Progress: ${achievement.progress[0]}/${achievement.progress[1]}`, { color: 'black', wordWrap: { width: 360 }, fontSize: '18px' });
                achievementDescriptionContainer.add(progress);
            }
            achievementDescriptionContainer.add(text);
        }
    }
    exports.default = AchievementsScene;
});
//# sourceMappingURL=achievements.js.map