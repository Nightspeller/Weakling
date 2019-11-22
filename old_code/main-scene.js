class MainScene extends Phaser.Scene {

    constructor() {
        super({key: 'MainScene'});
    }

    preload() {
    }

    create() {
        [1, 2, 3, 4, 5, 6].map((i) => {
            this.anims.create({
                key: "sprExplosion" + i,
                frames: this.anims.generateFrameNumbers("sprExplosion" + i),
                frameRate: 20,
                repeat: 0
            });
        });
        this.anims.create({
            key: "carrier",
            frames: [
                {key: 'carrier1'},
                {key: 'carrier2'}
            ],
            frameRate: 1,
            repeat: -1
        });
        this.sfx = {
            explosions: this.sound.add("sndExplode"),
            laser: [this.sound.add("sndLaserEnemy")]
        };
        this.backgrounds = [];
        for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
            var bg = new ScrollingBackground(this, "sprBg0", i * 10);
            this.backgrounds.push(bg);
        }
        this.player = new Player(
            this,
            this.game.config.width * 0.25,
            this.game.config.height * 0.5,
            "resolute"
        );

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                let enemy = null;
                switch (Phaser.Math.Between(0, 2)) {
                    case 0:
                        enemy = new GunShip(
                            this,
                            game.config.width + 100,
                            Phaser.Math.Between(0, this.game.config.width),
                        );
                        break;
                    case 1:
                        enemy = new ChaserShip(
                            this,
                            game.config.width + 100,
                            Phaser.Math.Between(0, this.game.config.height)
                        );
                        break;
                    case 2:
                        enemy = new CarrierShip(
                            this,
                            game.config.width + 100,
                            Phaser.Math.Between(0, this.game.config.height),
                            0
                        );
                        break;
                }
                this.enemies.add(enemy);
            },
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
            if (!enemy.getData("isDead")) {
                enemy.explode(true);
                playerLaser.destroy();
            }
        });

        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            if (!player.getData("isDead") && !enemy.getData("isDead")) {
                enemy.explode(true);
                if (player.data.shields === 1) {
                    player.explode(false);
                    this.scene.start("GameOver");
                } else {
                    player.data.shields--;
                }
            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
            if (!player.getData("isDead") && !laser.getData("isDead")) {
                laser.destroy();
                if (player.data.shields === 1) {
                    player.explode(false);
                    this.scene.start("GameOver");
                } else {
                    player.data.shields--;
                }
            }
        });

        this.energyText = this.add.text(10, 10,
            `Energy on: Shields - ${this.player.data.shieldEnergy}, Weapons - ${this.player.data.weaponEnergy}, Engines - ${this.player.data.engineEnergy}`,
            {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#ff0000',
            align: 'center'
        });
        this.shiledsText = this.add.text(10, 30, "Available shields: " + this.player.data.shields, {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#ff0000',
            align: 'center'
        });
    }

    update() {
        if (!this.player.getData("isDead")) {
            this.player.update();
            this.shiledsText.setText('Shields: '+this.player.data.shields);
            this.energyText.setText(`Energy on: shields - ${this.player.data.shieldEnergy}, weapons - ${this.player.data.weaponEnergy}, engines - ${this.player.data.engineEnergy}`,)
        }
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            const enemy = this.enemies.getChildren()[i];
            enemy.update();
            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth + 100 ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
                //if (enemy) {
                    enemy.destroy();
                //}
            }
        }

        this.enemyLasers.getChildren().forEach(enemyLaser => enemyLaser.update());
        this.playerLasers.getChildren().forEach(playerLaser => playerLaser.update());
        this.backgrounds.forEach(bg => bg.update());
    }
}