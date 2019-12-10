import Player from "../entities/player.js";
import {PlayerActions} from "../actionsAndEffects/playerActions.js";
import {Disposition} from "../entities/disposition.js";
import GeneralEntity from "../entities/generalEntity.js";
import {InventoryPlugin} from "../plugins/inventory.js";

export class FightScene extends Phaser.Scene {
    private player: Player;
    private disposition: Disposition;
    private player2: Player;
    private player3: Player;
    private player4: Player;
    private map: Phaser.Tilemaps.Tilemap;
    private tileSet1: Phaser.Tilemaps.Tileset;
    private tileSet2: Phaser.Tilemaps.Tileset;
    private interfaceLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private characterInfoGroup: Phaser.GameObjects.Group;
    private enemiesGroup: Phaser.GameObjects.Group;
    private dispositionDisplayGroup: Phaser.GameObjects.Group;
    private turnOrderDisplayGroup: Phaser.GameObjects.Group;
    private actionInterfaceDisplayGroup: Phaser.GameObjects.Group;
    public inventory: InventoryPlugin;

    constructor() {
        super({key: 'Fight'});
    }

    public preload() {
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }

    public create() {
        this.map = this.make.tilemap({key: 'fight'});
        this.tileSet1 = this.map.addTilesetImage('[Base]BaseChip_pipo', 'base');
        this.tileSet2 = this.map.addTilesetImage('Interface', 'interface');

        const layer1 = this.map.createStaticLayer('Tile Layer 1', [this.tileSet1], 0, 0);
        const layer2 = this.map.createStaticLayer('Tile Layer 2', [this.tileSet1], 0, 0);
        const layer3 = this.map.createStaticLayer('Tile Layer 3', [this.tileSet1], 0, 0);
        this.characterInfoGroup = this.add.group();
        this.enemiesGroup = this.add.group();
        this.dispositionDisplayGroup = this.add.group();
        this.turnOrderDisplayGroup = this.add.group()
        this.actionInterfaceDisplayGroup = this.add.group();

        this.player = new Player(this, 0, 0);
        this.player2 = new Player(this, 0, 0);
        this.player3 = new Player(this, 0, 0);
        this.player4 = new Player(this, 0, 0);

        this.player.name = this.player.name + ' 1';
        this.player2.name = this.player2.name + ' 2';
        this.player3.name = this.player3.name + ' 3';
        this.player4.name = this.player4.name + ' 4';

        new Disposition(
            [this.player, this.player2, this.player3, this.player4],
            ['wildBoar', 'wildBoar', 'wildBoar', 'wildBoar'],
            'forrest',
            this);

        this.createAnimations();
    }

    public drawDisposition(disposition: Disposition) {
        this.dispositionDisplayGroup.clear(true, true);
        this.turnOrderDisplayGroup.clear(true, true);
        this.actionInterfaceDisplayGroup.clear(true, true);

        this.dispositionDisplayGroup.addMultiple([
            disposition.playerCharactersPositions.frontTop?.draw(this, 64 + 96 + 64, 32 + 128),
            disposition.playerCharactersPositions.backTop?.draw(this, 64, 32 + 128),
            disposition.playerCharactersPositions.frontBottom?.draw(this, 64 + 96 + 64, 32 + 96 + 96 + 128),
            disposition.playerCharactersPositions.backBottom?.draw(this, 64, 32 + 96 + 96 + 128),
        ]);

        this.dispositionDisplayGroup.addMultiple([
            disposition.enemyCharactersPositions.frontTop?.draw(this, 800 - 64 - 96 - 64 - 96, 32 + 128),
            disposition.enemyCharactersPositions.backTop?.draw(this, 800 - 64 - 96, 32 + 128),
            disposition.enemyCharactersPositions.frontBottom?.draw(this, 800 - 64 - 96 - 64 - 96, 32 + 96 + 96 + 128),
            disposition.enemyCharactersPositions.backBottom?.draw(this, 800 - 64 - 96, 32 + 96 + 96 + 128),
        ]);

        this.drawTurnOrder(disposition);

        disposition.currentCharacter.drawMakingTurnGraphics(this);
        disposition.currentCharacter.drawActionPoints(this);

        if (disposition.currentCharacter instanceof Player) {
            console.log('drawing player interface for', disposition.currentCharacter.name);
            this.drawActionInterface(disposition)
        }
    }

