class Player extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");
        this.setData("speed", 200);
        this.setScale(-0.75);
        this.body.collideWorldBounds = true;
        this.setData("isShooting", false);
        this.data.timerShootDelay = 10;
        this.setData("timerShootTick", this.data.timerShootDelay - 1);
        this.data.shieldEnergy = 32;
        this.data.weaponEnergy = 34;
        this.data.engineEnergy = 34;
        this.data.shields = 5;
        this.focusEnergy('shield');
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key3 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.playerLazerSound = this.scene.sound.add("sndLaserPlayer")
    }

    moveUp() {
        this.body.velocity.y = -this.getData("speed");
    }

    moveDown() {
        this.body.velocity.y = this.getData("speed");
    }

    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }

    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    focusEnergy(energyTo) {
        switch (energyTo) {
            case 'shield':
                if (this.data.shieldEnergy + 2 <= 100) {
                    this.data.shieldEnergy += 2;
                    if ((this.data.weaponEnergy - 1 >= 0) && (this.data.engineEnergy - 1 >= 0)) {
                        this.data.weaponEnergy -= 1;
                        this.data.engineEnergy -= 1;
                    } else if (this.data.weaponEnergy - 2 >= 0) {
                        this.data.weaponEnergy -= 2;
                    } else {
                        this.data.engineEnergy -= 2;
                    }
                }
                break;
            case 'weapon':
                if (this.data.weaponEnergy + 2 <= 100) {
                    this.data.weaponEnergy += 2;
                    if ((this.data.shieldEnergy - 1 >= 0) && (this.data.engineEnergy - 1 >= 0)) {
                        this.data.shieldEnergy -= 1;
                        this.data.engineEnergy -= 1;
                    } else if (this.data.shieldEnergy - 2 >= 0) {
                        this.data.shieldEnergy -= 2;
                    } else {
                        this.data.engineEnergy -= 2;
                    }
                }
                break;
            case 'engine':
                if (this.data.engineEnergy + 2 <= 100) {
                    this.data.engineEnergy += 2;
                    if ((this.data.shieldEnergy - 1 >= 0) && (this.data.weaponEnergy - 1 >= 0)) {
                        this.data.shieldEnergy -= 1;
                        this.data.weaponEnergy -= 1;
                    } else if (this.data.shieldEnergy - 2 >= 0) {
                        this.data.shieldEnergy -= 2;
                    } else {
                        this.data.weaponEnergy -= 2;
                    }
                }
                break;
            default:
                console.log('wrong parameter passed to focusEnergy');
                break;
        }
        if (this.data.shieldTimer) this.data.shieldTimer.remove(false);
        this.data.shieldTimer = this.scene.time.addEvent({
            delay: 1000 + 5000 * (1 - this.data.shieldEnergy / 100),
            callback: () => {
                if (this.data.shields < 10) this.data.shields++;
            },
            callbackScope: this,
            loop: true
        });
        this.data.timerShootDelay = 5 + 20 - 20 * this.data.weaponEnergy / 100;
        this.setScale(0.75 - 0.5 * this.data.engineEnergy / 100);
    }

    update() {
        this.body.setVelocity(0, 0);

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.data.timerShootDelay) {
                this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            } else { // when the "manual timer" is triggered:
                let laser = new PlayerLaser(this.scene, this.x, this.y);
                this.scene.playerLasers.add(laser);

                this.playerLazerSound.play(); // play the laser sound effect
                this.setData("timerShootTick", 0);
            }
        }
        if (this.keyW.isDown) {
            this.moveUp();
        } else if (this.keyS.isDown) {
            this.moveDown();
        }
        if (this.keyA.isDown) {
            this.moveLeft();
        } else if (this.keyD.isDown) {
            this.moveRight();
        }
        if (this.keySpace.isDown) {
            this.setData("isShooting", true);
        } else {
            this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
            this.setData("isShooting", false);
        }
        if (this.key1.isDown) {
            this.focusEnergy('shield')
        }
        if (this.key2.isDown) {
            this.focusEnergy('weapon')
        }
        if (this.key3.isDown) {
            this.focusEnergy('engine')
        }
    }
}

class PlayerLaser extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "sprLaserPlayer");
        this.body.velocity.x = 200;
        this.angle = 90;
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);
        //console.log('preUpdate laser');
        if (this.x < -this.displayWidth ||
            this.x > this.scene.game.config.width + this.displayWidth ||
            this.y < -this.displayHeight * 4 ||
            this.y > this.scene.game.config.height + this.displayHeight) {
            this.destroy();
        }
    }

    update() {

    }
}