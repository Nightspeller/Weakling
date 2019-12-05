import GeneralEntity from "./generalEntity.js";
/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player extends GeneralEntity{
    private scene: Phaser.Scene;
    private readonly keys: Phaser.Types.Input.Keyboard.CursorKeys;
    private lastCursor: string;
    public speed: number;
    public inventory: { equipped: { leftHand: string; rightHand: string; pants: null; belt: null; tail: null; ringRight2: null; ringRight1: null; body: null; neck2: null; neck1: null; head: null; gloves: null; backpack: null; ringLeft2: null; boots: null; ringLeft1: null }; backpack: any[] };

    constructor(scene, x, y) {
        super();
        this.scene = scene;
        this.createAnimations();
        this.worldImage = scene.physics.add.sprite(x, y, "player", 1).setOrigin(0, 0);
        this.spriteParams = {texture: 'weakling', frame: null};
        this.worldImage.anims.play("idle_down");
        this.keys = scene.input.keyboard.createCursorKeys();
        this.speed = 200;
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 10,
                intelligence: 10,
                initiative: Phaser.Math.Between(0,30)
            },
            parameters: {
                health: 100,
                currentHealth: 100,
                manna: 25,
                currentManna: 25,
                energy: 50,
                currentEnergy: 50,
            },
            defences: {
                armor: 10,
                dodge: 10,
                resistance: {
                    fire: 10,
                    cold: 10,
                    acid: 10,
                    electricity: 10,
                    poison: 10,
                    magic: 10,
                }
            }
        };
        this.currentCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
        this.inventory = {
            backpack: [],
            equipped: {
                head: null,
                neck1: null,
                neck2: null,
                backpack: null,
                ringLeft1: null,
                ringLeft2: null,
                ringRight1: null,
                ringRight2: null,
                leftHand: 'fist',
                rightHand: 'fist',
                body: null,
                gloves: null,
                belt: null,
                tail: null,
                pants: null,
                boots: null
            }
        };
        this.actionPoints = {
            physical: 3,
            magical: 3,
            misc: 3
        };
        this.name = 'Weakling';

        this.availableActions = ['meditate', 'inspectEnemy', 'drinkWeakHealthPotion', 'swiftMind', 'fireProtection', 'drainingSoil', 'setTrap', 'adjustArmor', 'warmUp', 'meleeAttack'];

        this.currentEffects = [];
    }

    createAnimations() {
        const anims = this.scene.anims;
        anims.create({
            key: 'walk_down',
            frames: anims.generateFrameNames('player', {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'walk_up',
            frames: anims.generateFrameNames('player', {start: 9, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'walk_right',
            frames: anims.generateFrameNames('player', {start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'walk_left',
            frames: anims.generateFrameNames('player', {start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle_up',
            frames: [{key: 'player', frame: 10}],
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle_down',
            frames: [{key: 'player', frame: 1}],
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle_left',
            frames: [{key: 'player', frame: 4}],
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle_right',
            frames: [{key: 'player', frame: 7}],
            frameRate: 10,
            repeat: -1
        });
    }

    freeze() {
        this.worldImage.body.moves = false;
    }

    update() {
        if (this.lastCursor
            && !this.keys.up.isDown && !this.keys.down.isDown
            && !this.keys.left.isDown && !this.keys.right.isDown)
            this.worldImage.play(`idle_${this.lastCursor}`, true);

        if (this.keys.up.isDown) {
            this.worldImage.body.setVelocityY(-this.speed);
            this.worldImage.play('walk_up', true);
            this.lastCursor = 'up';
        } else if (this.keys.down.isDown) {
            this.worldImage.body.setVelocityY(this.speed);
            this.worldImage.play('walk_down', true);
            this.lastCursor = 'down';
        } else {
            this.worldImage.body.setVelocityY(0);
        }

        if (this.keys.right.isDown) {
            this.worldImage.body.setVelocityX(this.speed);
            this.worldImage.play('walk_right', true);
            this.lastCursor = 'right';
        } else if (this.keys.left.isDown) {
            this.worldImage.body.setVelocityX(-this.speed);
            this.worldImage.play('walk_left', true);
            this.lastCursor = 'left';
        } else {
            this.worldImage.body.setVelocityX(0);
        }
    }

    destroy() {
        this.worldImage.destroy();
    }


}
