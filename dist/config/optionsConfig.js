define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.optionsInstance = exports.OptionsConfig = void 0;
    class OptionsConfig {
        constructor() {
            this.isMusicOn = true;
            this.isEffectsOn = true;
        }
        toggleMusic() {
            this.isMusicOn = !this.isMusicOn;
            this.sound.mute = !this.isMusicOn;
            /* this.sound['sounds'].forEach(sound => {
                  if (sound.soundType === 'music') {
                      this.isMusicOn ? sound.resume() : sound.pause();
                  }
              }); */
        }
        /*  public toggleEffects() {
          this.isEffectsOn = !this.isEffectsOn;
          this.sound.sounds.forEach((sound) => {
            if (sound.soundType === 'effect') {
              this.isEffectsOn ? sound.resume() : sound.pause();
            }
          });
        } */
        setSoundManager(scene) {
            this.sound = scene.sound;
        }
    }
    exports.OptionsConfig = OptionsConfig;
    exports.optionsInstance = new OptionsConfig();
});
//# sourceMappingURL=optionsConfig.js.map