    private drawTurnOrder(disposition: Disposition) {
        this.turnOrderDisplayGroup.add(this.add.graphics()
            .fillStyle(0xf0d191, 0.5)
            .fillRect(16, 16, 64 * disposition.turnOrder.length, 64 + 16)
            .lineStyle(1, 0x000000)
            .strokeRect(16, 16, 64 * disposition.turnOrder.length, 64 + 16)
        );

        disposition.turnOrder.forEach((char, i) => {
            const charNameText = this.add.text(16 + 64 * i, 16 + 16 + 64, char.name, {
                backgroundColor: 'lightgrey',
                color: 'black'
            }).setVisible(false);
            const initiativeText = this.add.text(16 + 64 * i, 16, char.currentCharacteristics.attributes.initiative.toString(), {
                fixedWidth: 64,
                fixedHeight: 16,
                align: 'center',
                color: 'black'
            });
            initiativeText.setInteractive()
                .on('pointerover', (pointer, localX, localY, event) => charNameText.setText('Initiative').setVisible(true))
                .on('pointerout', (pointer, localX, localY, event) => charNameText.setVisible(false));
            this.turnOrderDisplayGroup.add(charNameText);
            this.turnOrderDisplayGroup.add(initiativeText);
            this.turnOrderDisplayGroup.create(16 + 64 * i, 32, char.spriteParams.texture, char.spriteParams.frame)
                .setOrigin(0, 0).setDisplaySize(64, 64).setInteractive()
                .on('pointerover', (pointer, localX, localY, event) => charNameText.setText(char.name).setVisible(true))
                .on('pointerout', (pointer, localX, localY, event) => charNameText.setVisible(false));
        });
    }

    private drawActionInterface(disposition) {
        this.drawEndTurnButton(disposition);
        let scene = this;
        const currentCharacter = disposition.currentCharacter;
        const availableActions = currentCharacter.availableActions;
        const actions = new PlayerActions();
        let actionsOfType = [0, 0, 0];
        let buttonX;
        let buttonY;
        availableActions.sort().forEach(actionId => {
            const action = actions.getActionById(actionId);
            if (action.phase.includes(disposition.currentPhase)) {
                if (action.type === 'physical') {
                    actionsOfType[0]++;
                    buttonX = 32;
                    buttonY = 500 + 30 * actionsOfType[0];
                }
                if (action.type === 'magical') {
                    actionsOfType[1]++;
                    buttonX = 32 + (800 - 64) / 3;
                    buttonY = 500 + 30 * actionsOfType[1];
                }
                if (action.type === 'misc') {
                    actionsOfType[2]++;
                    buttonX = 32 + (800 - 64) / 3 * 2;
                    buttonY = 500 + 30 * actionsOfType[2];
                }

                const button = this.drawActionInterfaceButton(action, buttonX, buttonY, currentCharacter);

                button.on('pointerdown', function () {
                    if (action.target === 'self') {
                        currentCharacter.battleImage.setDepth(2);
                        scene.add.sprite(currentCharacter.battleImage.getCenter().x, currentCharacter.battleImage.getCenter().y, 'player').setDepth(1)
                            .play('defense_up_animation').on('animationcomplete', function (currentAnim, currentFrame, sprite) {
                            currentCharacter.battleImage.setDepth(null);
                            sprite.destroy();
                            disposition.processAction(currentCharacter, currentCharacter, action);
                        });
                    }
                    if (action.target === 'enemy') {
                        this.setBackgroundColor('red');
                        console.log('starting enemy selection');
                        let overlay = scene.add.graphics()
                            .fillStyle(0x000000, 0.25)
                            .fillRect(0, 0, 800, 640);
                        let zone = scene.add.zone(0, 0, 800, 640).setOrigin(0, 0)
                            .setInteractive().once('pointerdown', () => {
                                console.log('zone is clicked');
                                overlay.destroy();
                                zone.destroy();
                                // @ts-ignore
                                Object.values(disposition.enemyCharactersPositions).forEach(enemy => enemy.battleImage.setDepth(0).off('pointerdown'));
                                this.setBackgroundColor('#f0d191');
                            });
                        Object.values(disposition.enemyCharactersPositions).forEach(enemy => {
                            // @ts-ignore
                            if (enemy.isAlive) {
                                // @ts-ignore
                                enemy.battleImage.off('pointerdown').setDepth(10).setInteractive().once('pointerdown', () => {
                                    console.log('pointerdown event arrived on enemy');
                                    overlay.destroy();
                                    zone.destroy();
                                    // @ts-ignore
                                    enemy.battleImage.setDepth(0);
                                    this.setBackgroundColor(null);
                                    // @ts-ignore
                                    Object.values(disposition.enemyCharactersPositions).forEach(enemy => enemy.battleImage.off('pointerdown'));
                                    disposition.processAction(currentCharacter, enemy, action);
                                })
                            }
                        });
                    }
                });
            }
        });
    }

