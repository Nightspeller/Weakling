import Player from "../entities/player.js";
import Sprite = Phaser.Physics.Arcade.Sprite;
import {PlayerActions} from "../actionsAndEffects/playerActions.js";
import {Disposition} from "../entities/disposition.js";

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

    constructor() {
        super({key: 'Fight'});
    }

    public preload() {
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

        this.player.name = this.player.name + 1;
        this.player2.name = this.player2.name + 2;
        this.player3.name = this.player3.name + 3;
        this.player4.name = this.player4.name + 4;

        this.disposition = new Disposition(
            [this.player, this.player2, this.player3, this.player4],
            ['wildBoar', 'wildBoar', 'wildBoar', 'wildBoar'],
            'forrest');

        this.startRound();
    }

    private startRound() {
        console.log('Starting new round on the scene');
        this.disposition.startRound();
        this.startTurn(this.disposition.turnOrder[0]);
    }

    private startTurn(character) {
        console.log('Starting new TURN on the scene');
        this.dispositionDisplayGroup.clear(true, true);
        this.turnOrderDisplayGroup.clear(true, true);
        this.actionInterfaceDisplayGroup.clear(true, true);
        this.drawDisposition(this.disposition);
        if (character instanceof Player) {
            console.log('drawing player interface for', character.name);
            this.drawActionInterface(character)
        } else {
            this.disposition.aiTurn();
            this.endTurn();
        }
    }

    private endTurn() {
        console.log('Ending TURN on the scene');
        this.disposition.turnOrder[0].actedThisRound = true;
        this.disposition.turnOrder.shift();
        if (this.disposition.turnOrder.length !== 0) {
            this.startTurn(this.disposition.turnOrder[0])
        } else {
            // start new round
            console.log('Turn order is empty');
            this.startRound();
        }
    }

    private drawDisposition(disposition) {
        this.dispositionDisplayGroup.addMultiple([disposition.playerCharactersPositions.frontTop?.draw(this, 64 + 96 + 64, 32 + 128)
            .setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
            .on('pointerdown', (pointer, localX, localY, event) => disposition.playerCharactersPositions.frontTop.drawEntityInfo(this, 64 + 96 + 64 + 64, 32)),
            disposition.playerCharactersPositions.backTop?.draw(this, 64, 32 + 128)
                .setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
                .on('pointerdown', (pointer, localX, localY, event) => disposition.playerCharactersPositions.backTop.drawEntityInfo(this, 64 + 64, 32)),
            disposition.playerCharactersPositions.frontBottom?.draw(this, 64 + 96 + 64, 32 + 96 + 64 + 128)
                .setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
                .on('pointerdown', (pointer, localX, localY, event) => disposition.playerCharactersPositions.frontBottom.drawEntityInfo(this, 64 + 96 + 64 + 64, 32)),
            disposition.playerCharactersPositions.backBottom?.draw(this, 64, 32 + 96 + 64 + 128)
                .setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
                .on('pointerdown', (pointer, localX, localY, event) => disposition.playerCharactersPositions.backBottom.drawEntityInfo(this, 64 + 64, 32))
        ]);

        this.dispositionDisplayGroup.addMultiple([
            disposition.enemyCharactersPositions.frontTop?.draw(this, 800 - 64 - 96 - 64 - 96, 32 + 128)
                .setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
                .on('pointerdown', (pointer, localX, localY, event) => disposition.enemyCharactersPositions.frontTop.drawEntityInfo(this, 64 + 64 + 64, 32)),
            disposition.enemyCharactersPositions.backTop?.draw(this, 800 - 64 - 96, 32 + 128)
                .setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
                .on('pointerdown', (pointer, localX, localY, event) => disposition.enemyCharactersPositions.backTop.drawEntityInfo(this, 64 + 96 + 64 + 64 + 64, 32)),
            disposition.enemyCharactersPositions.frontBottom?.draw(this, 800 - 64 - 96 - 64 - 96, 32 + 96 + 64 + 128)
                .setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
                .on('pointerdown', (pointer, localX, localY, event) => disposition.enemyCharactersPositions.frontBottom.drawEntityInfo(this, 64 + 64 + 64, 32)),
            disposition.enemyCharactersPositions.backBottom?.draw(this, 800 - 64 - 96, 32 + 96 + 64 + 128)
                .setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
                .on('pointerdown', (pointer, localX, localY, event) => disposition.enemyCharactersPositions.backBottom.drawEntityInfo(this, 64 + 96 + 64 + 64 + 64, 32)),
        ])
        ;

        this.turnOrderDisplayGroup.add(this.add.graphics()
            .fillStyle(0xf0d191, 0.5)
            .fillRect(16, 32, 64 * disposition.turnOrder.length, 64)
            .lineStyle(1, 0x000000)
            .strokeRect(16, 32, 64 * disposition.turnOrder.length, 64));

        disposition.turnOrder.forEach((char, i) => {
            this.turnOrderDisplayGroup.add(this.add.image(16 + 64 * i, 32, char.spriteParams.texture, char.spriteParams.frame).setOrigin(0, 0).setDisplaySize(64, 64));
        });

        this.dispositionDisplayGroup.add(this.add.graphics()
            .lineStyle(1, 0xff0000)
            .strokeRectShape(disposition.turnOrder[0].battleImage.getBounds()));
    }

    private drawActionInterface(currentPlayerCharacter) {
        let scene = this;
        const availableActions = currentPlayerCharacter.availableActions;
        const actions = new PlayerActions();
        let skillsInCategory = [0, 0, 0];
        let skillPositionX;
        let skillPositionY;
        availableActions.sort().forEach((actionId, i) => {
            const action = actions.getActionById(actionId);
            if (action.phase.includes(this.disposition.currentPhase)) {
                if (action.type === 'physical') {
                    skillsInCategory[0]++;
                    skillPositionX = 32;
                    skillPositionY = 500 + 30 * skillsInCategory[0];
                }
                if (action.type === 'magic') {
                    skillsInCategory[1]++;
                    skillPositionX = 32 + (800 - 64) / 3;
                    skillPositionY = 500 + 30 * skillsInCategory[1];
                }
                if (action.type === 'misc') {
                    skillsInCategory[2]++;
                    skillPositionX = 32 + (800 - 64) / 3 * 2;
                    skillPositionY = 500 + 30 * skillsInCategory[2];
                }
                const actionText = this.make.text({
                    x: skillPositionX,
                    y: skillPositionY,
                    text: action.actionName,
                    style: {
                        font: '20px monospace',
                        fill: '#000000'
                    },
                });
                this.actionInterfaceDisplayGroup.add(actionText);
                actionText.setInteractive().once('pointerdown', function () {
                    if (action.target === 'self') {
                        scene.disposition.processAction(currentPlayerCharacter, currentPlayerCharacter, action);
                        scene.endTurn();
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
                                Object.values(scene.disposition.enemyCharactersPositions).forEach(enemy => enemy.battleImage.setDepth(0).off('pointerdown'));
                                this.setBackgroundColor(null);
                            });
                        Object.values(scene.disposition.enemyCharactersPositions).forEach(enemy => {
                            // @ts-ignore
                            enemy.battleImage.off('pointerdown').setDepth(10).setInteractive().once('pointerdown', () => {
                                console.log('pointerdown event arrived on enemy', this);
                                overlay.destroy();
                                zone.destroy();
                                // @ts-ignore
                                enemy.battleImage.setDepth(0);
                                this.setBackgroundColor(null);
                                // @ts-ignore
                                Object.values(scene.disposition.enemyCharactersPositions).forEach(enemy => enemy.battleImage.off('pointerdown'));
                                scene.disposition.processAction(currentPlayerCharacter, enemy, action);
                                scene.endTurn();
                            })
                        });
                    }
                });
            }
        })
    }

    public update() {
        //this.player.update();
    }
}