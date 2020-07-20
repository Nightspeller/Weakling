import {Player, playerInstance} from "../characters/adventurers/player.js";
import {GeneralOverlayScene} from "./generalOverlayScene.js";
import {GAME_W} from "../config/constants.js";
import {RichText} from "../helpers/richText.js";

export class LevelUpScreenScene extends GeneralOverlayScene {
    private player: Player;
    charText: Phaser.GameObjects.Text;
    private attributeModifiers: number[];
    private availablePoints: number;

    constructor() {
        super({key: 'LevelUpScreen'});

    }

    public init({prevScene}) {
        this.player = playerInstance;
        this.parentSceneKey = prevScene;
        this.attributeModifiers = [0, 0, 0];
        this.availablePoints = 2;
    }

    public preload() {

    }

    public create() {
        super.create(this.parentSceneKey);
        this._drawLevelUpScreen();
    }

    private _drawLevelUpScreen() {
        const levelUpTitle = this.add.text(GAME_W / 2, 42, 'Level up!', {
            color: 'black',
            fontSize: '32px',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const textOptions = {color: 'black', wordWrap: {width: 400}, fontSize: '18px'};
        const availablePointsText = this.add.text(32, 64, `Available points: ${this.availablePoints}`, textOptions);

        const addStrengthIcon = this.add.sprite(32, 96, 'icon-item-set', 32).setOrigin(0, 0).setInteractive({useHandCursor: true});
        const addStrengthText = this.add.text(64, 106, `Strength: ${this.player.currentCharacteristics.attributes.strength}`, textOptions).setOrigin(0, 0);
        const addAgilityIcon = this.add.sprite(32, 128, 'icon-item-set', 32).setOrigin(0, 0).setInteractive({useHandCursor: true});
        const addAgilityText = this.add.text(64, 138, `Agility: ${this.player.currentCharacteristics.attributes.agility}`, textOptions).setOrigin(0, 0);
        const addIntelligenceIcon = this.add.sprite(32, 160, 'icon-item-set', 32).setOrigin(0, 0).setInteractive({useHandCursor: true});
        const addIntelligenceText = this.add.text(64, 170, `Intelligence: ${this.player.currentCharacteristics.attributes.intelligence}`, textOptions).setOrigin(0, 0);

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
        }
        addStrengthIcon.on('pointerdown', () => {
            increaseAttribute(0);
            addStrengthText.setText(`Strength: ${this.player.currentCharacteristics.attributes.strength + this.attributeModifiers[0]}`)
        })
        addAgilityIcon.on('pointerdown', () => {
            increaseAttribute(1);
            addAgilityText.setText(`Agility: ${this.player.currentCharacteristics.attributes.agility + this.attributeModifiers[1]}`)
        })
        addIntelligenceIcon.on('pointerdown', () => {
            increaseAttribute(2);
            addIntelligenceText.setText(`Intelligence: ${this.player.currentCharacteristics.attributes.intelligence + this.attributeModifiers[2]}`)
        })

        const finishButton = new RichText(this, 96, 200, `Confirm!`, {...textOptions, padding: 3}, {
            color: 0x907748,
            width: 3,
            alpha: 1
        }).setInteractive({useHandCursor: true});
        finishButton.on('pointerdown', () => {
            if (this.availablePoints === 0) {
                this.player.levelUp(...this.attributeModifiers);
                this.closeScene();
            }
        })

        //this._drawCharacteristics();

    }

    private _drawCharacteristics() {
        const textX = GAME_W / 2 - 16;
        const textY = 64;
        const text = `${this.player.name}, level ${this.player.level}, ${this.player.xp}xp / ${this.player.experienceTable[this.player.level]}xp
HP: ${this.player.currentCharacteristics.parameters.currentHealth}/${this.player.currentCharacteristics.parameters.health}
MP: ${this.player.currentCharacteristics.parameters.currentManna}/${this.player.currentCharacteristics.parameters.manna}
EN: ${this.player.currentCharacteristics.parameters.currentEnergy}/${this.player.currentCharacteristics.parameters.energy}
Strength: ${this.player.currentCharacteristics.attributes.strength}
Agility: ${this.player.currentCharacteristics.attributes.agility}
Intelligence: ${this.player.currentCharacteristics.attributes.intelligence}
Armor: ${this.player.currentCharacteristics.defences.armor}
Dodge: ${this.player.currentCharacteristics.defences.dodge}
Resistance: 🔥${this.player.currentCharacteristics.defences.fireResistance}❄${this.player.currentCharacteristics.defences.coldResistance}⚡${this.player.currentCharacteristics.defences.electricityResistance}☣${this.player.currentCharacteristics.defences.acidResistance}☠${this.player.currentCharacteristics.defences.poisonResistance}✨${this.player.currentCharacteristics.defences.magicResistance}
Initiative: ${this.player.currentCharacteristics.attributes.initiative}
Damage: ${this.player.getAttackDamage()}

Actions: ${this.player.getAvailableActions().join(', ')}`;

        if (!this.charText) {
            this.charText = this.add.text(textX, textY, text, {
                color: 'black',
                wordWrap: {width: 400},
                fontSize: '18px'
            });
        } else {
            this.charText.setText(text);
        }
    }
}