    private drawActionInterfaceButton(action: Action, buttonX: number, buttonY: number, character: GeneralEntity) {
        const isAvailable = character.actionPoints[action.type] >= action.actionCost;
        const descriptionText = this.add.text(
            buttonX,
            buttonY,
            '',
            {font: '12px monospace', fill: '#000000', backgroundColor: 'lightgrey', wordWrap: {width: 245}}
        ).setOrigin(0, 1);
        this.actionInterfaceDisplayGroup.add(descriptionText);

        const actionText = this.make.text({
            x: buttonX,
            y: buttonY,
            text: action.actionName,
            style: {
                fixedWidth: 240,
                font: '22px monospace',
                color: '#000000',
                backgroundColor: isAvailable ? '#f0d191' : '#474747',
                padding: {
                    left: 2
                },
            },
        });
        if (isAvailable) {
            actionText.setInteractive()
                .on('pointerover', () => {
                    descriptionText.setText(action.actionDescription);
                })
                .on('pointerout', () => {
                    descriptionText.setText('');
                });
        }
        this.actionInterfaceDisplayGroup.add(actionText);

        const border = this.add.graphics();
        border.lineStyle(1, 0x000000, 1);
        border.strokeRectShape(actionText.getBounds());
        this.actionInterfaceDisplayGroup.add(border);

        let pointsDrawn = 0;
        const frames = {physical: 0, magical: 1, misc: 2};
        if (action.actionCost % 1 === 0.5) {
            this.actionInterfaceDisplayGroup.create(buttonX + 240 - 2, buttonY + 2, 'action-points', frames[action.type] + 3).setOrigin(1, 0);
            pointsDrawn++;
        }
        for (let i = 0; i < Math.trunc(action.actionCost); i++) {
            this.actionInterfaceDisplayGroup.create(buttonX + 240 - pointsDrawn * 16 - 2, buttonY + 2, 'action-points', frames[action.type]).setOrigin(1, 0);
            pointsDrawn++;
        }

        return actionText;
    }

    private drawEndTurnButton(disposition: Disposition) {
        const endTurnText = this.make.text({
            x: 800 / 2,
            y: 500,
            text: 'End Turn',
            style: {
                fixedWidth: 140,
                font: '22px monospace',
                color: '#000000',
                backgroundColor: '#8ef000',
                align: 'center',
            },
        }).setOrigin(0.5, 0.5).setInteractive();
        this.actionInterfaceDisplayGroup.add(endTurnText);

        const border = this.add.graphics();
        border.lineStyle(1, 0x000000, 1);
        border.strokeRectShape(endTurnText.getBounds());
        this.actionInterfaceDisplayGroup.add(border);

        endTurnText.once('pointerdown', () => {
            disposition.endTurn();
        })
    }

    private createAnimations() {
        this.anims.create({
            key: 'defense_up_animation',
            frames: this.anims.generateFrameNames('light-pillar'),
            duration: 500,
            showOnStart: true,
            hideOnComplete: true
        });
    }

    public update() {
        //this.player.update();
    }
}