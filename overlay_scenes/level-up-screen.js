import { playerInstance } from "../characters/adventurers/player.js";
import { GeneralOverlayScene } from "./generalOverlayScene.js";
import { GAME_W } from "../config/constants.js";
import { RichText } from "../helpers/richText.js";
export class LevelUpScreenScene extends GeneralOverlayScene {
    constructor() {
        super({ key: 'LevelUpScreen' });
    }
    init({ prevScene }) {
        this.player = playerInstance;
        this.parentSceneKey = prevScene;
        this.attributeModifiers = [0, 0, 0];
        this.availablePoints = 2;
    }
    preload() {
    }
    create() {
        super.create(this.parentSceneKey);
        this._drawLevelUpScreen();
    }
    _drawLevelUpScreen() {
        const levelUpTitle = this.add.text(GAME_W / 2, 42, 'Level up!', {
            color: 'black',
            fontSize: '32px',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        const textOptions = { color: 'black', wordWrap: { width: 400 }, fontSize: '18px' };
        const availablePointsText = this.add.text(32, 64, `Available points: ${this.availablePoints}`, textOptions);
        const addStrengthIcon = this.add.sprite(32, 96, 'icon-item-set', 32).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        const addStrengthText = this.add.text(64, 106, `Strength: ${this.player.characteristics.strength}`, textOptions).setOrigin(0, 0);
        const addAgilityIcon = this.add.sprite(32, 128, 'icon-item-set', 32).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        const addAgilityText = this.add.text(64, 138, `Agility: ${this.player.characteristics.agility}`, textOptions).setOrigin(0, 0);
        const addIntelligenceIcon = this.add.sprite(32, 160, 'icon-item-set', 32).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        const addIntelligenceText = this.add.text(64, 170, `Intelligence: ${this.player.characteristics.intelligence}`, textOptions).setOrigin(0, 0);
        const increaseAttribute = (attr) => {
            if (this.availablePoints !== 0) {
                this.attributeModifiers[attr]++;
                //this._drawCharacteristics();
                this.availablePoints--;
                availablePointsText.setText(`Available points: ${this.availablePoints}`);
            }
            if (this.availablePoints === 0) {
                addStrengthIcon.setVisible(false);
                addAgilityIcon.setVisible(false);
                addIntelligenceIcon.setVisible(false);
            }
        };
        addStrengthIcon.on('pointerdown', () => {
            increaseAttribute(0);
            addStrengthText.setText(`Strength: ${this.player.characteristics.strength + this.attributeModifiers[0]}`);
        });
        addAgilityIcon.on('pointerdown', () => {
            increaseAttribute(1);
            addAgilityText.setText(`Agility: ${this.player.characteristics.agility + this.attributeModifiers[1]}`);
        });
        addIntelligenceIcon.on('pointerdown', () => {
            increaseAttribute(2);
            addIntelligenceText.setText(`Intelligence: ${this.player.characteristics.intelligence + this.attributeModifiers[2]}`);
        });
        const finishButton = new RichText(this, 96, 200, `Confirm!`, { ...textOptions, padding: 3 }, {
            color: 0x907748,
            width: 3,
            alpha: 1
        }).setInteractive({ useHandCursor: true });
        finishButton.on('pointerdown', () => {
            if (this.availablePoints === 0) {
                this.player.levelUp(...this.attributeModifiers);
                this.closeScene();
            }
        });
        //this._drawCharacteristics();
    }
    _drawCharacteristics() {
        const textX = GAME_W / 2 - 16;
        const textY = 64;
        const text = `${this.player.name}, level ${this.player.level}, ${this.player.xp}xp / ${this.player.experienceTable[this.player.level]}xp
HP: ${this.player.parameters.health}/${this.player.characteristics.health}
MP: ${this.player.parameters.manna}/${this.player.characteristics.manna}
EN: ${this.player.parameters.energy}/${this.player.characteristics.energy}
Strength: ${this.player.characteristics.strength}
Agility: ${this.player.characteristics.agility}
Intelligence: ${this.player.characteristics.intelligence}
Armor: ${this.player.characteristics.armor}
Dodge: ${this.player.characteristics.dodge}
Resistance: 🔥${this.player.characteristics.fireResistance}❄${this.player.characteristics.coldResistance}⚡${this.player.characteristics.electricityResistance}☣${this.player.characteristics.acidResistance}☠${this.player.characteristics.poisonResistance}✨${this.player.characteristics.magicResistance}
Initiative: ${this.player.characteristics.initiative}
Damage: ${this.player.getAttackDamage()}

Actions: ${this.player.getAvailableActions().join(', ')}`;
        if (!this.charText) {
            this.charText = this.add.text(textX, textY, text, {
                color: 'black',
                wordWrap: { width: 400 },
                fontSize: '18px'
            });
        }
        else {
            this.charText.setText(text);
        }
    }
}
//# sourceMappingURL=level-up-screen.js.map