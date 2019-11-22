class ChaserShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "chaser", "ChaserShip");
        this.body.velocity.x = -Phaser.Math.Between(50, 100);
        this.states = {
            MOVE_DOWN: "MOVE_DOWN",
            CHASE: "CHASE"
        };
        this.state = this.states.MOVE_DOWN;
        this.setScale(0.3);
    }

    update() {
        if (!this.getData("isDead") && this.scene.player) {
            if (Phaser.Math.Distance.Between(
                this.x,
                this.y,
                this.scene.player.x,
                this.scene.player.y
            ) < 320) {
                this.state = this.states.CHASE;
            }
            if (this.state === this.states.CHASE) {
                let dx = this.scene.player.x - this.x;
                let dy = this.scene.player.y - this.y;
                let angle = Math.atan2(dy, dx);
                let speed = 100;
                this.body.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
            }
            this.angle += 5;
        }
    }
}

class GunShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "gunShip", "GunShip");
        this.setScale(0.5);
        this.body.velocity.x = -Phaser.Math.Between(50, 100);
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function () {
                let laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y
                );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
        this.on('destroy', () => {
            this.shootTimer.remove(false);
        })
    }
}

class CarrierShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "carrier1", "CarrierShip");
        //this.body.velocity.x = -Phaser.Math.Between(50, 100);
        //this.setScale(0.4);
        this.play('carrier');

        setTimeout(() => {
            this.setTexture("sprExplosion1");  // this refers to the same animation key we used when we added this.anims.create previously
            this.play('sprExplosion1'); // play the animation
            this.setDisplaySize(2, 1);
        }, 1000)
        /*this.on('animationcomplete', () => {
            console.log('here3');
            this.setDisplaySize(32, 32)
            this.setTexture('carrier1');  // this refers to the same animation key we used when we added this.anims.create previously
            this.setDisplaySize(32, 32)

        });*/
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        //console.log('preUpdate carrier');
        if (this.x < -this.displayWidth ||
            this.x > this.scene.game.config.width + this.displayWidth ||
            this.y < -this.displayHeight * 4 ||
            this.y > this.scene.game.config.height + this.displayHeight) {
            this.destroy();
        }
    }

    update() {
        console.log('updating carrier');
    }

    explode(canDestroy) {
        if (!this.getData("isDead")) {
            // Set the texture to the explosion image, then play the animation
            const randomExplosion = "sprExplosion1";// + Phaser.Math.Between(1, 6);
            this.setTexture(randomExplosion);  // this refers to the same animation key we used when we added this.anims.create previously
            //this.anims.setTimeScale(1);
            //this.displayHeight = 2;
            //this.displayWidth = 64;

            console.log('here1');


            console.log('here2');
            this.play(randomExplosion); // play the animation
            /*this.on('animationcomplete', () => {
                console.log('here3');
                if (canDestroy) {
                    console.log('here3.4');
                    this.destroy();
                } else {
                    this.setVisible(false);
                }
            });*/
            console.log('here4');
            //this.scene.sfx.explosions.play();
            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                    this.shootTimer.remove(false);
                }
            }
            this.setAngle(0);
            this.body.setVelocity(0, 0);

            this.setData("isDead", true);
        }
    }
}

class EnemyLaser extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "sprLaserEnemy0");
        this.body.velocity.x = -200;
        this.angle = 90;
    }

    update() {
        if (this.x < -this.displayWidth ||
            this.x > this.scene.game.config.width + this.displayWidth ||
            this.y < -this.displayHeight * 4 ||
            this.y > this.scene.game.config.height + this.displayHeight) {
            this.destroy();

        }
    }
}