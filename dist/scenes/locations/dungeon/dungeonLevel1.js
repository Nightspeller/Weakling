define(["require", "exports", "../generalLocation"], function (require, exports, generalLocation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DungeonLevel1Scene extends generalLocation_1.default {
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
            // bgMusic.soundType = 'music';
            bgMusic.play();
        }
        update() {
            super.update();
        }
    }
    exports.default = DungeonLevel1Scene;
});
//# sourceMappingURL=dungeonLevel1.js.map