define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function preloadAudioAssets(preloadScene) {
        // Audio
        preloadScene.load.audio('intro', ['assets/audio/intro.ogg', 'assets/audio/intro.mp3']);
        preloadScene.load.audio('keys-for-success', ['assets/audio/keys-for-success.mp3', 'assets/audio/keys-for-success.ogg']);
    }
    exports.default = preloadAudioAssets;
});
//# sourceMappingURL=preloadAudioAssets.js.map