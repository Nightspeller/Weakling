import { GeneralLocation } from "../generalLocation.js";
export class DungeonLevel1Scene extends GeneralLocation {
    constructor() {
        super({ key: 'DungeonLevel1' });
    }
    preload() {
        super.preload();
        this.load.audio('labyrinth-of-lost-dreams', ['assets/audio/labyrinth-of-lost-dreams.mp3', 'assets/audio/keys-for-success.ogg']);
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('dungeonLevel1');
        const bgMusic = this.sound.add('labyrinth-of-lost-dreams', { loop: true, volume: 0.1 });
        bgMusic['soundType'] = 'music';
        bgMusic.play();
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=dungeonLevel1.js.map