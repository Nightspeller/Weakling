class GameOver extends Phaser.Scene {

    constructor() {
        super({key: 'GameOver'});
    }

    preload() {
    }

    create() {
        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);


        this.anims.create({
            key: "carrier",
            frames: [
                {key: 'carrier1'},
                {key: 'carrier2'}
            ],
            frameRate: 1,
            repeat: -1
        });

        [1, 2, 3, 4, 5, 6].map((i) => {
            this.anims.create({
                key: "sprExplosion" + i,
                frames: this.anims.generateFrameNumbers("sprExplosion" + i),
                frameRate: 20,
                repeat: 0
            });
        });

        this.enemy = new CarrierShip(
            this,
            game.config.width/2,
            game.config.height/2
        )

        this.laser = new PlayerLaser(this,0, game.config.height/1.5);

        this.physics.add.collider(this.laser, this.enemy, function (playerLaser, enemy) {
            if (!enemy.getData("isDead")) {
                enemy.explode(true);
               // playerLaser.destroy();
            }
        });
    }

    update() {
        /*this.enemy.update();
        this.laser.update();*/
    }
}