import {GeneralLocation} from "./generalLocation.js";

export class HargkakhsCaveScene extends GeneralLocation {
    private chest: Phaser.Physics.Arcade.Image;

    constructor() {
        super({key: 'HargkakhsCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('hargkakhsCave');
    }

    public update() {
        super.update();
    }
}
