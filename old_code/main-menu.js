class MainMenu extends Phaser.Scene {

    constructor() {
        super({key: 'MainMenu'});
    }

    preload() {
    }

    create() {
        this.add.text(this.game.config.width * 0.5, 100, "Serg Nights", {
            fontFamily: 'monospace',
            fontSize: 24,
            color: '#c0c0c0',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(this.game.config.width * 0.5, 120, "presents", {
            fontFamily: 'monospace',
            fontSize: 12,
            color: '#c0c0c0',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(this.game.config.width * 0.5, 200, "Star Journey", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#c0c0c0',
            align: 'center'
        }).setOrigin(0.5);
        let startText = this.add.text(this.game.config.width * 0.5, 350, "BEGIN", {
            fontFamily: 'monospace',
            fontSize: 60,
            fontStyle: 'bold',
            color: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);
        startText.setInteractive();
        startText.on('pointerup',() => this.scene.start("GameOver"));
        startText.on('pointerover',() => startText.setColor('#c0c0c0'));
        startText.on('pointerout',() => startText.setColor('#ff0000'));

        this.points = [];
        this.stars = this.add.group();
        this.maxDepth = 32;

        for (let i = 0; i < 200; i++) {
            this.points.push({
                x: Phaser.Math.Between(-25, 25),
                y: Phaser.Math.Between(-25, 25),
                z: Phaser.Math.Between(1, this.maxDepth)
            });
        }
    }

    update() {
        this.stars.clear(true, true);
        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            point.z -= 0.2;
            if (point.z <= 0) {
                point.x = Phaser.Math.Between(-25, 25);
                point.y = Phaser.Math.Between(-25, 25);
                point.z = this.maxDepth;
            }
                let px = point.x * (128 / point.z) + (this.game.config.width * 0.5);
                let py = point.y * (128 / point.z) + (this.game.config.height * 0.5);

            let circle = new Phaser.Geom.Circle(
                px,
                py,
                (1 - point.z / 32) * 2
            );
            let graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
            graphics.setAlpha((1 - point.z / 32));
            graphics.fillCircleShape(circle);
            this.stars.add(graphics);
        }
    }
}