class ScrollingBackground {
    constructor(scene, key, velocityX) {
        this.scene = scene;
        this.key = key;
        this.velocityX = velocityX;
        this.layers = this.scene.add.group();
        this.createLayers();
    }

    createLayers() {
        for (let i = 0; i < 2; i++) {
            // creating two backgrounds will allow a continuous scroll
            let layer = this.scene.add.sprite(0, 0, this.key);
            layer.setDisplaySize(game.config.width * 2, game.config.height * 2);
            layer.x = game.config.width * i + Phaser.Math.Between(0, 100*this.velocityX);
            layer.setFlip(Math.random() >= 0.5, Math.random() >= 0.5);
            layer.setDepth(-5 - (i - 1));
            this.scene.physics.world.enableBody(layer, 0, 0);
            layer.body.velocity.x = -this.velocityX;
            this.layers.add(layer);
        }
    }

    update() {
        this.layers.getChildren().forEach(layer => {
            if (layer.x + game.config.width < 0) {
                layer.x = game.config.width * 2;
            }
        })
    }
}