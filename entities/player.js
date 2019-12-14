import GeneralEntity from "./generalEntity.js";
/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player extends GeneralEntity {
    constructor(scene, x, y) {
        super();
        this.scene = scene;
        this.createAnimations();
        this.worldImage = scene.physics.add.sprite(x, y, "martha", 1).setOrigin(0, 0);
        this.spriteParams = { texture: 'weakling', frame: null };
        this.worldImage.anims.play("idle_down");
        this.keys = scene.input.keyboard.createCursorKeys();
        this.speed = 200;
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 10,
                intelligence: 10,
                initiative: Phaser.Math.Between(0, 30)
            },
            parameters: {
                health: 5,
                currentHealth: 5,
                manna: 5,
                currentManna: 5,
                energy: 10,
                currentEnergy: 10,
            },
            defences: {
                armor: 10,
                dodge: 10,
                fireResistance: 10,
                coldResistance: 10,
                acidResistance: 10,
                electricityResistance: 10,
                poisonResistance: 10,
                magicResistance: 10,
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
                cape: null,
                gloves: null,
                belt: 'rope',
                tail: null,
                pants: null,
                boots: null
            }
        };
        this.actionPoints = {
            physical: 0,
            magical: 0,
            misc: 0
        };
        this.name = 'Weakling';
        this.availableActions = ['meditate', 'accessInventory', 'drinkWeakHealthPotion', 'swiftMind', 'fireProtection', 'drainingSoil', 'setTrap', 'adjustArmor', 'warmUp', 'meleeAttack'];
        this.currentEffects = [];
    }
    createAnimations() {
        const anims = this.scene.anims;
        anims.create({
            key: 'walk_down',
            frames: anims.generateFrameNames('martha', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'walk_up',
            frames: anims.generateFrameNames('martha', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'walk_right',
            frames: anims.generateFrameNames('martha', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'walk_left',
            frames: anims.generateFrameNames('martha', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle_up',
            frames: [{ key: 'martha', frame: 10 }],
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle_down',
            frames: [{ key: 'martha', frame: 1 }],
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle_left',
            frames: [{ key: 'martha', frame: 4 }],
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle_right',
            frames: [{ key: 'martha', frame: 7 }],
            frameRate: 10,
            repeat: -1
        });
    }
    startRound(roundType) {
        this.actionPoints.physical + 1 <= 3 ? this.actionPoints.physical++ : this.actionPoints.physical = 3;
        this.actionPoints.magical + 1 <= 3 ? this.actionPoints.magical++ : this.actionPoints.magical = 3;
        this.actionPoints.misc + 1 <= 3 ? this.actionPoints.misc++ : this.actionPoints.misc = 3;
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
        }
        else if (this.keys.down.isDown) {
            this.worldImage.body.setVelocityY(this.speed);
            this.worldImage.play('walk_down', true);
            this.lastCursor = 'down';
        }
        else {
            this.worldImage.body.setVelocityY(0);
        }
        if (this.keys.right.isDown) {
            this.worldImage.body.setVelocityX(this.speed);
            this.worldImage.play('walk_right', true);
            this.lastCursor = 'right';
        }
        else if (this.keys.left.isDown) {
            this.worldImage.body.setVelocityX(-this.speed);
            this.worldImage.play('walk_left', true);
            this.lastCursor = 'left';
        }
        else {
            this.worldImage.body.setVelocityX(0);
        }
    }
    destroy() {
        this.worldImage.destroy();
    }
}
//# sourceMappingURL=player.js.map