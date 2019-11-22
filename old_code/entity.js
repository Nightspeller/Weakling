class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }

    /*explode(canDestroy) {
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
            /!*this.on('animationcomplete', () => {
                console.log('here3');
                if (canDestroy) {
                    console.log('here3.4');
                    this.destroy();
                } else {
                    this.setVisible(false);
                }
            });*!/
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
    }*/
}