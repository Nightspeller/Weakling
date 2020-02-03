import { Adventurer } from "./adventurer.js";
export class Player extends Adventurer {
    constructor() {
        super();
        this.spriteParams = { texture: 'weakling', frame: null, width: 96, height: 96 };
        this.speed = 300; //TODO: village location experiences tile bleeding on other speeds, like 200 - need better fix for that..
        this.worldImageSpriteParams = { texture: 'martha-pink', frame: 1 };
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 10,
                intelligence: 10,
                initiative: 100
            },
            parameters: {
                health: 5,
                currentHealth: 1,
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
        this.addItemToInventory('rope-belt').currentSlot = 'belt';
        this.addItemToInventory('fancy-belt');
        this.addItemToInventory('allpowerful-necklace');
        this.addItemToInventory('minor-healing-potion');
        this.addItemToInventory('minor-healing-potion', 2);
        this.addItemToInventory('leather-armor').currentSlot = 'body';
        this.addItemToInventory('wooden-sword-weapon').currentSlot = 'rightHand';
        this.addItemToInventory('wooden-sword-weapon');
        this.addItemToInventory('rangers-hat');
        this.addItemToInventory('copper-pieces', 240);
        this.name = 'Weakling';
        this.availableActions = ['meditate', 'accessInventory', /*'drinkWeakHealthPotion', */ 'swiftMind', 'fireProtection', 'drainingSoil', 'setTrap', 'adjustArmor', 'warmUp', 'meleeAttack'];
        this.party = [this];
    }
    prepareWorldImage(scene, x, y) {
        const worldImage = scene.physics.add.sprite(x, y, this.worldImageSpriteParams.texture, this.worldImageSpriteParams.frame);
        worldImage.setOrigin(0, 0).setDepth(1);
        worldImage.anims.play("idle_down");
        const keys = scene.input.keyboard.addKeys('W,S,A,D,left,right,up,down,space');
        worldImage.body.setCollideWorldBounds(true);
        return { worldImage, keys };
    }
    update(worldImage, keys) {
        const up = keys.up.isDown || keys['W'].isDown;
        const down = keys.down.isDown || keys['S'].isDown;
        const right = keys.right.isDown || keys['D'].isDown;
        const left = keys.left.isDown || keys['A'].isDown;
        worldImage.body.setVelocity(0);
        if (this.lastCursor && !up && !down && !right && !left) {
            worldImage.play(`idle_${this.lastCursor}`, true);
        }
        if (up) {
            worldImage.body.setVelocityY(-this.speed);
        }
        else if (down) {
            worldImage.body.setVelocityY(this.speed);
        }
        if (right) {
            worldImage.body.setVelocityX(this.speed);
        }
        else if (left) {
            worldImage.body.setVelocityX(-this.speed);
        }
        if (up || (up && right) || (up && left)) {
            worldImage.play('walk_up', true);
            this.lastCursor = 'up';
        }
        else if (down || (down && right) || (down && left)) {
            worldImage.play('walk_down', true);
            this.lastCursor = 'down';
        }
        if (right && !up && !down) {
            worldImage.play('walk_right', true);
            this.lastCursor = 'right';
        }
        else if (left && !up && !down) {
            worldImage.play('walk_left', true);
            this.lastCursor = 'left';
        }
    }
}
export const playerInstance = new Player();
//# sourceMappingURL=player.js.map