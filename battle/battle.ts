import {Player, playerInstance} from "../characters/adventurers/player.js";
import {PlayerActions} from "../actionsAndEffects/playerActions.js";
import {Disposition} from "./disposition.js";
import GeneralCharacter from "../characters/generalCharacter.js";
import {ACTION_POINT_HEIGHT, ACTION_POINT_WIDTH, BATTLE_CHAR_HEIGHT, BATTLE_CHAR_WIDTH} from "../config/constants.js";
import Rectangle = Phaser.Geom.Rectangle;
import {GeneralLocation} from "../locations/generalLocation.js";
import {CharacterDrawer} from "./characterDrawer.js";
import {Adventurer} from "../characters/adventurers/adventurer.js";
import GeneralEnemy from "../characters/enemies/generalEnemy";
import {ActionInterfaceDrawer} from "./actionInterfaceDrawer.js";

export class BattleScene extends GeneralLocation {
    private disposition: Disposition;
    private turnOrderDisplayContainer: Phaser.GameObjects.Container;
    private enemies: string[];
    charToDrawerMap: Map<GeneralCharacter, CharacterDrawer>;
    private characterInfoGroup: Phaser.GameObjects.Group;
    private effectInformationGroup: Phaser.GameObjects.Group;
    private enemyName: string;
    private actionInterfaceDrawer: ActionInterfaceDrawer;

    constructor() {
        super({key: 'Battle'});
    }

    public init(data) {
        if (Array.isArray(data.enemies)) {
            this.enemies = data.enemies.map(enemy => enemy.type);
            this.enemyName = data.enemyName;
        } else {
            throw Error('No enemies were passed for Battle scene!');
        }
        this.prevSceneKey = data.prevScene;
    }

    public preload() {
        this.preparePlugins();
    }

    public create() {
        this.prepareMap('battle');

        this.turnOrderDisplayContainer = this.add.container(16, 16);

        this.player = playerInstance;

        this.charToDrawerMap = new Map();

        this.disposition = new Disposition(
            this.player.party,
            this.enemies,
            'forrest',
            this);
        this.actionInterfaceDrawer = new ActionInterfaceDrawer(this, this.disposition);
        this.disposition.playerCharacters.forEach((char, index) => {
            this.charToDrawerMap.set(char, new CharacterDrawer(this, char, index));
        });
        this.disposition.enemyCharacters.forEach((char, index) => {
            this.charToDrawerMap.set(char, new CharacterDrawer(this, char, index));
        });

        this.disposition.startRound()
    }

    public redrawAllCharacters() {
        this.charToDrawerMap.forEach((charDrawer, char) => {
            charDrawer.drawEverything(this.disposition.currentCharacter === char)
        })
    }

    public collectActions(char: Adventurer | GeneralEnemy) {
        this.redrawAllCharacters();
        if (char instanceof Adventurer) {
            return this.actionInterfaceDrawer.drawActionInterface()
        } else {
            return Promise.resolve(char.aiTurn(this.disposition));
        }
    }

    public async animateAction({attempted, succeeded, triggeredTraps, source, targets, action}: { attempted: boolean; succeeded: boolean[]; triggeredTraps: Effect[], source: Adventurer | GeneralEnemy; targets: (Adventurer | GeneralEnemy)[]; action: Action }) {
        this.charToDrawerMap.get(source).drawActionPoints(true);
        if (attempted) {
            await this.playAnimation(source, action.animation, targets[0]);
            await Promise.all(targets.map((target, index) => {
                if (succeeded[index] && targets[index] !== source) {
                    return this.playAnimation(targets[index], 'hit')
                }
            }));
            targets.forEach(target => {
                if (!target.isAlive) {
                    this.playAnimation(target, 'death')
                }
            });
            if (!source.isAlive) {
                this.playAnimation(source, 'death')
            }
        }
    }

    public async playAnimation(char: Adventurer | GeneralEnemy, animation: string, target?) {
        const charDrawer = this.charToDrawerMap.get(char);
        const targetDrawer = this.charToDrawerMap.get(target);
        switch (animation) {
            case 'idle':
                await charDrawer.playIdleAnimation();
                break;
            case 'meleeAttack':
                await charDrawer.playMeleeAttackAnimation(targetDrawer.position.x, targetDrawer.position.y);
                break;
            case 'castBuff':
                await charDrawer.playCastAnimation();
                break;
            case 'hit':
                await charDrawer.playHitAnimation();
                break;
            case 'death':
                await charDrawer.playDeathAnimation();
                break;
        }
    }

    public drawTurnOrder(turnOrder: (Adventurer | GeneralEnemy)[]) {
        this.turnOrderDisplayContainer.removeAll(true);
        this.turnOrderDisplayContainer.add(this.add.graphics()
            .fillStyle(0xf0d191, 0.5)
            .fillRect(0, 0, 64 * turnOrder.length, 64 + 16)
            .lineStyle(1, 0x000000)
            .strokeRect(0, 0, 64 * turnOrder.length, 64 + 16)
        );

        turnOrder.forEach((char, i) => {
            const charNameText = this.add.text(64 * i, 16 + 64, char.name, {
                backgroundColor: 'lightgrey',
                color: 'black'
            }).setVisible(false);
            const initiativeText = this.add.text(64 * i, 0, char.currentCharacteristics.attributes.initiative.toString(), {
                fixedWidth: 64,
                fixedHeight: 16,
                align: 'center',
                color: 'black'
            });
            initiativeText.setInteractive()
                .on('pointerover', () => charNameText.setText('Initiative').setVisible(true))
                .on('pointerout', () => charNameText.setVisible(false));
            this.turnOrderDisplayContainer.add(charNameText);
            this.turnOrderDisplayContainer.add(initiativeText);
            this.turnOrderDisplayContainer.add(this.add.sprite(64 * i + 32, 16 + 32, char.spriteParams.texture, char.spriteParams.frame)
                .setDisplaySize(64, 64).setInteractive()
                .on('pointerover', () => charNameText.setText(char.name).setVisible(true))
                .on('pointerout', () => charNameText.setVisible(false)));
        });
    }


    public exitBattle(isPartyWon) {
        console.log('Switching from the battle scene to ', this.prevSceneKey);
        if (isPartyWon === true) {
            this.scene.run(this.prevSceneKey, {defeatedEnemy: this.enemyName});
        } else {
            this.scene.run(this.prevSceneKey);
        }

        this.scene.stop('Battle');
    }

    public update() {
    }
}
