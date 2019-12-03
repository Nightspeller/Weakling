/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, "solider", 1).setOrigin(0, 0);
        this.characteristics = {
            attributes: {
                strength: '1',
                agility: '1',
                intelligence: '1'
            },
            parameters: {
                health: '1',
                currentHealth: '1',
                manna: '1',
                currentManna: '1',
                energy: '1',
                currentEnergy: '1'
            },
            defences: {
                armor: '1',
                dodge: '1',
                resistance: {
                    fire: '1',
                    cold: '1',
                    acid: '1',
                    electricity: '1',
                    poison: '1',
                    magic: '1'
                }
            }
        };
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
                body: null,
                gloves: null,
                belt: null,
                tail: null,
                pants: null,
                boots: null
            }
        };
    }
    freeze() {
        this.sprite.body.moves = false;
    }
    update() {
    }
    destroy() {
        this.sprite.destroy();
    }
}
//# sourceMappingURL=enemy.js.map