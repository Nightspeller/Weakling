class Boot extends Phaser.Scene {

    constructor() {
        super({key: 'Boot'});
    }

    preload() {
        this.load.image('resolute', 'assets/resolute.svg');

        this.load.image('gunShip', 'assets/images/enemies/cannon.svg');
        this.load.image('carrier1', 'assets/images/enemies/boss1.svg');
        this.load.image('carrier2', 'assets/images/enemies/boss1_launch.svg');

        this.load.image('sprLaserEnemy0', 'assets/sprLaserEnemy.png');
        this.load.image('sprLaserPlayer', 'assets/sprLaserPlayer.png');

        this.load.image("sprBg0", "assets/images/backgrounds/sprBg0.png");
        this.load.image("sprBg1", "assets/images/backgrounds/sprBg1.png");
        this.load.spritesheet("sprExplosion1", "assets/images/explosions/explosion-1.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprExplosion2", "assets/images/explosions/explosion-2.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprExplosion3", "assets/images/explosions/explosion-3.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprExplosion4", "assets/images/explosions/explosion-4.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprExplosion5", "assets/images/explosions/explosion-5.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprExplosion6", "assets/images/explosions/explosion-6.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image("chaser", "assets/cannon_carriage.svg");
        this.load.image("sprLaserEnemy", "assets/sprLaserEnemy.png");
        this.load.image("sprLaserPlayer", "assets/sprLaserPlayer.png");

        this.load.audio("sndExplode", "assets/sndExplode.wav");
        this.load.audio("sndLaserEnemy", "assets/sndLaserEnemy.wav");
        this.load.audio("sndLaserPlayer", "assets/sndLaserPlayer.wav");
    }

    create() {
        this.scene.start("MainMenu");
    }
}