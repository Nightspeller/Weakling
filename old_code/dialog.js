class Dialog extends Phaser.Scene {

    constructor() {
        super({key: 'Dialog'});
    }

    preload() {
    }

    create() {
        this.face = this.add.image(300, 300, 'face');
    }

}