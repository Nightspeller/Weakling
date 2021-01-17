define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function preloadFonts(preloadScene) {
        preloadScene.load.bitmapFont('bitmapArial', 'assets/bitmap-fonts/bitmapArial16.png', 'assets/bitmap-fonts/bitmapArial16.fnt');
    }
    exports.default = preloadFonts;
});
//# sourceMappingURL=preloadFonts.js.map