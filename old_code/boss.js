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

class BossLaser extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "sprLaserEnemy0");
        this.body.velocity.x = -200;
        this.angle = 90;
    }
}